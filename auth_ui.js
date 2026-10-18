/**
 * Module Quản lý Đăng nhập Học sinh & Giáo viên, Thanh Điều Hướng Đa Môn,
 * và Tự động lưu điểm thi lên Firebase Realtime Database
 * Dành cho: TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Bản quyền: Thầy Hùng ĐT (Môn: TOÁN, LÍ, HÓA, ANH, TIN)
 * Database: https://cosodulieuhungtbs-default-rtdb.asia-southeast1.firebasedatabase.app
 */

import { extraQuestions } from "./subject_data.js";

const FIREBASE_DB_URL = "https://cosodulieuhungtbs-default-rtdb.asia-southeast1.firebasedatabase.app";

// 1. Quản lý trạng thái đăng nhập
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
    const isTeacher = student.role === "teacher" || student.maHS === "GIAOVIEN";
    const gradeNum = parseInt(String(student.lop || "").replace(/\D/g, ""), 10) || (isTeacher ? 9 : 8);
    
    const mappedProfile = {
      fullName: student.hoVaTen || (isTeacher ? "Thầy Hùng ĐT" : "Học sinh"),
      className: student.lop || (isTeacher ? "Giáo viên" : "8A1"),
      grade: isTeacher ? "Luyện thi ĐH" : `Khối ${gradeNum}`,
      schoolName: student.truong || "TRUNG TÂM BDVH & LTĐH GIÁO HÙNG",
      avatar: isTeacher ? "smart-owl" : (student.avatar || "robot-ai"),
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
  const cleanId = (maHS || "").trim().toUpperCase();
  if (!cleanId) {
    throw new Error("Vui lòng nhập Mã học sinh hoặc Mã Giáo viên!");
  }
  if (!matKhau) {
    throw new Error("Vui lòng nhập Mật khẩu!");
  }

  const url = `${FIREBASE_DB_URL}/students/${encodeURIComponent(cleanId)}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Không thể kết nối đến máy chủ Firebase!");
  }

  let student = await res.json();
  
  // Hỗ trợ dự phòng tài khoản GIAOVIEN nếu chưa có trên node
  if (!student && cleanId === "GIAOVIEN" && matKhau === "admin123") {
    student = {
      maHS: "GIAOVIEN",
      matKhau: "admin123",
      hoVaTen: "Thầy Hùng ĐT",
      lop: "Giáo viên",
      role: "teacher",
      trangThai: "Hoạt động"
    };
  }

  if (!student) {
    throw new Error(`Mã tài khoản "${cleanId}" không tồn tại trong hệ thống!`);
  }

  if (student.matKhau !== matKhau) {
    throw new Error("Mật khẩu không chính xác. Vui lòng kiểm tra lại!");
  }

  if (student.trangThai && student.trangThai.toLowerCase().includes("khóa")) {
    throw new Error("Tài khoản này đang bị tạm khóa. Vui lòng liên hệ quản trị viên!");
  }

  if (cleanId === "GIAOVIEN" || cleanId.startsWith("GV") || (student.lop && student.lop.toLowerCase().includes("giáo viên"))) {
    student.role = "teacher";
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
    lessonTitle: session.lessonTitle || "Bài kiểm tra Toán - Lí - Hóa - Anh - Tin",
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

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
    showToast(`☁️ Đã lưu điểm thi (${payload.score}/10) lên Firebase!`, "success");
  } catch (err) {
    console.error("❌ Lỗi khi tự động lưu điểm thi lên Firebase:", err);
    // Lưu tạm vào hàng đợi ngoại tuyến LocalStorage
    try {
      const offlineQueue = JSON.parse(localStorage.getItem("giao_hung_offline_exam_queue") || "[]");
      offlineQueue.push(payload);
      localStorage.setItem("giao_hung_offline_exam_queue", JSON.stringify(offlineQueue));
      displayResultCloudBanner(payload, "OFFLINE-" + Date.now().toString().slice(-4));
      showToast("🟠 Đã lưu tạm vào máy (sẽ tự động đồng bộ khi có mạng)!", "info");
    } catch (e) {
      showToast("⚠️ Không thể lưu điểm lên Firebase!", "error");
    }
  }
};

// 4. Toast Thông báo nổi
export function showToast(message, type = "info") {
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

    const firstChild = main.firstElementChild;
    if (firstChild) {
      firstChild.insertBefore(banner, firstChild.firstElementChild);
    } else {
      main.appendChild(banner);
    }
  }, 200);
}

// 6. Giao diện Modal Đăng nhập Học sinh & Giáo viên
function createLoginModal() {
  if (document.getElementById("student-login-modal")) return;

  const modal = document.createElement("div");
  modal.id = "student-login-modal";
  modal.className = "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto hidden opacity-0 transition-opacity duration-200";
  
  modal.innerHTML = `
    <div class="relative w-full max-w-md my-8 rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-4 border-indigo-500 transform scale-95 transition-transform duration-200" id="login-modal-card">
      <button type="button" id="close-login-modal-btn" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors text-lg font-bold">
        ✕
      </button>

      <div class="text-center mb-6">
        <div class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-400 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/25">
          🎓
        </div>
        <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-['Lexend']">
          TRUNG TÂM BDVH & LTĐH GIÁO HÙNG
        </h3>
        <p class="text-xs sm:text-sm text-indigo-700 mt-1 font-bold">
          Bản quyền: Thầy Hùng ĐT • TOÁN - LÍ - HÓA - ANH - TIN
        </p>
      </div>

      <form id="student-login-form" class="space-y-4">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Mã học sinh / Giáo viên:
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-base">
              👤
            </span>
            <input 
              type="text" 
              id="login-mahs-input" 
              placeholder="VD: HS001 hoặc GIAOVIEN" 
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

        <div id="login-feedback" class="hidden text-xs font-bold p-3 rounded-xl"></div>

        <button 
          type="submit" 
          id="submit-login-btn"
          class="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 active:scale-98 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Đăng nhập hệ thống</span>
          <span>➜</span>
        </button>
      </form>

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
            <div class="text-[10px] text-slate-500">Học sinh • 123456</div>
          </button>
          <button 
            type="button" 
            class="sample-account-btn p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-left transition-all"
            data-mahs="GIAOVIEN" 
            data-pass="admin123"
          >
            <div class="text-xs font-bold text-amber-800">👑 Thầy Hùng ĐT</div>
            <div class="text-[10px] text-amber-700">Giáo viên • admin123</div>
          </button>
        </div>
      </div>

      <div class="mt-4 text-center">
        <button 
          type="button" 
          id="guest-login-btn"
          class="text-xs text-slate-400 hover:text-indigo-600 font-semibold underline transition-colors"
        >
          Tiếp tục ôn tập với tư cách Khách (Không lưu điểm)
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

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

  const passInput = document.getElementById("login-matkhau-input");
  document.getElementById("toggle-password-btn").onclick = () => {
    passInput.type = passInput.type === "password" ? "text" : "password";
  };

  modal.querySelectorAll(".sample-account-btn").forEach(btn => {
    btn.onclick = () => {
      document.getElementById("login-mahs-input").value = btn.dataset.mahs;
      document.getElementById("login-matkhau-input").value = btn.dataset.pass;
    };
  });

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
      const isTeacher = student.role === "teacher";
      
      feedback.className = "text-xs font-bold p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 block";
      feedback.innerHTML = `✅ Đăng nhập thành công! Chào mừng <strong>${student.hoVaTen}</strong> (${isTeacher ? '👑 Giáo viên' : (student.lop || 'Học sinh')})`;
      
      saveStoredStudent(student);
      showToast(`Chào mừng ${isTeacher ? 'Thầy cô' : 'em'} ${student.hoVaTen}!`, "success");

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

// 8. Đăng xuất
window.logoutStudent = function () {
  const isTeacher = currentStudent && (currentStudent.role === "teacher" || currentStudent.maHS === "GIAOVIEN");
  if (confirm(`Bạn có chắc chắn muốn đăng xuất tài khoản ${isTeacher ? 'Giáo viên' : 'học sinh'}?`)) {
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

// 9. Modal Đổi Mật Khẩu (Bảo mật tài khoản)
function createChangePasswordModal() {
  if (document.getElementById("change-pass-modal")) return;

  const modal = document.createElement("div");
  modal.id = "change-pass-modal";
  modal.className = "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto hidden opacity-0 transition-opacity duration-200";

  modal.innerHTML = `
    <div class="relative w-full max-w-md my-8 rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-4 border-indigo-500 transform scale-95 transition-transform duration-200" id="change-pass-card">
      <button type="button" id="close-change-pass-btn" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors text-lg font-bold">
        ✕
      </button>

      <div class="text-center mb-6">
        <div class="w-14 h-14 mx-auto mb-2 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold">
          🔒
        </div>
        <h3 class="text-xl font-black text-slate-900 font-['Lexend']">
          Đổi Mật Khẩu Tài Khoản
        </h3>
        <p class="text-xs text-slate-500 mt-1" id="change-pass-user-label">
          Đổi mật khẩu cho học sinh
        </p>
      </div>

      <form id="change-pass-form" class="space-y-3.5">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Mật khẩu hiện tại:</label>
          <input type="password" id="current-pass-input" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 outline-none text-sm font-medium" placeholder="Nhập mật khẩu đang dùng" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Mật khẩu mới (tối thiểu 4 ký tự):</label>
          <input type="password" id="new-pass-input" required minlength="4" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 outline-none text-sm font-medium" placeholder="Nhập mật khẩu mới" />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Xác nhận mật khẩu mới:</label>
          <input type="password" id="confirm-pass-input" required minlength="4" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 outline-none text-sm font-medium" placeholder="Nhập lại mật khẩu mới" />
        </div>

        <div id="change-pass-feedback" class="hidden text-xs font-bold p-3 rounded-xl"></div>

        <button type="submit" id="submit-change-pass-btn" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer">
          Cập nhật mật khẩu mới
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const closeModal = () => {
    modal.classList.add("opacity-0");
    const card = document.getElementById("change-pass-card");
    if (card) card.classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 200);
  };

  document.getElementById("close-change-pass-btn").onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  const form = document.getElementById("change-pass-form");
  const feedback = document.getElementById("change-pass-feedback");
  const submitBtn = document.getElementById("submit-change-pass-btn");

  form.onsubmit = async (e) => {
    e.preventDefault();
    const student = loadStoredStudent();
    if (!student || !student.maHS) {
      alert("Vui lòng đăng nhập trước khi đổi mật khẩu!");
      return;
    }

    const curPass = document.getElementById("current-pass-input").value;
    const newPass = document.getElementById("new-pass-input").value;
    const confirmPass = document.getElementById("confirm-pass-input").value;

    if (newPass !== confirmPass) {
      feedback.className = "text-xs font-bold p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 block";
      feedback.innerText = "❌ Mật khẩu xác nhận không khớp!";
      return;
    }

    feedback.className = "text-xs font-bold p-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 block";
    feedback.innerText = "⏳ Đang cập nhật mật khẩu lên Firebase...";
    submitBtn.disabled = true;

    try {
      // 1. Kiểm tra mật khẩu cũ trên Firebase
      const checkRes = await fetch(`${FIREBASE_DB_URL}/students/${encodeURIComponent(student.maHS)}.json`);
      if (!checkRes.ok) throw new Error("Không thể kết nối máy chủ");
      const dbStudent = await checkRes.json();

      if (dbStudent && dbStudent.matKhau !== curPass) {
        throw new Error("Mật khẩu hiện tại không đúng!");
      }

      // 2. Cập nhật mật khẩu mới
      await fetch(`${FIREBASE_DB_URL}/students/${encodeURIComponent(student.maHS)}/matKhau.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPass)
      });
      await fetch(`${FIREBASE_DB_URL}/students/${encodeURIComponent(student.maHS)}/trangThaiDoiMK.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify("Đã đổi")
      });

      student.matKhau = newPass;
      saveStoredStudent(student);

      feedback.className = "text-xs font-bold p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 block";
      feedback.innerText = "✅ Đổi mật khẩu thành công!";
      showToast("Đổi mật khẩu thành công! Hãy ghi nhớ mật khẩu mới.", "success");

      setTimeout(() => {
        closeModal();
        submitBtn.disabled = false;
        feedback.classList.add("hidden");
        form.reset();
      }, 1200);
    } catch (err) {
      feedback.className = "text-xs font-bold p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 block";
      feedback.innerText = `❌ ${err.message}`;
      submitBtn.disabled = false;
    }
  };
}

window.openChangePasswordModal = function () {
  createChangePasswordModal();
  const student = loadStoredStudent();
  const label = document.getElementById("change-pass-user-label");
  if (label && student) {
    label.innerText = `Tài khoản: ${student.hoVaTen} (${student.maHS})`;
  }
  const modal = document.getElementById("change-pass-modal");
  const card = document.getElementById("change-pass-card");
  if (modal) {
    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      if (card) card.classList.remove("scale-95");
    });
  }
};

// 10. Bảng Quản Trị Giáo Viên (Teacher Portal Quick Modal)
function createTeacherDashboardModal() {
  if (document.getElementById("teacher-dashboard-modal")) return;

  const modal = document.createElement("div");
  modal.id = "teacher-dashboard-modal";
  modal.className = "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto hidden opacity-0 transition-opacity duration-200";

  modal.innerHTML = `
    <div class="relative w-full max-w-4xl my-8 rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-4 border-amber-400 transform scale-95 transition-transform duration-200" id="teacher-dashboard-card">
      <button type="button" id="close-teacher-modal-btn" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors text-lg font-bold">
        ✕
      </button>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md shadow-amber-500/30">
            👑
          </div>
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-slate-900 font-['Lexend']">
              Bảng Quản Trị Giáo Viên - Thầy Hùng ĐT
            </h3>
            <p class="text-xs text-amber-700 font-bold">
              TRUNG TÂM BDVH & LTĐH GIÁO HÙNG • Giám sát điểm số & Học sinh thời gian thực
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button type="button" onclick="window.openTeacherCmsModal()" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer" title="Soạn câu hỏi mới & nhập tự động từ Word / PDF">
            ✍️ Soạn Câu Hỏi CMS
          </button>
          <button type="button" onclick="window.openExamMatrixModal()" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-xs font-bold text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer" title="Soạn đề thi theo ma trận chuẩn Bộ GD&ĐT">
            🎯 Soạn Đề Ma Trận
          </button>
          <button type="button" onclick="window.openLeaderboardModal()" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-xs font-black text-slate-950 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer" title="Xem Bảng Vàng vinh danh">
            🏆 Bảng Vàng Top 10
          </button>
          <button type="button" id="refresh-teacher-data-btn" class="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer">
            🔄 Làm mới
          </button>
          <button type="button" id="export-excel-btn" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
            📊 Xuất Bảng Điểm (CSV)
          </button>
        </div>
      </div>

      <!-- Thống kê tổng quan -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200">
          <div class="text-xs text-blue-700 font-semibold">Lượt nộp bài thi</div>
          <div class="text-2xl font-black text-blue-900 mt-1" id="stat-total-exams">...</div>
        </div>
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div class="text-xs text-emerald-700 font-semibold">Điểm trung bình</div>
          <div class="text-2xl font-black text-emerald-900 mt-1" id="stat-avg-score">...</div>
        </div>
        <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <div class="text-xs text-amber-700 font-semibold">Học sinh đạt Giỏi (≥8)</div>
          <div class="text-2xl font-black text-amber-900 mt-1" id="stat-high-score">...</div>
        </div>
        <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200">
          <div class="text-xs text-purple-700 font-semibold">Tổng môn bồi dưỡng</div>
          <div class="text-2xl font-black text-purple-900 mt-1">5 Môn</div>
        </div>
      </div>

      <!-- Danh sách bài thi gần nhất -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-sm font-bold text-slate-800 uppercase tracking-wide">
            📋 Nhật Ký Nộp Bài Của Học Sinh (Thời gian thực)
          </h4>
          <input type="text" id="filter-exam-input" placeholder="Lọc theo Tên, Mã HS, Lớp..." class="px-3 py-1 rounded-lg border border-slate-200 text-xs w-48 sm:w-60 outline-none focus:border-indigo-500" />
        </div>

        <div class="overflow-x-auto max-h-72 border border-slate-200 rounded-2xl">
          <table class="w-full text-left text-xs border-collapse">
            <thead class="bg-slate-50 text-slate-600 font-bold sticky top-0 border-b border-slate-200">
              <tr>
                <th class="p-3">Thời gian</th>
                <th class="p-3">Mã HS</th>
                <th class="p-3">Họ và tên</th>
                <th class="p-3">Lớp</th>
                <th class="p-3">Bài kiểm tra / Chuyên đề</th>
                <th class="p-3 text-center">Điểm số</th>
                <th class="p-3 text-center">Đúng/Tổng</th>
              </tr>
            </thead>
            <tbody id="exam-results-tbody" class="divide-y divide-slate-100">
              <tr>
                <td colspan="7" class="p-4 text-center text-slate-400">Đang tải dữ liệu bài thi từ Firebase...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeModal = () => {
    modal.classList.add("opacity-0");
    const card = document.getElementById("teacher-dashboard-card");
    if (card) card.classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 200);
  };

  document.getElementById("close-teacher-modal-btn").onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  let cachedExams = [];

  const loadTeacherData = async () => {
    const tbody = document.getElementById("exam-results-tbody");
    tbody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-slate-400">⏳ Đang tải dữ liệu từ máy chủ Firebase...</td></tr>`;

    try {
      const res = await fetch(`${FIREBASE_DB_URL}/exam_results.json`);
      if (!res.ok) throw new Error("Lỗi tải kết quả thi");
      const data = await res.json() || {};

      cachedExams = Object.entries(data)
        .filter(([k, v]) => v && typeof v === "object" && v.score !== undefined)
        .map(([k, v]) => ({ id: k, ...v }))
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

      renderExamTable(cachedExams);
    } catch (err) {
      console.error("Lỗi:", err);
      tbody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-rose-500">❌ Không thể tải dữ liệu: ${err.message}</td></tr>`;
    }
  };

  const renderExamTable = (list) => {
    const tbody = document.getElementById("exam-results-tbody");
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-slate-400">Chưa có bài thi nào được ghi nhận.</td></tr>`;
      document.getElementById("stat-total-exams").innerText = "0";
      document.getElementById("stat-avg-score").innerText = "0.0";
      document.getElementById("stat-high-score").innerText = "0";
      return;
    }

    // Cập nhật thống kê
    const total = list.length;
    const avg = (list.reduce((sum, item) => sum + (Number(item.score) || 0), 0) / total).toFixed(1);
    const high = list.filter(item => Number(item.score) >= 8).length;

    document.getElementById("stat-total-exams").innerText = total;
    document.getElementById("stat-avg-score").innerText = avg;
    document.getElementById("stat-high-score").innerText = high;

    tbody.innerHTML = list.map(item => {
      const scoreNum = Number(item.score) || 0;
      const scoreBadgeColor = scoreNum >= 8 
        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
        : scoreNum >= 5 
          ? "bg-blue-100 text-blue-800 border-blue-300"
          : "bg-rose-100 text-rose-800 border-rose-300";

      return `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="p-3 text-slate-500 font-mono">${item.submittedAtVN || 'Vừa xong'}</td>
          <td class="p-3 font-extrabold text-indigo-700 font-mono">${item.maHS || 'KHACH'}</td>
          <td class="p-3 font-bold text-slate-800">${item.hoVaTen || 'Ẩn danh'}</td>
          <td class="p-3"><span class="px-2 py-0.5 rounded-md bg-slate-100 font-bold">${item.lop || '-'}</span></td>
          <td class="p-3 text-slate-700 max-w-xs truncate" title="${item.lessonTitle || ''}">${item.lessonTitle || '-'}</td>
          <td class="p-3 text-center">
            <span class="inline-block px-2.5 py-0.5 rounded-lg border font-black text-xs ${scoreBadgeColor}">
              ${scoreNum} / 10
            </span>
          </td>
          <td class="p-3 text-center font-bold text-slate-600">${item.correctCount || 0}/${item.totalQuestions || 10}</td>
        </tr>
      `;
    }).join("");
  };

  document.getElementById("refresh-teacher-data-btn").onclick = loadTeacherData;

  document.getElementById("filter-exam-input").oninput = (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      renderExamTable(cachedExams);
      return;
    }
    const filtered = cachedExams.filter(item => 
      (item.maHS && item.maHS.toLowerCase().includes(q)) ||
      (item.hoVaTen && item.hoVaTen.toLowerCase().includes(q)) ||
      (item.lop && item.lop.toLowerCase().includes(q)) ||
      (item.lessonTitle && item.lessonTitle.toLowerCase().includes(q))
    );
    renderExamTable(filtered);
  };

  // Xuất file CSV bảng điểm
  document.getElementById("export-excel-btn").onclick = () => {
    if (cachedExams.length === 0) {
      alert("Chưa có dữ liệu bài thi để xuất!");
      return;
    }

    let csv = "Thời gian,Mã học sinh,Họ và tên,Lớp,Chuyên đề kiểm tra,Điểm số,Số câu đúng,Tổng số câu\n";
    cachedExams.forEach(it => {
      csv += `"${it.submittedAtVN || ''}","${it.maHS || ''}","${it.hoVaTen || ''}","${it.lop || ''}","${(it.lessonTitle || '').replace(/"/g, '""')}",${it.score || 0},${it.correctCount || 0},${it.totalQuestions || 10}\n`;
    });

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Bang_Diem_Giao_Hung_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Đã tải xuống bảng điểm định dạng CSV thành công!", "success");
  };

  loadTeacherData();
}

window.openTeacherDashboardModal = function () {
  createTeacherDashboardModal();
  const modal = document.getElementById("teacher-dashboard-modal");
  const card = document.getElementById("teacher-dashboard-card");
  if (modal) {
    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      if (card) card.classList.remove("scale-95");
    });
    const refreshBtn = document.getElementById("refresh-teacher-data-btn");
    if (refreshBtn) refreshBtn.click();
  }
};

// 11. Cập nhật nút Đăng nhập / Profile Pill
function updateUIBadges() {
  const student = loadStoredStudent();
  const isTeacher = student && (student.role === "teacher" || student.maHS === "GIAOVIEN");
  
  // Ưu tiên hiển thị bên trong Thanh Điều Hướng Đa Môn nếu đã có
  const hubContainer = document.getElementById("hub-auth-container");
  let pill = document.getElementById("firebase-auth-pill");

  const renderContent = (isInsideHub) => {
    if (student) {
      if (isTeacher) {
        return `
          <div class="flex items-center gap-1.5 p-1 pl-2.5 pr-1.5 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-400/50 shadow-md shadow-amber-500/20 text-white text-xs">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span class="font-black text-amber-300 font-mono text-[11px]">👑 GIÁO VIÊN</span>
            <span class="font-bold text-white text-[11px] truncate max-w-[130px]">${student.hoVaTen || 'Thầy Hùng ĐT'}</span>
            <button 
              type="button" 
              onclick="window.openTeacherDashboardModal()" 
              class="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[10px] shadow-xs transition-all cursor-pointer flex items-center gap-1"
              title="Mở Bảng Điều Khiển Quản Lý Bảng Điểm & Học Sinh"
            >
              <span>📊 Quản Trị</span>
            </button>
            <button 
              type="button" 
              onclick="window.openChangePasswordModal()" 
              title="Đổi mật khẩu tài khoản"
              class="px-2 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-200 text-[10px] font-bold transition-colors cursor-pointer"
            >
              🔑 Đổi MK
            </button>
            <button 
              type="button" 
              onclick="window.logoutStudent()" 
              class="px-2 py-1 rounded-xl bg-slate-800/80 hover:bg-rose-900/60 hover:text-rose-200 text-[10px] font-bold text-slate-300 transition-colors cursor-pointer"
              title="Đăng xuất"
            >
              Đăng xuất
            </button>
          </div>
        `;
      } else {
        return `
          <div class="flex items-center gap-1.5 p-1 pl-2.5 pr-1.5 rounded-2xl bg-emerald-950/60 backdrop-blur-md border border-emerald-400/40 shadow-md shadow-emerald-500/10 text-white text-xs">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="font-extrabold text-emerald-300 font-mono text-[11px]">${student.maHS}</span>
            <span class="hidden lg:inline font-bold text-slate-100 text-[11px] truncate max-w-[110px]">${student.hoVaTen}</span>
            <span class="px-1.5 py-0.5 rounded-lg bg-emerald-400/20 text-emerald-300 font-black text-[10px]">${student.lop || '8A1'}</span>
            <button 
              type="button" 
              onclick="window.openChangePasswordModal()" 
              title="Đổi mật khẩu tài khoản"
              class="px-2 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-200 text-[10px] font-bold transition-colors cursor-pointer"
            >
              🔑 Đổi MK
            </button>
            <button 
              type="button" 
              onclick="window.logoutStudent()" 
              title="Đăng xuất tài khoản"
              class="px-2 py-1 rounded-xl bg-slate-800/80 hover:bg-rose-900/60 hover:text-rose-200 text-[10px] font-bold text-slate-300 transition-colors ml-0.5 cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        `;
      }
    } else {
      return `
        <button 
          type="button" 
          onclick="window.openStudentLoginModal()"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-indigo-700 hover:from-blue-600 hover:to-indigo-800 text-white font-extrabold text-xs shadow-md shadow-indigo-500/30 active:scale-95 transition-all cursor-pointer group"
          title="Nhấn để đăng nhập tài khoản học sinh / giáo viên"
        >
          <span class="text-sm group-hover:rotate-12 transition-transform">🔑</span>
          <span>Đăng nhập Học sinh / GV</span>
        </button>
      `;
    }
  };

  if (hubContainer) {
    hubContainer.innerHTML = renderContent(true);
    if (pill) pill.remove(); // Đã có trên hub thì xóa pill cố định
  } else {
    if (!pill) {
      pill = document.createElement("div");
      pill.id = "firebase-auth-pill";
      pill.className = "fixed top-3 right-4 sm:right-6 z-40 transition-all duration-300";
      document.body.appendChild(pill);
    }
    pill.innerHTML = renderContent(false);
  }
}

// 12. Thanh Điều Hướng Đa Môn Học (Multi-Subject Navigation Hub)
function injectMultiSubjectHub() {
  if (document.getElementById("multi-subject-nav-hub")) {
    updateUIBadges();
    return;
  }

  const header = document.querySelector("header");
  if (!header || !header.parentNode) {
    setTimeout(injectMultiSubjectHub, 150);
    return;
  }

  const hub = document.createElement("div");
  hub.id = "multi-subject-nav-hub";
  hub.className = "w-full max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-2 transition-all";

  hub.innerHTML = `
    <div class="p-3 sm:p-4 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 text-white shadow-xl border border-indigo-500/30 flex flex-col xl:flex-row items-center justify-between gap-3.5">
      <div class="flex items-center gap-3 w-full xl:w-auto text-left">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-md shadow-amber-500/20 shrink-0">
          🏛️
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 tracking-wider">
              Hệ Thống Đa Môn
            </span>
            <span class="text-xs text-indigo-200 font-semibold hidden sm:inline">
              TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Thầy Hùng ĐT
            </span>
          </div>
          <h2 class="text-sm sm:text-base font-black text-white leading-tight font-['Lexend'] mt-0.5">
            Chọn Môn Bồi Dưỡng & Luyện Thi:
          </h2>
        </div>
      </div>

      <!-- Khu vực tương tác: Nút môn học + Nút Tài khoản/Đăng nhập -->
      <div class="flex flex-wrap items-center justify-center xl:justify-end gap-1.5 sm:gap-2 w-full xl:w-auto">
        <button 
          type="button" 
          onclick="window.selectSubjectPill('toan')" 
          id="hub-btn-toan"
          class="subject-hub-btn px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>📐</span>
          <span>Môn TOÁN</span>
        </button>

        <button 
          type="button" 
          onclick="window.selectSubjectPill('li')" 
          id="hub-btn-li"
          class="subject-hub-btn px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold text-xs shadow-md shadow-amber-500/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>⚡</span>
          <span>Môn VẬT LÍ</span>
        </button>

        <button 
          type="button" 
          onclick="window.selectSubjectPill('hoa')" 
          id="hub-btn-hoa"
          class="subject-hub-btn px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>🧪</span>
          <span>Môn HÓA</span>
        </button>

        <button 
          type="button" 
          onclick="window.selectSubjectPill('anh')" 
          id="hub-btn-anh"
          class="subject-hub-btn px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>🇬🇧</span>
          <span>Môn TIẾNG ANH</span>
        </button>

        <button 
          type="button" 
          onclick="window.selectSubjectPill('tin')" 
          id="hub-btn-tin"
          class="subject-hub-btn px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-200 hover:text-white border border-slate-700 font-extrabold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>💻</span>
          <span>TIN HỌC (SGK 3-9)</span>
        </button>

        <button 
          type="button" 
          onclick="window.selectSubjectPill('dacbiet')" 
          id="hub-btn-dacbiet"
          class="subject-hub-btn px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white font-black text-xs transition-all flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>⭐</span>
          <span>Đề 5-8-9</span>
        </button>

        <button 
          type="button" 
          onclick="window.openExamMatrixModal(window.currentActiveSubject || 'toan', 9)" 
          id="hub-btn-matrix"
          class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 active:scale-95 text-white font-black text-xs shadow-md shadow-orange-500/25 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer animate-pulse"
          title="Tạo Đề Thi Chuẩn Ma Trận GDPT 2018 (4 Mức Độ Nhận Thức) & Xuất Bản In / PDF"
        >
          <span>🎯</span>
          <span>Tạo Đề Ma Trận</span>
        </button>

        <button 
          type="button" 
          onclick="window.openTeacherCmsModal()" 
          id="hub-btn-cms"
          class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          title="Soạn Câu Hỏi Mới & Nhập Đề Nhanh Từ Word / PDF (Teacher CMS)"
        >
          <span>✍️</span>
          <span>Soạn Câu Hỏi CMS</span>
        </button>

        <button 
          type="button" 
          onclick="window.openMockExamsModal()" 
          id="hub-btn-mock10"
          class="px-3 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 active:scale-95 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          title="Bộ Đề Thi Thử Chuẩn Cấu Trúc Tuyển Sinh Vào 10 (Toán, KHTN, Anh)"
        >
          <span>🎓</span>
          <span>Đề Vào 10</span>
        </button>

        <button 
          type="button" 
          onclick="window.openLeaderboardModal()" 
          id="hub-btn-leaderboard"
          class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 active:scale-95 text-slate-950 font-black text-xs shadow-md shadow-amber-500/25 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          title="Vinh Danh Top 10 Học Sinh Xuất Sắc Nhất"
        >
          <span>🏆</span>
          <span>Bảng Vàng</span>
        </button>

        <!-- Nút Bật / Tắt Âm Thanh -->
        <button 
          type="button" 
          onclick="window.toggleSoundEffects()" 
          id="hub-btn-sound"
          class="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 font-bold text-xs shadow-xs transition-all flex items-center gap-1 shrink-0 cursor-pointer"
          title="Bật / Tắt âm thanh hiệu ứng và nhạc vinh danh"
        >
          <span id="hub-sound-icon">🔊</span>
        </button>

        <div class="h-6 w-px bg-indigo-500/30 hidden sm:block mx-1"></div>

        <!-- Khu vực tài khoản / Đăng nhập học sinh & GV -->
        <div id="hub-auth-container" class="shrink-0 flex items-center gap-2"></div>
      </div>
    </div>
  `;

  // Chèn sau thẻ header một cách an toàn và đúng DOM hierarchy
  try {
    const header = document.querySelector("header");
    if (header && header.parentNode) {
      if (header.nextSibling) {
        header.parentNode.insertBefore(hub, header.nextSibling);
      } else {
        header.parentNode.appendChild(hub);
      }
      updateUIBadges();
    } else {
      // Nếu header chưa render xong từ React, thử lại sau 150ms
      setTimeout(injectMultiSubjectHub, 150);
    }
  } catch (e) {
    console.warn("Lỗi khi chèn thanh điều hướng đa môn:", e);
  }
}

// Biến lưu môn đang hoạt động
window.currentActiveSubject = "toan";

// Hàm kích hoạt lọc môn học theo tương tác người dùng
window.selectSubjectPill = function (subjectKey) {
  window.currentActiveSubject = subjectKey;

  // Highlight nổi bật nút được chọn
  document.querySelectorAll(".subject-hub-btn").forEach(btn => {
    btn.classList.remove("ring-4", "ring-amber-400", "scale-105", "shadow-xl");
  });
  const currentBtn = document.getElementById(`hub-btn-${subjectKey}`);
  if (currentBtn) {
    currentBtn.classList.add("ring-4", "ring-amber-400", "scale-105", "shadow-xl");
  }

  // Hàm cuộn mượt đến danh sách chuyên đề để người dùng nhìn thấy bài học ngay lập tức
  const scrollToLessons = () => {
    const target = document.querySelector(".grid.grid-cols-1.md\\:grid-cols-2") || 
                   document.querySelector("input[placeholder*='Tìm bài']")?.closest("div") ||
                   document.querySelector("h2");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (subjectKey === "dacbiet") {
    // Cuộn đến phần đề đặc biệt 5 - 8 - 9
    const banner = document.querySelector(".bg-gradient-to-r.from-indigo-900") || document.querySelector("h3");
    if (banner) {
      banner.scrollIntoView({ behavior: "smooth", block: "center" });
      showToast("⭐ Đã cuộn đến chuyên đề ôn tập trọng điểm 5, 8, 9!", "info");
    }
    return;
  }

  if (subjectKey === "tin") {
    // Chuyển về môn Tin học
    const allBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent && b.textContent.trim() === "Tất cả");
    if (allBtn) allBtn.click();
    scrollToLessons();
    showToast("💻 Đã chuyển sang Môn TIN HỌC (SGK 3-9)!", "info");
    return;
  }

  // 1. Chuyển sang cấp THCS nếu chọn Toán, Lí, Hóa, Anh
  const thcsBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent && b.textContent.includes("CẤP THCS"));
  if (thcsBtn) {
    thcsBtn.click();
  }

  setTimeout(() => {
    // 2. Chọn Khối 8 hoặc Khối 9 cho các môn
    const gradeButtons = Array.from(document.querySelectorAll("button")).filter(b => b.textContent && (b.textContent.trim() === "Khối 8" || b.textContent.trim() === "Khối 9"));
    if (gradeButtons.length > 0) {
      gradeButtons[0].click(); // Chọn Khối 8
    }

    setTimeout(() => {
      // 3. Tìm nút chủ đề tương ứng (Môn TOÁN, Môn LÍ, Môn HÓA, Môn ANH, hoặc Tất cả)
      const targetLabel = subjectKey === "toan" ? "Môn TOÁN" :
                          subjectKey === "li" ? "Môn LÍ" :
                          subjectKey === "hoa" ? "Môn HÓA" :
                          subjectKey === "anh" ? "Môn ANH" : "Tất cả";

      const subjectFilterBtn = Array.from(document.querySelectorAll("button")).find(b => b.textContent && b.textContent.trim() === targetLabel);
      if (subjectFilterBtn) {
        subjectFilterBtn.click();
      }
      scrollToLessons();
      showToast(`✨ Đã hiển thị các chuyên đề ${targetLabel}!`, "success");
    }, 150);
  }, 100);
};

// 13. Khởi động
function initAuth() {
  loadStoredStudent();
  createLoginModal();
  updateUIBadges();

  // Khởi chạy chèn thanh điều hướng đa môn an toàn
  injectMultiSubjectHub();

  // Nhắc đăng nhập nếu chưa đăng nhập
  const hasReminded = sessionStorage.getItem("has_shown_login_hint");
  if (!currentStudent && !hasReminded) {
    sessionStorage.setItem("has_shown_login_hint", "true");
    setTimeout(() => {
      showToast("💡 Nhấn 'Đăng nhập Học sinh / GV' để tự động đồng bộ kết quả lên Firebase!", "info");
    }, 1800);
  }
}

window.toggleSoundEffects = function() {
  if (window.soundManager) {
    const isMuted = window.soundManager.toggleMute();
    const icon = document.getElementById("hub-sound-icon");
    if (icon) icon.textContent = isMuted ? "🔇" : "🔊";
    showToast(isMuted ? "🔇 Đã tắt âm thanh hiệu ứng" : "🔊 Đã bật âm thanh hiệu ứng", "info");
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuth);
} else {
  initAuth();
}
