/**
 * Module Phân Tích Năng Lực Học Tập & Bảng Vàng Vinh Danh (Phase 3)
 * TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Thầy Hùng ĐT
 * 
 * Tính năng chính:
 * 1. Bảng Vàng Vinh Danh (Top 10 Leaderboard): Đồng bộ thời gian thực từ Firebase Realtime Database
 * 2. Phân tích ma trận năng lực 4 mức độ nhận thức GDPT 2018 (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao)
 * 3. Chẩn đoán lỗ hổng kiến thức & Lời khuyên sư phạm cá nhân hóa từ AI
 * 4. Chế độ "Luyện tập lại các câu sai" (Smart Re-try)
 * 5. Bộ đề thi thử chuẩn cấu trúc Tuyển sinh vào Lớp 10 (Toán, Lí/KHTN, Tiếng Anh)
 */

import { renderKatex } from "./katex_helper.js";

const FIREBASE_DB_URL = "https://cosodulieuhungtbs-default-rtdb.asia-southeast1.firebasedatabase.app";

// ==========================================
// 1. GIAO DIỆN BẢNG VÀNG VINH DANH (LEADERBOARD)
// ==========================================

export function createLeaderboardModal() {
  if (document.getElementById("leaderboard-modal")) return;

  const modal = document.createElement("div");
  modal.id = "leaderboard-modal";
  modal.className = "fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto hidden opacity-0 transition-opacity duration-200";

  modal.innerHTML = `
    <div class="relative w-full max-w-4xl my-6 rounded-3xl bg-white shadow-2xl border-4 border-amber-400 overflow-hidden transform scale-95 transition-transform duration-200 flex flex-col max-h-[92vh]" id="leaderboard-card">
      
      <!-- Header Bảng Vàng -->
      <div class="bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-950 p-4 sm:p-6 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-300 to-yellow-500 text-slate-950 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30 shrink-0 font-bold animate-bounce">
            🏆
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-300 text-amber-950 tracking-wider">
                Vinh Danh Thủ Khoa • Bảng Vàng Giáo Hùng
              </span>
              <span class="text-xs text-amber-200 font-semibold hidden sm:inline">
                Thầy Hùng ĐT
              </span>
            </div>
            <h3 class="text-lg sm:text-2xl font-black text-white font-['Lexend'] mt-0.5 tracking-tight">
              Bảng Vàng Thành Tích Xuất Sắc Nhất
            </h3>
          </div>
        </div>

        <button 
          type="button" 
          onclick="window.closeLeaderboardModal()" 
          class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Filter Controls & Navigation -->
      <div class="p-3 sm:p-4 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div class="flex flex-wrap items-center gap-1.5" id="leaderboard-filters">
          <button 
            type="button" 
            data-subject="all" 
            class="lb-filter-btn px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-xs transition-all cursor-pointer"
          >
            🌟 Toàn Hệ Thống
          </button>
          <button 
            type="button" 
            data-subject="toan" 
            class="lb-filter-btn px-3 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
          >
            📐 Môn Toán
          </button>
          <button 
            type="button" 
            data-subject="li" 
            class="lb-filter-btn px-3 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
          >
            ⚡ Vật Lí / KHTN
          </button>
          <button 
            type="button" 
            data-subject="hoa" 
            class="lb-filter-btn px-3 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
          >
            🧪 Hóa Học
          </button>
          <button 
            type="button" 
            data-subject="anh" 
            class="lb-filter-btn px-3 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
          >
            🇬🇧 Tiếng Anh
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button 
            type="button" 
            id="refresh-leaderboard-btn"
            class="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs border border-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>🔄</span>
            <span>Làm Mới</span>
          </button>
        </div>
      </div>

      <!-- Body / Top 10 List -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4" id="leaderboard-body">
        <div class="flex flex-col items-center justify-center p-12 text-slate-400">
          <div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p class="font-bold text-sm">Đang tải dữ liệu Bảng Vàng từ Firebase Cloud...</p>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 shrink-0 flex items-center justify-between">
        <span>✨ Dữ liệu đồng bộ trực tiếp từ máy chủ Giáo Hùng</span>
        <button 
          type="button" 
          onclick="window.openMockExamsModal()"
          class="font-black text-indigo-700 hover:text-indigo-900 underline cursor-pointer"
        >
          🚀 Làm đề thi Tuyển sinh Lớp 10 để ghi danh Bảng Vàng!
        </button>
      </div>

    </div>
  `;

  document.body.appendChild(modal);

  // Gắn sự kiện bộ lọc môn
  const filterBtns = modal.querySelectorAll(".lb-filter-btn");
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => {
        b.className = "lb-filter-btn px-3 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer";
      });
      btn.className = "lb-filter-btn px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-xs transition-all cursor-pointer";
      const subject = btn.getAttribute("data-subject");
      fetchAndRenderLeaderboard(subject);
    };
  });

  const refreshBtn = modal.getElementById("refresh-leaderboard-btn");
  if (refreshBtn) {
    refreshBtn.onclick = () => {
      const activeBtn = modal.querySelector(".lb-filter-btn.bg-amber-500");
      const subject = activeBtn ? activeBtn.getAttribute("data-subject") : "all";
      fetchAndRenderLeaderboard(subject);
    };
  }
}

// 2. Fetch & Render Leaderboard Data
async function fetchAndRenderLeaderboard(filterSubject = "all") {
  const container = document.getElementById("leaderboard-body");
  if (!container) return;

  container.innerHTML = `
    <div class="flex flex-col items-center justify-center p-12 text-slate-400">
      <div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p class="font-bold text-sm">Đang đồng bộ dữ liệu thời gian thực...</p>
    </div>
  `;

  try {
    const res = await fetch(`${FIREBASE_DB_URL}/exam_results.json`);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();

    if (!data) {
      container.innerHTML = `
        <div class="text-center p-12 text-slate-500">
          <p class="text-4xl mb-2">🌱</p>
          <p class="font-bold text-base">Chưa có kết quả thi nào được ghi nhận.</p>
          <p class="text-xs text-slate-400 mt-1">Hãy là học sinh đầu tiên hoàn thành bài thi để đứng đầu Bảng Vàng!</p>
        </div>
      `;
      return;
    }

    // Chuyển object sang array
    let records = Object.entries(data)
      .map(([key, val]) => ({ id: key, ...val }))
      .filter(r => r && typeof r.score === "number");

    // Lọc theo môn học nếu có
    if (filterSubject !== "all") {
      records = records.filter(r => {
        const title = (r.lessonTitle || "").toLowerCase();
        const lId = (r.lessonId || "").toLowerCase();
        if (filterSubject === "toan") return title.includes("toán") || lId.includes("toan");
        if (filterSubject === "li") return title.includes("lí") || title.includes("vật lí") || title.includes("khtn") || lId.includes("li");
        if (filterSubject === "hoa") return title.includes("hóa") || lId.includes("hoa");
        if (filterSubject === "anh") return title.includes("anh") || title.includes("english") || lId.includes("anh");
        return true;
      });
    }

    // Sắp xếp: Điểm cao nhất -> Thời gian nhanh nhất -> Thời điểm gần nhất
    records.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const timeA = a.timeSpentSeconds || 9999;
      const timeB = b.timeSpentSeconds || 9999;
      if (timeA !== timeB) return timeA - timeB;
      return (b.timestamp || 0) - (a.timestamp || 0);
    });

    // Lấy Top 10
    const top10 = records.slice(0, 10);

    if (top10.length === 0) {
      container.innerHTML = `
        <div class="text-center p-12 text-slate-500">
          <p class="text-4xl mb-2">🔍</p>
          <p class="font-bold text-base">Chưa có kết quả nào cho môn học này.</p>
          <p class="text-xs text-slate-400 mt-1">Hãy tham gia thi để trở thành Thủ khoa môn này!</p>
        </div>
      `;
      return;
    }

    // Render Podium (Top 3) & Bảng Top 4-10
    const top1 = top10[0];
    const top2 = top10[1];
    const top3 = top10[2];

    let html = `
      <!-- TOP 3 PODIUM -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 pt-2">
        
        <!-- HẠNG 2: BẠC -->
        ${top2 ? `
          <div class="order-2 md:order-1 p-4 rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200 border-2 border-slate-300 shadow-md text-center relative flex flex-col justify-between transform hover:-translate-y-1 transition-all">
            <div class="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-300 text-slate-800 font-black text-xs shadow-xs border border-white">
              🥈 HẠNG 2
            </div>
            <div class="mt-2">
              <div class="w-14 h-14 mx-auto rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl font-black text-slate-700 border border-slate-200">
                ${top2.hoVaTen ? top2.hoVaTen.charAt(0).toUpperCase() : "🥈"}
              </div>
              <h4 class="font-extrabold text-sm sm:text-base text-slate-800 mt-2 truncate">${top2.hoVaTen}</h4>
              <p class="text-xs font-semibold text-slate-500 font-mono">${top2.maHS} • Lớp ${top2.lop || "9"}</p>
            </div>
            <div class="mt-3 pt-3 border-t border-slate-300/70">
              <div class="text-2xl font-black text-slate-800 font-mono">${top2.score} <span class="text-xs text-slate-500">/ 10</span></div>
              <p class="text-[11px] text-slate-500 truncate mt-0.5">${top2.lessonTitle || "Bài kiểm tra"}</p>
              <span class="text-[10px] text-slate-400 font-medium">⏱️ ${formatTime(top2.timeSpentSeconds)}</span>
            </div>
          </div>
        ` : `<div class="order-2 md:order-1 hidden md:block"></div>`}

        <!-- HẠNG 1: THỦ KHOA VÀNG -->
        ${top1 ? `
          <div class="order-1 md:order-2 p-5 rounded-3xl bg-gradient-to-b from-amber-50 to-amber-100 border-3 border-amber-400 shadow-xl text-center relative flex flex-col justify-between transform md:-translate-y-2 hover:-translate-y-3 transition-all">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-black text-xs shadow-md border-2 border-white flex items-center gap-1">
              <span>👑</span>
              <span>THỦ KHOA TOP 1</span>
            </div>
            <div class="mt-2">
              <div class="w-18 h-18 mx-auto rounded-2xl bg-amber-400 shadow-lg shadow-amber-400/40 flex items-center justify-center text-3xl font-black text-amber-950 border-2 border-white">
                🥇
              </div>
              <h4 class="font-black text-base sm:text-lg text-amber-950 mt-2 truncate">${top1.hoVaTen}</h4>
              <p class="text-xs font-extrabold text-amber-800 font-mono">${top1.maHS} • Lớp ${top1.lop || "9"}</p>
            </div>
            <div class="mt-3 pt-3 border-t border-amber-300">
              <div class="text-3xl font-black text-amber-900 font-mono">${top1.score} <span class="text-xs text-amber-700">/ 10</span></div>
              <p class="text-[11px] font-bold text-amber-800 truncate mt-0.5">${top1.lessonTitle || "Bài kiểm tra"}</p>
              <span class="text-[10px] text-amber-700 font-bold">⏱️ ${formatTime(top1.timeSpentSeconds)} • ${top1.submittedAtVN ? top1.submittedAtVN.split(" ")[0] : "Hôm nay"}</span>
            </div>
          </div>
        ` : `<div class="order-1 md:order-2"></div>`}

        <!-- HẠNG 3: ĐỒNG -->
        ${top3 ? `
          <div class="order-3 p-4 rounded-3xl bg-gradient-to-b from-orange-50 to-orange-100 border-2 border-orange-300 shadow-md text-center relative flex flex-col justify-between transform hover:-translate-y-1 transition-all">
            <div class="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-3 py-0.5 rounded-full bg-orange-300 text-orange-950 font-black text-xs shadow-xs border border-white">
              🥉 HẠNG 3
            </div>
            <div class="mt-2">
              <div class="w-14 h-14 mx-auto rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl font-black text-orange-700 border border-orange-200">
                ${top3.hoVaTen ? top3.hoVaTen.charAt(0).toUpperCase() : "🥉"}
              </div>
              <h4 class="font-extrabold text-sm sm:text-base text-slate-800 mt-2 truncate">${top3.hoVaTen}</h4>
              <p class="text-xs font-semibold text-orange-800 font-mono">${top3.maHS} • Lớp ${top3.lop || "9"}</p>
            </div>
            <div class="mt-3 pt-3 border-t border-orange-300/70">
              <div class="text-2xl font-black text-orange-900 font-mono">${top3.score} <span class="text-xs text-orange-600">/ 10</span></div>
              <p class="text-[11px] text-slate-500 truncate mt-0.5">${top3.lessonTitle || "Bài kiểm tra"}</p>
              <span class="text-[10px] text-slate-400 font-medium">⏱️ ${formatTime(top3.timeSpentSeconds)}</span>
            </div>
          </div>
        ` : `<div class="order-3 hidden md:block"></div>`}

      </div>

      <!-- DANH SÁCH TOP 4 ĐẾN TOP 10 -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div class="p-3 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-600 flex items-center justify-between">
          <span>🎖️ BẢNG DANH DỰ (TOP 4 - TOP 10)</span>
          <span>Tổng số lượt thi đã ghi nhận: ${records.length}</span>
        </div>
        <div class="divide-y divide-slate-100">
    `;

    top10.forEach((item, index) => {
      if (index < 3) return; // Bỏ qua top 3 vì đã hiển thị ở Podium
      html += `
        <div class="p-3 sm:p-4 hover:bg-slate-50/80 flex items-center justify-between gap-3 transition-colors">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-black text-xs flex items-center justify-center shrink-0">
              #${index + 1}
            </span>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-sm text-slate-800">${item.hoVaTen}</span>
                <span class="text-[11px] font-bold text-indigo-600 font-mono">${item.maHS}</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold">Lớp ${item.lop || "9"}</span>
              </div>
              <p class="text-xs text-slate-500 truncate max-w-[280px] sm:max-w-md mt-0.5">${item.lessonTitle || "Bài thi"}</p>
            </div>
          </div>

          <div class="text-right shrink-0">
            <div class="text-base sm:text-lg font-black text-indigo-700 font-mono">${item.score} <span class="text-[10px] text-slate-400 font-normal">/ 10</span></div>
            <div class="text-[10px] text-slate-400">⏱️ ${formatTime(item.timeSpentSeconds)}</div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  } catch (err) {
    console.error("Lỗi khi tải bảng vàng:", err);
    container.innerHTML = `
      <div class="text-center p-8 text-rose-600">
        <p class="text-2xl">⚠️</p>
        <p class="font-bold text-sm mt-1">Không thể kết nối đến Firebase để lấy Bảng Vàng.</p>
        <p class="text-xs text-slate-500 mt-1">Vui lòng kiểm tra kết nối mạng và thử lại.</p>
      </div>
    `;
  }
}

function formatTime(seconds) {
  if (!seconds || seconds <= 0) return "0s";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}p ${s}s`;
}

// ==========================================
// 2. PHÂN TÍCH NĂNG LỰC 4 MỨC ĐỘ & CHẨN ĐOÁN LỖ HỔNG
// ==========================================

export function renderCognitiveGapAnalytics(examData, userAnswers) {
  const levels = {
    nhan_biet: { name: "Nhận biết", icon: "🌱", color: "emerald", total: 0, correct: 0 },
    thong_hieu: { name: "Thông hiểu", icon: "💡", color: "blue", total: 0, correct: 0 },
    van_dung: { name: "Vận dụng", icon: "⚙️", color: "amber", total: 0, correct: 0 },
    van_dung_cao: { name: "Vận dụng cao", icon: "🚀", color: "purple", total: 0, correct: 0 }
  };

  const wrongQuestions = [];

  examData.questions.forEach((q, idx) => {
    const lvl = q.cognitiveLevel || "thong_hieu";
    if (levels[lvl]) {
      levels[lvl].total++;
      if (userAnswers[idx] === q.correctAnswer) {
        levels[lvl].correct++;
      } else {
        wrongQuestions.push({ question: q, originalIndex: idx });
      }
    } else {
      // Fallback
      levels.thong_hieu.total++;
      if (userAnswers[idx] === q.correctAnswer) levels.thong_hieu.correct++;
      else wrongQuestions.push({ question: q, originalIndex: idx });
    }
  });

  // Tạo lời khuyên sư phạm cá nhân hóa
  let diagnosisText = "";
  const vdcAcc = levels.van_dung_cao.total > 0 ? (levels.van_dung_cao.correct / levels.van_dung_cao.total) : 1;
  const vdAcc = levels.van_dung.total > 0 ? (levels.van_dung.correct / levels.van_dung.total) : 1;
  const thAcc = levels.thong_hieu.total > 0 ? (levels.thong_hieu.correct / levels.thong_hieu.total) : 1;
  const nbAcc = levels.nhan_biet.total > 0 ? (levels.nhan_biet.correct / levels.nhan_biet.total) : 1;

  if (nbAcc < 0.8) {
    diagnosisText = "⚠️ **Lỗ hổng nền tảng:** Bạn đang để mất điểm ở phần *Nhận biết* cơ bản. Hãy rà soát lại định nghĩa, công thức sách giáo khoa trước khi làm bài nâng cao.";
  } else if (thAcc < 0.7) {
    diagnosisText = "💡 **Cần rèn luyện tính chính xác:** Bạn nắm được lý thuyết nhưng phần *Thông hiểu* còn vấp bẫy đề thi. Hãy tập trung đọc kỹ giả thiết và các trường hợp đặc biệt.";
  } else if (vdAcc < 0.6 || vdcAcc < 0.5) {
    diagnosisText = "🎯 **Đột phá điểm 9-10:** Bạn có nền tảng cơ bản rất tốt! Cần luyện tập thêm các bài toán thực tế, biến đổi đại số phức tạp và câu hỏi phân hóa *Vận dụng cao*.";
  } else {
    diagnosisText = "🏆 **Năng lực xuất sắc:** Toàn bộ 4 mức độ nhận thức đều đạt tỷ lệ rất cao! Bạn đã sẵn sàng chinh phục các kỳ thi Tuyển sinh vào 10 chuyên & HSG cấp tỉnh!";
  }

  const container = document.createElement("div");
  container.className = "mt-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/90 border-2 border-indigo-200 shadow-md text-left space-y-4";
  
  container.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <span class="text-2xl">🧠</span>
        <div>
          <h4 class="font-extrabold text-slate-900 text-sm sm:text-base">
            Biểu Đồ Năng Lực Nhận Thức GDPT 2018 & Chẩn Đoán Lỗ Hổng
          </h4>
          <p class="text-xs text-slate-500">Phân tích mức độ thành thạo kiến thức của học sinh</p>
        </div>
      </div>
      <span class="text-[11px] font-black px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">
        AI Analysis
      </span>
    </div>

    <!-- 4 Thanh tiến trình nhận thức -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
      ${Object.entries(levels).map(([key, data]) => {
        const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 100;
        const barColor = pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500";
        return `
          <div class="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700">
              <span class="flex items-center gap-1.5">
                <span>${data.icon}</span>
                <span>${data.name}</span>
              </span>
              <span class="font-mono text-indigo-700">${data.correct}/${data.total} (${pct}%)</span>
            </div>
            <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div class="${barColor} h-full rounded-full transition-all duration-500" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
      }).join("")}
    </div>

    <!-- Lời khuyên sư phạm -->
    <div class="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
      <span class="text-lg shrink-0">👩‍🏫</span>
      <div>
        <p class="font-bold">Đánh giá sư phạm từ Thầy Hùng ĐT:</p>
        <p class="mt-0.5 text-xs text-amber-900">${diagnosisText}</p>
      </div>
    </div>

    <!-- Nút Luyện tập lại các câu sai (Smart Re-try) -->
    ${wrongQuestions.length > 0 ? `
      <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-indigo-100">
        <div>
          <span class="font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-1">
            <span>🎯</span> Chế độ phục thù thông minh:
          </span>
          <p class="text-xs text-slate-500">Bạn có <strong>${wrongQuestions.length} câu</strong> chưa làm đúng. Luyện tập lại ngay để khắc sâu kiến thức!</p>
        </div>
        <button 
          type="button" 
          id="btn-retry-wrong-questions"
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
        >
          <span>🔁</span>
          <span>Luyện Tập Lại ${wrongQuestions.length} Câu Sai</span>
        </button>
      </div>
    ` : `
      <div class="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center text-xs font-bold">
        🌟 Chúc mừng! Bạn không làm sai câu nào trong bài thi này!
      </div>
    `}
  `;

  // Gắn sự kiện nút Luyện tập lại các câu sai
  const retryBtn = container.querySelector("#btn-retry-wrong-questions");
  if (retryBtn) {
    retryBtn.onclick = () => {
      startRetryWrongQuestions(examData, wrongQuestions);
    };
  }

  return container;
}

// 3. Khởi chạy Chế độ Luyện Tập Lại Các Câu Sai (Smart Re-try)
function startRetryWrongQuestions(examData, wrongQuestions) {
  if (!wrongQuestions || wrongQuestions.length === 0) return;

  const retryExamData = {
    examCode: `RETRY-${Math.floor(100 + Math.random() * 900)}`,
    title: `LUYỆN TẬP LỖ HỔNG: ${examData.title}`,
    subjectName: examData.subjectName || "Môn học",
    gradeName: examData.gradeName || "Khối 9",
    totalQuestions: wrongQuestions.length,
    timeMinutes: Math.max(5, Math.round(wrongQuestions.length * 1.5)),
    questions: wrongQuestions.map((item, idx) => ({
      ...item.question,
      order: idx + 1
    })),
    authorName: "Thầy Hùng ĐT (Smart Re-try)"
  };

  // Đóng overlay kết quả cũ nếu có
  const oldOverlay = document.getElementById("matrix-interactive-exam-overlay");
  if (oldOverlay) oldOverlay.remove();

  // Mở runner tương tác với bộ câu hỏi sai
  if (window.startInteractiveOnlineExam) {
    window.startInteractiveOnlineExam(retryExamData, `retry_${Date.now()}`);
  }
}

// ==========================================
// 3. BỘ ĐỀ THI THỬ CHUẨN TUYỂN SINH VÀO 10
// ==========================================

export function createMockExamsModal() {
  if (document.getElementById("mock-exams-modal")) return;

  const modal = document.createElement("div");
  modal.id = "mock-exams-modal";
  modal.className = "fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto hidden opacity-0 transition-opacity duration-200";

  modal.innerHTML = `
    <div class="relative w-full max-w-3xl my-6 rounded-3xl bg-white shadow-2xl border-4 border-indigo-500 overflow-hidden transform scale-95 transition-transform duration-200 flex flex-col max-h-[92vh]" id="mock-exams-card">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 p-4 sm:p-6 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-md shrink-0">
            🎓
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 tracking-wider">
                Tuyển Sinh Lớp 10 • THPT Chuyên & Công Lập
              </span>
              <span class="text-xs text-indigo-200 font-semibold hidden sm:inline">
                Thầy Hùng ĐT
              </span>
            </div>
            <h3 class="text-lg sm:text-2xl font-black text-white font-['Lexend'] mt-0.5">
              Bộ Đề Thi Thử Chuẩn Cấu Trúc Tuyển Sinh Vào 10
            </h3>
          </div>
        </div>

        <button 
          type="button" 
          onclick="window.closeMockExamsModal()" 
          class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Danh sách bộ đề mẫu 90p - 120p -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        
        <!-- Đề Toán Tuyển Sinh 10 -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/40 border-2 border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div class="flex items-start gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shrink-0 shadow-md shadow-blue-500/20">
              📐
            </div>
            <div>
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                Môn Toán • Thời gian: 90 Phút
              </span>
              <h4 class="font-black text-slate-900 text-base mt-1">Đề Thi Thử Tuyển Sinh Vào Lớp 10 - Môn Toán (Đề Số 01)</h4>
              <p class="text-xs text-slate-600 mt-0.5">Cấu trúc 40 câu trắc nghiệm phân hóa 4 mức độ: Vi-ét, Hình học tròn, Bài toán thực tế.</p>
            </div>
          </div>
          <button 
            type="button" 
            onclick="window.launchMockExam('toan-ltdh-k9', 'Đề Tuyển Sinh Vào 10 - Môn Toán')"
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0"
          >
            🚀 Thi Ngay
          </button>
        </div>

        <!-- Đề Vật Lí / KHTN Tuyển Sinh 10 -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 border-2 border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div class="flex items-start gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-2xl font-bold shrink-0 shadow-md shadow-amber-500/20">
              ⚡
            </div>
            <div>
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                Vật Lí / KHTN • Thời gian: 60 Phút
              </span>
              <h4 class="font-black text-slate-900 text-base mt-1">Đề Khảo Sát Năng Lực KHTN 9 Vào 10 (Đề Số 01)</h4>
              <p class="text-xs text-slate-600 mt-0.5">Điện học, Định luật Ôm, Công suất điện, Thấu kính hội tụ, khúc xạ ánh sáng.</p>
            </div>
          </div>
          <button 
            type="button" 
            onclick="window.launchMockExam('li-ltdh-k9', 'Đề Khảo Sát Năng Lực KHTN 9 Vào 10')"
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0"
          >
            🚀 Thi Ngay
          </button>
        </div>

        <!-- Đề Hóa Học Tuyển Sinh 10 -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/40 border-2 border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div class="flex items-start gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold shrink-0 shadow-md shadow-emerald-500/20">
              🧪
            </div>
            <div>
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                Hóa Học • Thời gian: 50 Phút
              </span>
              <h4 class="font-black text-slate-900 text-base mt-1">Đề Thi Thử Chuyên Hóa & KHTN 9 Vào 10</h4>
              <p class="text-xs text-slate-600 mt-0.5">Oxit, Axit, Dãy hoạt động hóa học, Kim loại, Hợp chất Hidrocacbon & bài toán hỗn hợp.</p>
            </div>
          </div>
          <button 
            type="button" 
            onclick="window.launchMockExam('hoa-ltdh-k9', 'Đề Thi Thử Hóa Học 9 Vào 10')"
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0"
          >
            🚀 Thi Ngay
          </button>
        </div>

        <!-- Đề Tiếng Anh Tuyển Sinh 10 -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/40 border-2 border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div class="flex items-start gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl font-bold shrink-0 shadow-md shadow-purple-500/20">
              🇬🇧
            </div>
            <div>
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-900">
                Tiếng Anh • Thời gian: 60 Phút
              </span>
              <h4 class="font-black text-slate-900 text-base mt-1">Đề Thi Thử Tuyển Sinh Tiếng Anh 9 Vào 10</h4>
              <p class="text-xs text-slate-600 mt-0.5">Ngữ pháp trọng tâm, Câu bị động, Câu gián tiếp, Mệnh đề quan hệ, Đọc hiểu & Phrasal Verbs.</p>
            </div>
          </div>
          <button 
            type="button" 
            onclick="window.launchMockExam('anh-ltdh-k9', 'Đề Thi Thử Tiếng Anh 9 Vào 10')"
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0"
          >
            🚀 Thi Ngay
          </button>
        </div>

      </div>

      <!-- Footer -->
      <div class="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 shrink-0">
        © Bản quyền đề thi: Thầy Hùng ĐT - TRUNG TÂM BDVH & LTĐH GIÁO HÙNG
      </div>

    </div>
  `;

  document.body.appendChild(modal);
}

// 4. Khởi chạy Đề Thi Mẫu Tuyển Sinh 10
window.launchMockExam = function (lessonId, customTitle) {
  window.closeMockExamsModal();

  const banks = window.__QUESTION_BANKS__ || {};
  let questions = banks[lessonId] || [];

  if (!questions || questions.length === 0) {
    alert("Đang chuẩn bị đề thi cho chuyên đề này!");
    return;
  }

  // Chuẩn hóa câu hỏi
  const examData = {
    examCode: `TS10-${Math.floor(100 + Math.random() * 900)}`,
    title: customTitle || "BÀI THI THỬ TUYỂN SINH VÀO 10",
    subjectName: lessonId.includes("toan") ? "Môn Toán" : lessonId.includes("li") ? "Môn Vật Lí" : lessonId.includes("hoa") ? "Môn Hóa Học" : "Môn Tiếng Anh",
    gradeName: "Lớp 9 Vào 10",
    totalQuestions: questions.length,
    timeMinutes: Math.max(15, Math.round(questions.length * 1.5)),
    questions: questions.map((q, idx) => ({ ...q, order: idx + 1 })),
    authorName: "Thầy Hùng ĐT"
  };

  if (window.startInteractiveOnlineExam) {
    window.startInteractiveOnlineExam(examData, lessonId);
  } else if (window.openExamPrintPreview) {
    window.openExamPrintPreview(examData);
  }
};

// ==========================================
// 4. CONTROLLERS ĐÓNG / MỞ MODAL
// ==========================================

window.openLeaderboardModal = function () {
  createLeaderboardModal();
  const modal = document.getElementById("leaderboard-modal");
  const card = document.getElementById("leaderboard-card");
  if (modal) {
    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      if (card) card.classList.remove("scale-95");
    });
    fetchAndRenderLeaderboard("all");
  }
};

window.closeLeaderboardModal = function () {
  const modal = document.getElementById("leaderboard-modal");
  const card = document.getElementById("leaderboard-card");
  if (modal) {
    modal.classList.add("opacity-0");
    if (card) card.classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 200);
  }
};

window.openMockExamsModal = function () {
  createMockExamsModal();
  const modal = document.getElementById("mock-exams-modal");
  const card = document.getElementById("mock-exams-card");
  if (modal) {
    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      if (card) card.classList.remove("scale-95");
    });
  }
};

window.closeMockExamsModal = function () {
  const modal = document.getElementById("mock-exams-modal");
  const card = document.getElementById("mock-exams-card");
  if (modal) {
    modal.classList.add("opacity-0");
    if (card) card.classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 200);
  }
};

// Export ra window
if (typeof window !== "undefined") {
  window.renderCognitiveGapAnalytics = renderCognitiveGapAnalytics;
  window.startRetryWrongQuestions = startRetryWrongQuestions;
}
