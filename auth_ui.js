/**
 * Module Quản lý Đăng nhập Học sinh & Tự động lưu điểm thi lên Firebase
 * Dành cho: TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Bản quyền: Thầy Hùng ĐT (Môn: TOÁN, LÍ, HÓA, ANH)
 * Database: https://cosodulieuhungtbs-default-rtdb.asia-southeast1.firebasedatabase.app
 */

const FIREBASE_DB_URL = "https://cosodulieuhungtbs-default-rtdb.asia-southeast1.firebasedatabase.app";

// 1. Quản lý trạng thái học sinh
let currentStudent = null;

function loadStoredStudent() {
  try {
    const raw = localStorage.getItem("ontap_logged_student");
    if (raw) {
      currentStudent = JSON.parse(raw);
    }
  } catch (e) {
    currentStudent = null;
  }
  return currentStudent;
}

function saveStoredStudent(student) {
  currentStudent = student;
  if (student) {
    localStorage.setItem("ontap_logged_student", JSON.stringify(student));
    // Đồng bộ với hồ sơ React app
    const gradeNum = parseInt(String(student.lop || "").replace(/\D/g, ""), 10) || 8;
    const mappedProfile = {
      fullName: student.hoVaTen || "Học sinh",
      className: student.lop || "8A1",
      grade: `Khối ${gradeNum}`,
      schoolName: student.truong || "TRUNG TÂM BDVH & LTĐH GIÁO HÙNG",
      avatar: student.avatar || "robot-ai",
      maHS: student.maHS
    };
    try {
      localStorage.setItem("ontap_student_profile", JSON.stringify(mappedProfile));
      if (window.updateStudentProfile) {
        window.updateStudentProfile(mappedProfile);
      } else if (window.updateStudentProfileFromFirebase) {
        window.updateStudentProfileFromFirebase(mappedProfile);
      }
    } catch (e) {}
  } else {
    localStorage.removeItem("ontap_logged_student");
  }
  updateUIBadges();
}

// 2. Gọi API Firebase kiểm tra đăng nhập
async function authenticateStudent(maHS, matKhau) {
  const cleanId = (maHS || "").trim();
  if (!cleanId) {
    throw new Error("Vui lòng nhập Mã học sinh!");
  }
  if (!matKhau) {
    throw new Error("Vui lòng nhập Mật khẩu!");
  }

  const url = `${FIREBASE_DB_URL}/students/${encodeURIComponent(cleanId)}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Không thể kết nối đến máy chủ Firebase!");
  }

  const student = await res.json();
  if (!student) {
    throw new Error(`Mã học sinh "${cleanId}" không tồn tại trong hệ thống!`);
  }

  if (student.matKhau !== matKhau) {
    throw new Error("Mật khẩu không chính xác. Vui lòng kiểm tra lại!");
  }

  if (student.trangThai && student.trangThai.toLowerCase().includes("khóa")) {
    throw new Error("Tài khoản này đang bị tạm khóa. Vui lòng liên hệ giáo viên!");
  }

  return student;
}

// 3. Tự động lưu điểm thi lên Firebase (Hooked from index.js)
window.autoSaveExamToFirebase = async function (profile, session, correctCount, totalQuestions) {
  const student = loadStoredStudent();
  const cCount = correctCount !== undefined ? correctCount : Math.round(((session.percentage || 0) / 100) * (totalQuestions || session.totalQuestions || 10));
  const tCount = totalQuestions || session.totalQuestions || 10;
  
  const payload = {
    maHS: student ? student.maHS : (profile?.maHS || "KHACH"),
    hoVaTen: student ? student.hoVaTen : (profile?.fullName || "Học sinh Khách"),
    lop: student ? student.lop : (profile?.className || "Khách"),
    isGuest: !student,
    lessonId: session.lessonId || (session.lessonIds && session.lessonIds[0]) || "unknown",
    lessonTitle: session.lessonTitle || "Bài kiểm tra Toán - Lí - Hóa - Anh",
    grade: session.grade || profile?.grade || "Luyện thi ĐH",
    score: session.score,
    percentage: session.percentage,
    correctCount: cCount,
    totalQuestions: tCount,
    difficultyMode: session.difficultyMode || "tong_hop",
    timeSpentSeconds: session.timeSpentSeconds || 0,
    source: session.source || "offline_bank",
    submittedAt: new Date().toISOString(),
    submittedAtVN: new Date().toLocaleString("vi-VN"),
    timestamp: Date.now()
  };

  console.log("☁️ Đang tự động lưu điểm thi lên Firebase:", payload);

  try {
    const res = await fetch(`${FIREBASE_DB_URL}/exam_results.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP ${res.statusCode}`);
    const data = await res.json();
    const resultId = data.name;
    console.log("✅ Đã lưu kết quả thi lên Firebase thành công! ID:", resultId);

    // Cập nhật điểm gần nhất vào học sinh nếu đã đăng nhập
    if (student && student.maHS) {
      try {
        await fetch(`${FIREBASE_DB_URL}/students/${encodeURIComponent(student.maHS)}/lastExam.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonTitle: payload.lessonTitle,
            score: payload.score,
            submittedAtVN: payload.submittedAtVN,
            resultId
          })
        });
      } catch (e) {}
    }

    // Hiển thị Banner đồng bộ lên màn hình kết quả
    displayResultCloudBanner(payload, resultId);
    showToast(`☁️ Đã tự động lưu điểm thi (${payload.score}/10) lên Firebase!`, "success");
  } catch (err) {
    console.error("❌ Lỗi khi tự động lưu điểm thi lên Firebase:", err);
    showToast("⚠️ Không thể lưu điểm lên Firebase (vui lòng kiểm tra mạng)!", "error");
  }
};

// 4. Toast Thông báo nổi
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("auth-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "auth-toast-container";
    toastContainer.className = "fixed top-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  const bgStyles = type === "success" 
    ? "bg-emerald-600 text-white shadow-emerald-500/30" 
    : type === "error" 
      ? "bg-rose-600 text-white shadow-rose-500/30" 
      : "bg-slate-900 text-white shadow-slate-900/30";

  toast.className = `pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl font-bold text-xs sm:text-sm transition-all duration-300 transform translate-y-[-10px] opacity-0 ${bgStyles}`;
  toast.innerHTML = `
    <span class="text-base">${type === 'success' ? '🎉' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-[-10px]", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-[-10px]");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// 5. Hiển thị Banner Xác nhận lưu Firebase trên trang kết quả
function displayResultCloudBanner(payload, resultId) {
  setTimeout(() => {
    const existing = document.getElementById("firebase-result-banner");
    if (existing) existing.remove();

    // Tìm vị trí thích hợp trên màn hình kết quả
    const main = document.querySelector("main");
    if (!main) return;

    const banner = document.createElement("div");
    banner.id = "firebase-result-banner";
    banner.className = "w-full max-w-4xl mx-auto my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border-2 border-emerald-500/30 shadow-md backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in-50 duration-300";
    
    banner.innerHTML = `
      <div class="flex items-center gap-3.5 text-left w-full sm:w-auto">
        <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30 text-2xl">
          ☁️
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wide">
              Firebase Synced
            </span>
            <span class="text-xs text-slate-500 font-semibold">${payload.submittedAtVN}</span>
          </div>
          <h4 class="font-extrabold text-slate-800 text-sm sm:text-base mt-0.5">
            Điểm thi của <span class="text-indigo-600 underline">${payload.hoVaTen}</span> (${payload.lop}) đã được lưu thành công!
          </h4>
          <p class="text-xs text-slate-500">Mã bài nộp: <code class="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">${resultId || 'DB-OK'}</code></p>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <div class="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-extrabold text-sm sm:text-base shadow-2xs">
          Điểm: ${payload.score} / 10
        </div>
      </div>
    `;

    // Chèn banner vào đầu phần nội dung kết quả
    const firstChild = main.firstElementChild;
    if (firstChild) {
      firstChild.insertBefore(banner, firstChild.firstElementChild);
    } else {
      main.appendChild(banner);
    }
  }, 200);
}

// 6. Giao diện Modal Đăng nhập Học sinh (Modal HTML & Logic)
function createLoginModal() {
  if (document.getElementById("student-login-modal")) return;

  const modal = document.createElement("div");
  modal.id = "student-login-modal";
  modal.className = "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto hidden opacity-0 transition-opacity duration-200";
  
  modal.innerHTML = `
    <div class="relative w-full max-w-md my-8 rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-4 border-indigo-500 transform scale-95 transition-transform duration-200" id="login-modal-card">
      <!-- Nút đóng -->
      <button type="button" id="close-login-modal-btn" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors text-lg font-bold">
        ✕
      </button>

      <!-- Tiêu đề -->
      <div class="text-center mb-6">
        <div class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-400 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/25">
          🎓
        </div>
        <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-['Lexend']">
          TRUNG TÂM BDVH & LTĐH GIÁO HÙNG
        </h3>
        <p class="text-xs sm:text-sm text-indigo-700 mt-1 font-bold">
          Bản quyền: Thầy Hùng ĐT • Môn: TOÁN, LÍ, HÓA, ANH
        </p>
      </div>

      <!-- Form nhập -->
      <form id="student-login-form" class="space-y-4">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Mã học sinh:
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-base">
              👤
            </span>
            <input 
              type="text" 
              id="login-mahs-input" 
              placeholder="VD: HS001" 
              required
              autocomplete="off"
              class="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-800 font-bold uppercase text-sm sm:text-base placeholder:normal-case placeholder:font-medium placeholder:text-slate-400 transition-all"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Mật khẩu:
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-base">
              🔒
            </span>
            <input 
              type="password" 
              id="login-matkhau-input" 
              placeholder="Nhập mật khẩu" 
              required
              class="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-800 font-bold text-sm sm:text-base placeholder:text-slate-400 transition-all"
            />
            <button 
              type="button" 
              id="toggle-password-btn" 
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 text-sm font-semibold"
              title="Hiện/Ẩn mật khẩu"
            >
              👁️
            </button>
          </div>
        </div>

        <!-- Thông báo lỗi / thành công -->
        <div id="login-feedback" class="hidden text-xs font-bold p-3 rounded-xl"></div>

        <!-- Nút Đăng nhập -->
        <button 
          type="submit" 
          id="submit-login-btn"
          class="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 active:scale-98 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Đăng nhập ngay</span>
          <span>➜</span>
        </button>
      </form>

      <!-- Gợi ý tài khoản mẫu để test -->
      <div class="mt-5 pt-4 border-t border-slate-100">
        <div class="text-[11px] font-bold text-slate-500 mb-2 flex items-center justify-between">
          <span>⚡ Bấm để điền nhanh tài khoản mẫu:</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-left">
          <button 
            type="button" 
            class="sample-account-btn p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all"
            data-mahs="HS001" 
            data-pass="123456"
          >
            <div class="text-xs font-bold text-indigo-700">HS001 (Lớp 6A1)</div>
            <div class="text-[10px] text-slate-500">MK: 123456</div>
          </button>
          <button 
            type="button" 
            class="sample-account-btn p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all"
            data-mahs="GIAOVIEN" 
            data-pass="admin123"
          >
            <div class="text-xs font-bold text-indigo-700">GIAOVIEN</div>
            <div class="text-[10px] text-slate-500">MK: admin123</div>
          </button>
        </div>
      </div>

      <!-- Chế độ Khách -->
      <div class="mt-4 text-center">
        <button 
          type="button" 
          id="guest-login-btn"
          class="text-xs text-slate-400 hover:text-indigo-600 font-semibold underline transition-colors"
        >
          Tiếp tục ôn tập với tư cách Học sinh Khách (Không lưu điểm)
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Gắn sự kiện đóng modal
  const closeModal = () => {
    modal.classList.add("opacity-0");
    const card = document.getElementById("login-modal-card");
    if (card) card.classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 200);
  };

  document.getElementById("close-login-modal-btn").onclick = closeModal;
  document.getElementById("guest-login-btn").onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  // Toggle ẩn/hiện mật khẩu
  const passInput = document.getElementById("login-matkhau-input");
  document.getElementById("toggle-password-btn").onclick = () => {
    if (passInput.type === "password") {
      passInput.type = "text";
    } else {
      passInput.type = "password";
    }
  };

  // Nút điền nhanh tài khoản mẫu
  modal.querySelectorAll(".sample-account-btn").forEach(btn => {
    btn.onclick = () => {
      document.getElementById("login-mahs-input").value = btn.dataset.mahs;
      document.getElementById("login-matkhau-input").value = btn.dataset.pass;
    };
  });

  // Submit Form Đăng nhập
  const form = document.getElementById("student-login-form");
  const feedback = document.getElementById("login-feedback");
  const submitBtn = document.getElementById("submit-login-btn");

  form.onsubmit = async (e) => {
    e.preventDefault();
    const mahs = document.getElementById("login-mahs-input").value.trim().toUpperCase();
    const matkhau = document.getElementById("login-matkhau-input").value;

    feedback.className = "text-xs font-bold p-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 block";
    feedback.innerHTML = "⏳ Đang kết nối Firebase kiểm tra thông tin...";
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-70");

    try {
      const student = await authenticateStudent(mahs, matkhau);
      feedback.className = "text-xs font-bold p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 block";
      feedback.innerHTML = `✅ Đăng nhập thành công! Chào mừng <strong>${student.hoVaTen}</strong> (${student.lop || 'Học sinh'})`;
      
      saveStoredStudent(student);
      showToast(`Chào mừng em ${student.hoVaTen} (${student.lop || 'Học sinh'})!`, "success");

      setTimeout(() => {
        closeModal();
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-70");
        feedback.classList.add("hidden");
      }, 1000);
    } catch (err) {
      feedback.className = "text-xs font-bold p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 block animate-shake";
      feedback.innerHTML = `❌ ${err.message}`;
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-70");
    }
  };
}

// 7. Mở Modal Đăng nhập
window.openStudentLoginModal = function () {
  createLoginModal();
  const modal = document.getElementById("student-login-modal");
  const card = document.getElementById("login-modal-card");
  if (modal) {
    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      if (card) card.classList.remove("scale-95");
    });
    const mahsInput = document.getElementById("login-mahs-input");
    if (mahsInput) mahsInput.focus();
  }
};

// 8. Đăng xuất học sinh
window.logoutStudent = function () {
  if (confirm("Em có chắc chắn muốn đăng xuất tài khoản?")) {
    saveStoredStudent(null);
    showToast("Đã đăng xuất tài khoản thành công!", "info");
    const guestProfile = {
      fullName: "Bạn Nhỏ Thông Thái",
      grade: "Khối 8",
      className: "8A1",
      schoolName: "TRUNG TÂM BDVH & LTĐH GIÁO HÙNG",
      avatar: "robot-ai"
    };
    if (window.updateStudentProfile) {
      window.updateStudentProfile(guestProfile);
    } else if (window.updateStudentProfileFromFirebase) {
      window.updateStudentProfileFromFirebase(guestProfile);
    }
  }
};

// 9. Cập nhật nút Đăng nhập / Badge học sinh trên Header
function updateUIBadges() {
  const student = loadStoredStudent();
  
  // Tạo hoặc cập nhật Floating Login / Profile Pill ở góc trên
  let pill = document.getElementById("firebase-auth-pill");
  if (!pill) {
    pill = document.createElement("div");
    pill.id = "firebase-auth-pill";
    pill.className = "fixed top-3 right-4 sm:right-6 z-40 transition-all duration-300";
    document.body.appendChild(pill);
  }

  if (student) {
    pill.innerHTML = `
      <div class="flex items-center gap-1.5 p-1 pl-2.5 pr-1 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-300 shadow-md shadow-emerald-500/10 text-slate-800 text-xs">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="font-extrabold text-indigo-700 font-mono text-[11px]">${student.maHS}</span>
        <span class="hidden md:inline font-bold text-slate-800 text-[11px] truncate max-w-[120px]">${student.hoVaTen}</span>
        <span class="px-1.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-black text-[10px]">${student.lop || '6A1'}</span>
        <button 
          type="button" 
          onclick="window.logoutStudent()" 
          title="Đăng xuất tài khoản"
          class="px-2 py-1 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-[10px] font-bold text-slate-600 transition-colors ml-1 cursor-pointer"
        >
          Đăng xuất
        </button>
      </div>
    `;
  } else {
    pill.innerHTML = `
      <button 
        type="button" 
        onclick="window.openStudentLoginModal()"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs shadow-md shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer group"
        title="Nhấn để đăng nhập tài khoản học sinh"
      >
        <span class="text-sm group-hover:rotate-12 transition-transform">🔑</span>
        <span>Đăng nhập Học sinh</span>
      </button>
    `;
  }
}

// 10. Khởi động khi trang web tải xong
function initAuth() {
  loadStoredStudent();
  createLoginModal();
  updateUIBadges();

  // Tự động nhắc nếu học sinh chưa đăng nhập
  const hasReminded = sessionStorage.getItem("has_shown_login_hint");
  if (!currentStudent && !hasReminded) {
    sessionStorage.setItem("has_shown_login_hint", "true");
    setTimeout(() => {
      showToast("💡 Nhấn 'Đăng nhập Học sinh' để tự động lưu điểm bài thi lên Firebase nhé!", "info");
    }, 1500);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuth);
} else {
  initAuth();
}
