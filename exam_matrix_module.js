/**
 * Module Soạn Đề Thi Chuẩn Ma Trận GDPT 2018 & Xuất Đề Thi In Ấn / PDF
 * TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Thầy Hùng ĐT
 */

import { renderKatex } from "./katex_helper.js";

// 1. Thuật toán chọn lọc và xáo trộn câu hỏi theo Ma trận GDPT 2018
export function generateMatrixExam(options) {
  const {
    subjectKey = "toan",
    gradeNumber = 9,
    totalQuestions = 20,
    timeMinutes = 45,
    matrixRatio = { nb: 40, th: 30, vd: 20, vdc: 10 },
    selectedTopicIds = []
  } = options;

  const allQuestionsMap = (window.__QUESTION_BANKS__ && Object.keys(window.__QUESTION_BANKS__).length > 0)
    ? window.__QUESTION_BANKS__
    : (window.__EXTRA_QUESTION_BANKS__ || {});
  const allLessons = (window.__ALL_LESSONS__ && window.__ALL_LESSONS__.length > 0)
    ? window.__ALL_LESSONS__
    : (window.__EXTRA_LESSONS__ || []);

  // Lọc danh sách chuyên đề theo môn và khối
  let eligibleLessons = allLessons.filter(l => {
    const matchGrade = (l.gradeNumber === gradeNumber) || 
                       (gradeNumber === 9 && (l.grade === "Luyện thi vào 10" || l.grade === "Khối 9"));
    const matchSubject = 
      subjectKey === "toan" ? (l.subject === "Môn TOÁN" || l.id.startsWith("toan")) :
      subjectKey === "li" ? (l.subject === "Môn LÍ" || l.id.startsWith("li") || l.id.startsWith("khtn")) :
      subjectKey === "hoa" ? (l.subject === "Môn HÓA" || l.id.startsWith("hoa")) :
      subjectKey === "anh" ? (l.subject === "Môn ANH" || l.id.startsWith("anh")) :
      (l.id.startsWith("tin") || (l.subject && l.subject.includes("Tin")));
    return matchGrade && matchSubject;
  });

  if (selectedTopicIds.length > 0) {
    eligibleLessons = eligibleLessons.filter(l => selectedTopicIds.includes(l.id));
  }

  // Thu thập toàn bộ câu hỏi từ các chuyên đề hợp lệ
  let pool = [];
  const lessonIds = eligibleLessons.map(l => l.id);

  for (const lid of lessonIds) {
    if (allQuestionsMap[lid] && Array.isArray(allQuestionsMap[lid])) {
      pool.push(...allQuestionsMap[lid].map(q => ({ ...q, lessonId: lid })));
    }
  }

  // Nếu kho câu hỏi của chuyên đề đó ít hơn, bổ sung thêm từ toàn bộ môn đó
  if (pool.length < totalQuestions) {
    for (const [qid, qlist] of Object.entries(allQuestionsMap)) {
      const isSub = (subjectKey === "toan" && qid.includes("toan")) ||
                    (subjectKey === "li" && (qid.includes("li") || qid.includes("khtn"))) ||
                    (subjectKey === "hoa" && qid.includes("hoa")) ||
                    (subjectKey === "anh" && qid.includes("anh")) ||
                    (subjectKey === "tin" && qid.includes("tin"));
      if (isSub && !lessonIds.includes(qid) && Array.isArray(qlist)) {
        pool.push(...qlist.map(q => ({ ...q, lessonId: qid })));
      }
    }
  }

  // Fallback an toàn: nếu pool vẫn rỗng, lấy từ bất kỳ câu hỏi nào có sẵn trong hệ thống
  if (pool.length === 0) {
    for (const [qid, qlist] of Object.entries(allQuestionsMap)) {
      if (Array.isArray(qlist) && qlist.length > 0) {
        pool.push(...qlist.map(q => ({ ...q, lessonId: qid })));
      }
    }
  }

  // Phân nhóm câu hỏi theo 4 cấp độ nhận thức GDPT 2018
  const pools = {
    nb: [],  // Nhận biết (dễ)
    th: [],  // Thông hiểu (trung bình)
    vd: [],  // Vận dụng (khó)
    vdc: []  // Vận dụng cao
  };

  pool.forEach(q => {
    const diff = (q.difficulty || q.cognitiveLevel || "").toLowerCase();
    if (diff === "van_dung_cao" || diff === "vdc") {
      pools.vdc.push(q);
    } else if (diff === "kho" || diff === "van_dung" || diff === "vd") {
      pools.vd.push(q);
    } else if (diff === "trung_binh" || diff === "thong_hieu" || diff === "th") {
      pools.th.push(q);
    } else {
      pools.nb.push(q);
    }
  });

  // Tính số câu cần lấy cho từng cấp độ
  const targetCounts = {
    nb: Math.round((matrixRatio.nb / 100) * totalQuestions),
    th: Math.round((matrixRatio.th / 100) * totalQuestions),
    vd: Math.round((matrixRatio.vd / 100) * totalQuestions),
    vdc: 0
  };
  targetCounts.vdc = Math.max(0, totalQuestions - (targetCounts.nb + targetCounts.th + targetCounts.vd));

  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  const selectedQuestions = [];
  const pick = (list, count, fallbackList = []) => {
    const sList = shuffle(list);
    const picked = sList.slice(0, count);
    if (picked.length < count && fallbackList.length > 0) {
      const remaining = count - picked.length;
      const sFallback = shuffle(fallbackList.filter(item => !picked.includes(item)));
      picked.push(...sFallback.slice(0, remaining));
    }
    return picked;
  };

  const pickedNB = pick(pools.nb, targetCounts.nb, pool);
  const pickedTH = pick(pools.th, targetCounts.th, pool.filter(q => !pickedNB.includes(q)));
  const pickedVD = pick(pools.vd, targetCounts.vd, pool.filter(q => !pickedNB.includes(q) && !pickedTH.includes(q)));
  const pickedVDC = pick(pools.vdc, targetCounts.vdc, pool.filter(q => !pickedNB.includes(q) && !pickedTH.includes(q) && !pickedVD.includes(q)));

  selectedQuestions.push(...pickedNB, ...pickedTH, ...pickedVD, ...pickedVDC);

  // Đảm bảo đủ số câu
  if (selectedQuestions.length < totalQuestions && pool.length > 0) {
    const remaining = totalQuestions - selectedQuestions.length;
    const unpicked = pool.filter(q => !selectedQuestions.includes(q));
    selectedQuestions.push(...shuffle(unpicked).slice(0, remaining));

    while (selectedQuestions.length < totalQuestions) {
      const idx = selectedQuestions.length % pool.length;
      selectedQuestions.push({ ...pool[idx], id: `${pool[idx].id || 'q'}-dup-${selectedQuestions.length}` });
    }
  }

  // Đặt lại số thứ tự câu hỏi
  const finalQuestions = selectedQuestions.slice(0, totalQuestions).map((q, idx) => ({
    ...q,
    order: idx + 1
  }));

  const subjectNames = {
    toan: "MÔN TOÁN HỌC",
    li: "MÔN VẬT LÍ (KHTN)",
    hoa: "MÔN HÓA HỌC (KHTN)",
    anh: "MÔN TIẾNG ANH",
    tin: "MÔN TIN HỌC"
  };

  const gradeNames = {
    6: "Khối 6",
    7: "Khối 7",
    8: "Khối 8",
    9: "Khối 9 & Luyện thi vào 10"
  };

  const examCode = Math.floor(100 + Math.random() * 900);

  return {
    examCode: String(examCode),
    title: `ĐỀ KIỂM TRA CHUẨN MA TRẬN GDPT 2018 - ${subjectNames[subjectKey] || "ĐA MÔN"}`,
    subjectName: subjectNames[subjectKey] || "Đa Môn",
    gradeName: gradeNames[gradeNumber] || `Khối ${gradeNumber}`,
    totalQuestions: finalQuestions.length,
    timeMinutes,
    matrixSummary: {
      nb: pickedNB.length,
      th: pickedTH.length,
      vd: pickedVD.length,
      vdc: pickedVDC.length
    },
    questions: finalQuestions,
    createdAt: new Date().toLocaleDateString("vi-VN"),
    centerName: "TRUNG TÂM BDVH & LTĐH GIÁO HÙNG",
    authorName: "Thầy Hùng ĐT"
  };
}

// 2. Giao diện Modal Soạn Đề Chuẩn Ma Trận
export function createExamMatrixModal() {
  if (document.getElementById("exam-matrix-modal")) return;

  const modal = document.createElement("div");
  modal.id = "exam-matrix-modal";
  modal.className = "fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto hidden opacity-0 transition-opacity duration-200";

  modal.innerHTML = `
    <div class="relative w-full max-w-3xl my-6 rounded-3xl bg-white shadow-2xl border-4 border-indigo-500 overflow-hidden transform scale-95 transition-transform duration-200" id="exam-matrix-card">
      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 p-5 text-white flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20 shrink-0">
            🎯
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 tracking-wider">
                Ma Trận GDPT 2018
              </span>
              <span class="text-xs text-indigo-200 font-bold hidden sm:inline">
                TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Thầy Hùng ĐT
              </span>
            </div>
            <h3 class="text-lg sm:text-xl font-black text-white font-['Lexend'] mt-0.5">
              Bộ Tạo Đề Thi Theo Ma Trận Chuẩn Bộ GD&ĐT
            </h3>
          </div>
        </div>
        <button 
          type="button" 
          onclick="window.closeExamMatrixModal()"
          class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Body Form -->
      <div class="p-5 sm:p-7 space-y-6 max-h-[78vh] overflow-y-auto">
        <!-- 1. Chọn Môn học -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            1. Chọn Môn Học:
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2" id="matrix-subject-pills">
            <button type="button" data-subject="toan" class="matrix-sub-btn p-2.5 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-900 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all">
              <span>📐</span><span>Môn TOÁN</span>
            </button>
            <button type="button" data-subject="li" class="matrix-sub-btn p-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 hover:border-amber-400 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all">
              <span>⚡</span><span>Môn VẬT LÍ</span>
            </button>
            <button type="button" data-subject="hoa" class="matrix-sub-btn p-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 hover:border-emerald-500 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all">
              <span>🧪</span><span>Môn HÓA</span>
            </button>
            <button type="button" data-subject="anh" class="matrix-sub-btn p-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 hover:border-purple-500 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all">
              <span>🇬🇧</span><span>Môn ANH</span>
            </button>
            <button type="button" data-subject="tin" class="matrix-sub-btn p-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 hover:border-slate-400 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all">
              <span>💻</span><span>TIN HỌC</span>
            </button>
          </div>
        </div>

        <!-- 2. Chọn Khối Lớp -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            2. Chọn Khối Lớp / Kỳ Thi:
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2" id="matrix-grade-pills">
            <button type="button" data-grade="6" class="matrix-grade-btn p-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-extrabold text-xs transition-all">
              Khối 6
            </button>
            <button type="button" data-grade="7" class="matrix-grade-btn p-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-extrabold text-xs transition-all">
              Khối 7
            </button>
            <button type="button" data-grade="8" class="matrix-grade-btn p-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-extrabold text-xs transition-all">
              Khối 8
            </button>
            <button type="button" data-grade="9" class="matrix-grade-btn p-2.5 rounded-xl border-2 border-indigo-600 bg-indigo-50 text-indigo-900 font-black text-xs transition-all">
              ⭐ Khối 9 & Tuyển Sinh 10
            </button>
          </div>
        </div>

        <!-- 3. Số câu & Thời gian & Presets Ma Trận -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              3. Số lượng câu hỏi:
            </label>
            <select id="matrix-question-count" class="w-full p-3 rounded-xl border-2 border-slate-200 font-bold text-slate-800 outline-none focus:border-indigo-600 bg-white">
              <option value="10">10 Câu (Kiểm tra nhanh 15 phút)</option>
              <option value="20" selected>20 Câu (Kiểm tra 1 tiết 45 phút)</option>
              <option value="25">25 Câu (Kiểm tra Giữa kì / Cuối kì 60 phút)</option>
              <option value="40">40 Câu (Đề thi thử Chuẩn Tuyển sinh 90 phút)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              4. Thời gian làm bài:
            </label>
            <select id="matrix-time-select" class="w-full p-3 rounded-xl border-2 border-slate-200 font-bold text-slate-800 outline-none focus:border-indigo-600 bg-white">
              <option value="15">15 Phút</option>
              <option value="45" selected>45 Phút</option>
              <option value="60">60 Phút</option>
              <option value="90">90 Phút</option>
            </select>
          </div>
        </div>

        <!-- 4. Preset Ma trận chuẩn Bộ GD&ĐT -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-700">
              5. Tỷ lệ Ma Trận 4 Mức Độ Nhận Thức (GDPT 2018):
            </label>
            <span class="text-xs font-extrabold text-indigo-700" id="matrix-total-percent">Tổng: 100%</span>
          </div>

          <!-- Các nút Preset nhanh -->
          <div class="flex flex-wrap gap-1.5 mb-3" id="matrix-preset-container">
            <button type="button" onclick="window.applyMatrixPreset(40, 30, 20, 10, this)" class="matrix-preset-btn px-3 py-1.5 rounded-xl border-2 border-indigo-600 bg-indigo-50 text-indigo-900 font-black text-xs shadow-xs transition-all cursor-pointer">
              📌 Chuẩn Giữa kì / Cuối kì (40 - 30 - 20 - 10)
            </button>
            <button type="button" onclick="window.applyMatrixPreset(50, 40, 10, 0, this)" class="matrix-preset-btn px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer">
              📌 Kiểm tra 15p (50 - 40 - 10 - 0)
            </button>
            <button type="button" onclick="window.applyMatrixPreset(30, 30, 25, 15, this)" class="matrix-preset-btn px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer">
              📌 Thi Tuyển Sinh vào 10 (30 - 30 - 25 - 15)
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div class="text-center p-2 rounded-xl bg-white border border-emerald-200 shadow-2xs">
              <span class="text-[11px] font-black uppercase text-emerald-800">🟢 Nhận biết</span>
              <div class="flex items-center justify-center gap-1 mt-1">
                <input type="number" id="mat-nb" value="40" min="0" max="100" class="w-14 p-1 text-center font-black text-emerald-700 border border-slate-300 rounded-lg text-sm" />
                <span class="text-xs font-bold text-slate-500">%</span>
              </div>
              <div class="text-[10px] font-semibold text-slate-500 mt-1" id="nb-count-preview">8 câu</div>
            </div>

            <div class="text-center p-2 rounded-xl bg-white border border-blue-200 shadow-2xs">
              <span class="text-[11px] font-black uppercase text-blue-800">🔵 Thông hiểu</span>
              <div class="flex items-center justify-center gap-1 mt-1">
                <input type="number" id="mat-th" value="30" min="0" max="100" class="w-14 p-1 text-center font-black text-blue-700 border border-slate-300 rounded-lg text-sm" />
                <span class="text-xs font-bold text-slate-500">%</span>
              </div>
              <div class="text-[10px] font-semibold text-slate-500 mt-1" id="th-count-preview">6 câu</div>
            </div>

            <div class="text-center p-2 rounded-xl bg-white border border-amber-200 shadow-2xs">
              <span class="text-[11px] font-black uppercase text-amber-800">🟡 Vận dụng</span>
              <div class="flex items-center justify-center gap-1 mt-1">
                <input type="number" id="mat-vd" value="20" min="0" max="100" class="w-14 p-1 text-center font-black text-amber-700 border border-slate-300 rounded-lg text-sm" />
                <span class="text-xs font-bold text-slate-500">%</span>
              </div>
              <div class="text-[10px] font-semibold text-slate-500 mt-1" id="vd-count-preview">4 câu</div>
            </div>

            <div class="text-center p-2 rounded-xl bg-white border border-rose-200 shadow-2xs">
              <span class="text-[11px] font-black uppercase text-rose-800">🔴 Vận dụng cao</span>
              <div class="flex items-center justify-center gap-1 mt-1">
                <input type="number" id="mat-vdc" value="10" min="0" max="100" class="w-14 p-1 text-center font-black text-rose-700 border border-slate-300 rounded-lg text-sm" />
                <span class="text-xs font-bold text-slate-500">%</span>
              </div>
              <div class="text-[10px] font-semibold text-slate-500 mt-1" id="vdc-count-preview">2 câu</div>
            </div>
          </div>
        </div>

        <!-- 5. Tóm tắt ma trận & nút hành động -->
        <div class="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-indigo-950 font-bold">
          <div class="flex items-center gap-2">
            <span class="text-xl">📊</span>
            <span>Ma trận đã thiết lập: <span id="matrix-status-text" class="text-indigo-700 font-extrabold">20 câu • 45 phút • Tự động xáo đề</span></span>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[11px]">
            ✓ Đạt chuẩn GDPT 2018
          </span>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
        <button 
          type="button" 
          onclick="window.executeExportPrintExam()"
          class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-black text-xs sm:text-sm border-2 border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>📄</span>
          <span>Xuất Đề Thi Giấy & PDF (Chuẩn Bộ)</span>
        </button>

        <button 
          type="button" 
          onclick="window.executeStartOnlineExam()"
          class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🚀</span>
          <span>Bắt Đầu Thi Trực Tuyến Ngay</span>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Gắn sự kiện chuyển nút
  setupMatrixPillEvents();
}

let activeSubject = "toan";
let activeGrade = 9;

function updateMatrixStatusText() {
  const statusEl = document.getElementById("matrix-status-text");
  if (!statusEl) return;
  const qCount = parseInt(document.getElementById("matrix-question-count")?.value, 10) || 20;
  const timeMin = parseInt(document.getElementById("matrix-time-select")?.value, 10) || 45;
  const subNames = { toan: "Môn TOÁN", li: "Môn VẬT LÍ", hoa: "Môn HÓA", anh: "Môn ANH", tin: "TIN HỌC" };
  const gradeNames = { 6: "Khối 6", 7: "Khối 7", 8: "Khối 8", 9: "Khối 9 & Tuyển sinh 10" };
  statusEl.textContent = `${subNames[activeSubject] || "Toán"} • ${gradeNames[activeGrade] || "Khối 9"} • ${qCount} câu • ${timeMin} phút • Tự động xáo đề`;
}

function setupMatrixPillEvents() {
  const subBtns = document.querySelectorAll(".matrix-sub-btn");
  subBtns.forEach(btn => {
    btn.classList.add("cursor-pointer");
    btn.addEventListener("click", () => {
      subBtns.forEach(b => {
        b.className = "matrix-sub-btn p-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer";
      });
      btn.className = "matrix-sub-btn p-2.5 rounded-xl border-2 border-indigo-600 bg-indigo-50 text-indigo-900 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs";
      activeSubject = btn.getAttribute("data-subject");
      updateMatrixStatusText();
    });
  });

  const gradeBtns = document.querySelectorAll(".matrix-grade-btn");
  gradeBtns.forEach(btn => {
    btn.classList.add("cursor-pointer");
    btn.addEventListener("click", () => {
      gradeBtns.forEach(b => {
        b.className = "matrix-grade-btn p-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-extrabold text-xs transition-all cursor-pointer";
      });
      btn.className = "matrix-grade-btn p-2.5 rounded-xl border-2 border-indigo-600 bg-indigo-50 text-indigo-900 font-black text-xs transition-all cursor-pointer shadow-xs";
      activeGrade = parseInt(btn.getAttribute("data-grade"), 10);
      updateMatrixStatusText();
    });
  });

  const updateCounts = () => {
    const qCount = parseInt(document.getElementById("matrix-question-count").value, 10) || 20;
    const nb = parseInt(document.getElementById("mat-nb").value, 10) || 0;
    const th = parseInt(document.getElementById("mat-th").value, 10) || 0;
    const vd = parseInt(document.getElementById("mat-vd").value, 10) || 0;
    const vdc = parseInt(document.getElementById("mat-vdc").value, 10) || 0;

    const total = nb + th + vd + vdc;
    const totalEl = document.getElementById("matrix-total-percent");
    if (totalEl) {
      totalEl.textContent = `Tổng: ${total}%`;
      totalEl.className = total === 100 ? "text-xs font-extrabold text-emerald-600" : "text-xs font-extrabold text-rose-600";
    }

    document.getElementById("nb-count-preview").textContent = `${Math.round((nb / 100) * qCount)} câu`;
    document.getElementById("th-count-preview").textContent = `${Math.round((th / 100) * qCount)} câu`;
    document.getElementById("vd-count-preview").textContent = `${Math.round((vd / 100) * qCount)} câu`;
    document.getElementById("vdc-count-preview").textContent = `${Math.round((vdc / 100) * qCount)} câu`;
    updateMatrixStatusText();
  };

  ["matrix-question-count", "matrix-time-select", "mat-nb", "mat-th", "mat-vd", "mat-vdc"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateCounts);
    if (el) el.addEventListener("change", updateCounts);
  });

  const modal = document.getElementById("exam-matrix-modal");
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) window.closeExamMatrixModal();
    };
  }
}

window.applyMatrixPreset = function (nb, th, vd, vdc, presetBtn) {
  document.getElementById("mat-nb").value = nb;
  document.getElementById("mat-th").value = th;
  document.getElementById("mat-vd").value = vd;
  document.getElementById("mat-vdc").value = vdc;

  const qCount = parseInt(document.getElementById("matrix-question-count").value, 10) || 20;
  document.getElementById("nb-count-preview").textContent = `${Math.round((nb / 100) * qCount)} câu`;
  document.getElementById("th-count-preview").textContent = `${Math.round((th / 100) * qCount)} câu`;
  document.getElementById("vd-count-preview").textContent = `${Math.round((vd / 100) * qCount)} câu`;
  document.getElementById("vdc-count-preview").textContent = `${Math.round((vdc / 100) * qCount)} câu`;

  const totalEl = document.getElementById("matrix-total-percent");
  if (totalEl) {
    totalEl.textContent = "Tổng: 100%";
    totalEl.className = "text-xs font-extrabold text-emerald-600";
  }

  // Cập nhật trạng thái nút preset được click
  document.querySelectorAll(".matrix-preset-btn").forEach(b => {
    b.className = "matrix-preset-btn px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer";
  });
  if (presetBtn) {
    presetBtn.className = "matrix-preset-btn px-3 py-1.5 rounded-xl border-2 border-indigo-600 bg-indigo-50 text-indigo-900 font-black text-xs shadow-xs transition-all cursor-pointer";
  }

  updateMatrixStatusText();
};

window.openExamMatrixModal = function (preferredSubject, preferredGrade) {
  createExamMatrixModal();
  const modal = document.getElementById("exam-matrix-modal");
  const card = document.getElementById("exam-matrix-card");

  if (preferredSubject) {
    const subBtn = document.querySelector(`.matrix-sub-btn[data-subject="${preferredSubject}"]`);
    if (subBtn) subBtn.click();
  }
  if (preferredGrade) {
    const gradeBtn = document.querySelector(`.matrix-grade-btn[data-grade="${preferredGrade}"]`);
    if (gradeBtn) gradeBtn.click();
  }

  if (modal) {
    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      if (card) card.classList.remove("scale-95");
    });
  }
};

window.closeExamMatrixModal = function () {
  const modal = document.getElementById("exam-matrix-modal");
  const card = document.getElementById("exam-matrix-card");
  if (modal) {
    modal.classList.add("opacity-0");
    if (card) card.classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 200);
  }
};

// 3. Thực thi Xuất Đề Thi In Ấn & PDF
window.executeExportPrintExam = function () {
  const qCount = parseInt(document.getElementById("matrix-question-count").value, 10) || 20;
  const timeMin = parseInt(document.getElementById("matrix-time-select").value, 10) || 45;
  const nb = parseInt(document.getElementById("mat-nb").value, 10) || 40;
  const th = parseInt(document.getElementById("mat-th").value, 10) || 30;
  const vd = parseInt(document.getElementById("mat-vd").value, 10) || 20;
  const vdc = parseInt(document.getElementById("mat-vdc").value, 10) || 10;

  const examData = generateMatrixExam({
    subjectKey: activeSubject,
    gradeNumber: activeGrade,
    totalQuestions: qCount,
    timeMinutes: timeMin,
    matrixRatio: { nb, th, vd, vdc }
  });

  window.closeExamMatrixModal();
  openPrintPreviewModal(examData);
};

// 4. Giao diện Xem Trước & In Đề Thi Chuẩn A4 (Print Preview)
export function openPrintPreviewModal(examData) {
  if (!examData || !examData.questions || examData.questions.length === 0) {
    alert("Không tìm thấy câu hỏi phù hợp cho môn học và ma trận này! Vui lòng chọn môn khác hoặc chuyên đề khác.");
    return;
  }

  let modal = document.getElementById("exam-print-preview-modal");
  if (modal) modal.remove();

  modal = document.createElement("div");
  modal.id = "exam-print-preview-modal";
  modal.className = "fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto";

  const letters = ["A", "B", "C", "D"];

  modal.innerHTML = `
    <div class="relative w-full max-w-5xl my-4 rounded-3xl bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[92vh]">
      <!-- Top Action Bar (Không in) -->
      <div class="p-4 bg-slate-900 text-white rounded-t-3xl flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
        <div class="flex items-center gap-2.5">
          <span class="text-2xl">🖨️</span>
          <div>
            <h4 class="font-extrabold text-sm sm:text-base">Xem Trước Đề Thi Chuẩn Ma Trận In Ấn & PDF</h4>
            <p class="text-xs text-indigo-300">Khổ A4 • Chuẩn hóa font chữ & công thức Toán KaTeX sắc nét</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button 
            type="button" 
            onclick="window.print()" 
            class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🖨️ In Đề Thi Ngay (Ctrl+P)</span>
          </button>
          <button 
            type="button" 
            onclick="document.getElementById('exam-print-preview-modal').remove()" 
            class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-600 active:scale-95 text-white text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span>✕ Đóng Xem Trước</span>
          </button>
        </div>
      </div>

      <!-- Printable A4 Content Area -->
      <div class="p-6 sm:p-10 overflow-y-auto print:p-0 print:m-0 bg-white text-slate-900 font-serif leading-relaxed text-sm" id="printable-exam-sheet">
        <!-- Header Đề Thi Chuẩn Bộ -->
        <div class="border-b-2 border-slate-900 pb-4 mb-5">
          <div class="flex justify-between items-start text-xs sm:text-sm">
            <div class="text-center font-bold uppercase tracking-tight">
              <div>SỞ GD&ĐT • TRUNG TÂM BDVH & LTĐH GIÁO HÙNG</div>
              <div class="text-indigo-800 font-extrabold text-xs">Biên soạn: Thầy Hùng ĐT</div>
              <div class="mt-1 font-normal italic">KỲ THI KHẢO SÁT CHẤT LƯỢNG NĂM HỌC 2025 - 2026</div>
            </div>
            <div class="text-center font-bold uppercase tracking-tight">
              <div>${examData.title}</div>
              <div class="font-semibold text-xs normal-case italic mt-0.5">Thời gian: ${examData.timeMinutes} phút (không kể thời gian phát đề)</div>
              <div class="inline-block mt-1 px-3 py-0.5 border border-slate-900 font-mono font-bold text-xs">Mã đề: ${examData.examCode}</div>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-dashed border-slate-400 text-xs font-sans">
            <div><strong>Họ và tên thí sinh:</strong> .....................................</div>
            <div><strong>Lớp:</strong> ....................</div>
            <div><strong>Số báo danh:</strong> ....................</div>
            <div><strong>Phòng thi:</strong> ....................</div>
          </div>
        </div>

        <!-- Bảng Ma Trận Đề Thi Tóm Tắt -->
        <div class="mb-5 p-3 rounded-lg bg-slate-50 border border-slate-300 font-sans text-xs">
          <div class="font-bold text-slate-800 mb-1 flex items-center justify-between">
            <span>📊 THÔNG TIN MA TRẬN ĐỀ THI (THEO GDPT 2018):</span>
            <span>Tổng số câu: <strong>${examData.totalQuestions} câu</strong></span>
          </div>
          <div class="grid grid-cols-4 gap-2 text-center text-[11px]">
            <div class="p-1 rounded bg-white border border-slate-200">Nhận biết: <strong>${examData.matrixSummary.nb} câu</strong></div>
            <div class="p-1 rounded bg-white border border-slate-200">Thông hiểu: <strong>${examData.matrixSummary.th} câu</strong></div>
            <div class="p-1 rounded bg-white border border-slate-200">Vận dụng: <strong>${examData.matrixSummary.vd} câu</strong></div>
            <div class="p-1 rounded bg-white border border-slate-200">Vận dụng cao: <strong>${examData.matrixSummary.vdc} câu</strong></div>
          </div>
        </div>

        <!-- Danh sách Câu hỏi -->
        <div class="space-y-4">
          ${examData.questions.map((q, idx) => `
            <div class="break-inside-avoid">
              <div class="font-bold mb-1.5 flex items-start gap-1">
                <span class="text-slate-900 font-sans font-black">Câu ${idx + 1}:</span>
                <span class="exam-math-content">${q.question}</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 text-xs font-sans">
                ${(q.options || []).map((opt, optIdx) => `
                  <div class="flex items-start gap-1.5">
                    <span class="font-bold">${letters[optIdx]}.</span>
                    <span class="exam-math-content">${opt}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="text-center font-bold italic my-6 text-xs text-slate-600 font-sans">
          ---------- HẾT ----------<br/>
          (Cán bộ coi thi không giải thích gì thêm)
        </div>

        <!-- Phiếu trả lời trắc nghiệm & Bảng Đáp Án -->
        <div class="page-break-before border-t-4 border-slate-900 pt-6 mt-8">
          <h4 class="font-bold text-center uppercase tracking-wider text-base font-sans mb-3">
            PHIẾU TRẢ LỜI TRẮC NGHIỆM & HƯỚNG DẪN CHẤM CHI TIẾT
          </h4>

          <div class="mb-5">
            <h5 class="font-bold font-sans text-xs uppercase text-slate-700 mb-2">1. Bảng Đáp Án (Mã Đề ${examData.examCode}):</h5>
            <div class="grid grid-cols-5 sm:grid-cols-10 gap-1 text-center font-sans text-xs">
              ${examData.questions.map((q, idx) => `
                <div class="p-1.5 rounded border border-slate-300 bg-slate-50">
                  <div class="font-bold text-slate-500 text-[10px]">${idx + 1}</div>
                  <div class="font-black text-indigo-700 text-sm">${letters[q.correctAnswer] || "A"}</div>
                </div>
              `).join("")}
            </div>
          </div>

          <div>
            <h5 class="font-bold font-sans text-xs uppercase text-slate-700 mb-2">2. Hướng Dẫn Giải Chi Tiết Từng Câu:</h5>
            <div class="space-y-3 font-sans text-xs">
              ${examData.questions.map((q, idx) => `
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="font-bold text-indigo-900">
                    Câu ${idx + 1}: Đáp án <span class="text-indigo-600 font-black">${letters[q.correctAnswer] || "A"}</span>
                  </div>
                  <div class="text-slate-700 mt-1 leading-relaxed exam-math-content">
                    ${q.explanation || "Đang cập nhật hướng dẫn giải."}
                  </div>
                  ${q.hint ? `
                    <div class="text-slate-500 italic mt-0.5 text-[11px] exam-math-content">
                      💡 Ghi chú: ${q.hint}
                    </div>
                  ` : ""}
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  // Render KaTeX cho toàn bộ đề thi vừa mở
  if (window.renderKatex) {
    window.renderKatex(document.getElementById("printable-exam-sheet"));
  }
}

// 5. Thực thi Bắt đầu Làm Bài Thi Trực Tuyến Ngay
window.executeStartOnlineExam = function () {
  const qCount = parseInt(document.getElementById("matrix-question-count").value, 10) || 20;
  const timeMin = parseInt(document.getElementById("matrix-time-select").value, 10) || 45;
  const nb = parseInt(document.getElementById("mat-nb").value, 10) || 40;
  const th = parseInt(document.getElementById("mat-th").value, 10) || 30;
  const vd = parseInt(document.getElementById("mat-vd").value, 10) || 20;
  const vdc = parseInt(document.getElementById("mat-vdc").value, 10) || 10;

  const examData = generateMatrixExam({
    subjectKey: activeSubject,
    gradeNumber: activeGrade,
    totalQuestions: qCount,
    timeMinutes: timeMin,
    matrixRatio: { nb, th, vd, vdc }
  });

  window.closeExamMatrixModal();

  // Đăng ký bộ câu hỏi vào ngân hàng tạm thời
  const tempLessonId = `matrix-exam-${Date.now()}`;
  window.__QUESTION_BANKS__ = window.__QUESTION_BANKS__ || window.__EXTRA_QUESTION_BANKS__ || {};
  window.__QUESTION_BANKS__[tempLessonId] = examData.questions;

  // Khởi động giao diện làm bài thi trực tuyến
  startInteractiveOnlineExam(examData, tempLessonId);
};

// 6. Trình Chấm Thi & Làm Bài Trực Tuyến Cao Cấp (Interactive Online Exam Runner)
function startInteractiveOnlineExam(examData, lessonId) {
  if (!examData || !examData.questions || examData.questions.length === 0) {
    alert("Không tìm thấy câu hỏi phù hợp cho môn học và ma trận này! Vui lòng chọn môn khác hoặc chuyên đề khác.");
    return;
  }

  let container = document.getElementById("matrix-interactive-exam-overlay");
  if (container) container.remove();

  container = document.createElement("div");
  container.id = "matrix-interactive-exam-overlay";
  container.className = "fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col overflow-hidden text-slate-800";

  let currentIndex = 0;
  const userAnswers = {};
  let remainingSeconds = examData.timeMinutes * 60;
  let timerInterval = null;

  const letters = ["A", "B", "C", "D"];

  const renderCurrentView = () => {
    const q = examData.questions[currentIndex];
    if (!q) return;
    const mins = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const secs = String(remainingSeconds % 60).padStart(2, "0");

    const answeredCount = Object.keys(userAnswers).length;

    container.innerHTML = `
      <!-- Top Navigation & Timer Bar -->
      <div class="p-3 sm:p-4 bg-slate-900 text-white flex items-center justify-between border-b border-indigo-500/30 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-xl shrink-0">
            🎯
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">
                Thi Trực Tuyến
              </span>
              <span class="text-xs text-indigo-200 font-bold hidden sm:inline">${examData.title}</span>
            </div>
            <h3 class="text-sm sm:text-base font-black text-white font-['Lexend'] mt-0.5">
              ${examData.subjectName} • ${examData.gradeName} (Mã đề: ${examData.examCode})
            </h3>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Đồng hồ đếm ngược -->
          <div class="px-3.5 py-1.5 rounded-2xl bg-slate-800 border border-indigo-400/30 flex items-center gap-2">
            <span class="text-base animate-pulse">⏱️</span>
            <span class="font-mono font-black text-amber-400 text-sm sm:text-base" id="exam-timer-display">${mins}:${secs}</span>
          </div>

          <!-- Nút Nộp Bài -->
          <button 
            type="button" 
            id="submit-online-exam-btn"
            class="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Nộp Bài Thi
          </button>

          <!-- Nút Hủy / Thoát -->
          <button 
            type="button" 
            id="exit-online-exam-btn"
            class="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Thoát bài thi"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Main Question & Palette Layout -->
      <div class="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-100">
        <!-- Khu vực hiển thị Câu hỏi -->
        <div class="flex-1 p-4 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div class="max-w-3xl mx-auto w-full space-y-6">
            <!-- Header câu hỏi -->
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-sm">
                  Câu ${currentIndex + 1} / ${examData.totalQuestions}
                </span>
                <span class="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 font-extrabold text-xs">
                  ${q.cognitiveLevel === "nhan_biet" || q.difficulty === "de" ? "🟢 Nhận biết" :
                    q.cognitiveLevel === "thong_hieu" || q.difficulty === "trung_binh" ? "🔵 Thông hiểu" :
                    q.cognitiveLevel === "van_dung" || q.difficulty === "kho" ? "🟡 Vận dụng" : "🔴 Vận dụng cao"}
                </span>
              </div>
              <span class="text-xs text-slate-500 font-bold">
                Đã trả lời: ${answeredCount}/${examData.totalQuestions} câu
              </span>
            </div>

            <!-- Nội dung câu hỏi -->
            <div class="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-sans bg-white p-6 rounded-3xl shadow-sm border border-slate-200 math-rendered-box">
              ${q.question}
            </div>

            <!-- Các lựa chọn đáp án A, B, C, D -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              ${(q.options || []).map((opt, optIdx) => {
                const isSelected = userAnswers[currentIndex] === optIdx;
                return `
                  <button 
                    type="button" 
                    data-opt-index="${optIdx}"
                    class="exam-option-card p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected ? "border-indigo-600 bg-indigo-50/80 shadow-md shadow-indigo-500/10" : "border-slate-200 bg-white hover:border-indigo-300"
                    }"
                  >
                    <div class="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                      isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
                    }">
                      ${letters[optIdx]}
                    </div>
                    <div class="font-bold text-sm sm:text-base text-slate-800 leading-snug pt-1 math-rendered-box">
                      ${opt}
                    </div>
                  </button>
                `;
              }).join("")}
            </div>
          </div>

          <!-- Bottom Navigation Buttons -->
          <div class="max-w-3xl mx-auto w-full pt-6 flex items-center justify-between">
            <button 
              type="button" 
              id="prev-question-btn"
              ${currentIndex === 0 ? "disabled" : ""}
              class="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm border border-slate-300 shadow-2xs disabled:opacity-40 transition-all cursor-pointer"
            >
              ← Câu trước
            </button>

            <button 
              type="button" 
              id="next-question-btn"
              ${currentIndex === examData.totalQuestions - 1 ? "disabled" : ""}
              class="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-indigo-600/20 disabled:opacity-40 transition-all cursor-pointer"
            >
              Câu tiếp theo →
            </button>
          </div>
        </div>

        <!-- Bảng điều hướng câu hỏi (Question Palette) -->
        <div class="w-full lg:w-72 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-4 shrink-0 flex flex-col justify-between">
          <div>
            <h4 class="font-black text-slate-800 text-xs sm:text-sm uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Bảng câu hỏi</span>
              <span class="text-indigo-600 font-bold text-xs">${answeredCount}/${examData.totalQuestions} đã làm</span>
            </h4>
            <div class="grid grid-cols-5 gap-2 max-h-60 lg:max-h-[60vh] overflow-y-auto p-1">
              ${examData.questions.map((_, i) => {
                const isAns = userAnswers[i] !== undefined;
                const isCur = i === currentIndex;
                return `
                  <button 
                    type="button" 
                    data-question-index="${i}"
                    class="question-palette-btn w-10 h-10 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center ${
                      isCur ? "ring-3 ring-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30" :
                      isAns ? "bg-emerald-500 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }"
                  >
                    ${i + 1}
                  </button>
                `;
              }).join("")}
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 text-[11px] space-y-1.5 text-slate-500 font-semibold">
            <div class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 rounded bg-emerald-500 inline-block"></span>
              <span>Đã chọn đáp án</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 rounded bg-slate-200 inline-block"></span>
              <span>Chưa trả lời</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 rounded ring-2 ring-indigo-600 bg-indigo-600 inline-block"></span>
              <span>Câu đang xem</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Render KaTeX trên câu hỏi và các lựa chọn
    if (window.renderKatex) {
      container.querySelectorAll(".math-rendered-box").forEach(el => window.renderKatex(el));
    }

    // Gắn sự kiện chọn đáp án
    container.querySelectorAll(".exam-option-card").forEach(btn => {
      btn.addEventListener("click", () => {
        const optIdx = parseInt(btn.getAttribute("data-opt-index"), 10);
        userAnswers[currentIndex] = optIdx;
        renderCurrentView();
      });
    });

    // Gắn sự kiện chuyển câu
    const prevBtn = document.getElementById("prev-question-btn");
    if (prevBtn) prevBtn.onclick = () => { if (currentIndex > 0) { currentIndex--; renderCurrentView(); } };

    const nextBtn = document.getElementById("next-question-btn");
    if (nextBtn) nextBtn.onclick = () => { if (currentIndex < examData.totalQuestions - 1) { currentIndex++; renderCurrentView(); } };

    // Gắn sự kiện chọn nhanh từ Palette
    container.querySelectorAll(".question-palette-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentIndex = parseInt(btn.getAttribute("data-question-index"), 10);
        renderCurrentView();
      });
    });

    // Nút nộp bài
    const submitBtn = document.getElementById("submit-online-exam-btn");
    if (submitBtn) {
      submitBtn.onclick = () => {
        const unanswered = examData.totalQuestions - Object.keys(userAnswers).length;
        if (unanswered > 0) {
          if (!confirm(`Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài thi không?`)) {
            return;
          }
        }
        finishExam();
      };
    }

    // Nút thoát
    const exitBtn = document.getElementById("exit-online-exam-btn");
    if (exitBtn) {
      exitBtn.onclick = () => {
        if (confirm("Bạn có chắc chắn muốn thoát khỏi bài thi này? Điểm số sẽ không được lưu.")) {
          clearInterval(timerInterval);
          container.remove();
        }
      };
    }
  };

  // Tính điểm và hoàn thành bài thi
  const finishExam = () => {
    clearInterval(timerInterval);

    let correctCount = 0;
    examData.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Number(((correctCount / examData.totalQuestions) * 10).toFixed(1));
    const percentage = Math.round((correctCount / examData.totalQuestions) * 100);

    // Tự động lưu lên Firebase
    if (window.autoSaveExamToFirebase) {
      const student = JSON.parse(localStorage.getItem("ontap_logged_student") || "null");
      window.autoSaveExamToFirebase(
        student,
        {
          lessonId,
          lessonTitle: examData.title,
          grade: examData.gradeName,
          score,
          percentage,
          difficultyMode: "chuan_ma_tran_2018",
          timeSpentSeconds: (examData.timeMinutes * 60) - remainingSeconds
        },
        correctCount,
        examData.totalQuestions
      );
    }

    // Hiển thị kết quả
    displayExamResults(examData, userAnswers, score, correctCount, container);
  };

  // Khởi chạy đếm ngược thời gian
  timerInterval = setInterval(() => {
    remainingSeconds--;
    const timerDisplay = document.getElementById("exam-timer-display");
    if (timerDisplay) {
      const mins = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
      const secs = String(remainingSeconds % 60).padStart(2, "0");
      timerDisplay.textContent = `${mins}:${secs}`;
    }
    if (remainingSeconds <= 0) {
      alert("Hết giờ làm bài! Hệ thống đang tự động nộp bài của bạn.");
      finishExam();
    }
  }, 1000);

  document.body.appendChild(container);
  renderCurrentView();
}

// 7. Hiển thị Màn Hình Kết Quả Thi & Xem Lại Lời Giải Chi Tiết
function displayExamResults(examData, userAnswers, score, correctCount, container) {
  const letters = ["A", "B", "C", "D"];
  const total = examData.totalQuestions;

  container.innerHTML = `
    <div class="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50 flex items-center justify-center">
      <div class="max-w-3xl w-full my-6 bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 text-center space-y-6">
        <div class="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-4xl shadow-xl shadow-orange-500/25">
          ${score >= 8 ? "🏆" : score >= 5 ? "🎉" : "💪"}
        </div>

        <div>
          <span class="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Đã hoàn thành & Lưu lên Firebase
          </span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 font-['Lexend'] mt-2">
            Kết Quả Bài Thi Chuẩn Ma Trận
          </h2>
          <p class="text-sm text-slate-500 font-semibold mt-1">
            ${examData.title} • Mã đề: ${examData.examCode}
          </p>
        </div>

        <!-- Bảng điểm to -->
        <div class="grid grid-cols-3 gap-3 max-w-md mx-auto p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
          <div>
            <div class="text-xs text-slate-500 font-bold uppercase">Điểm Số</div>
            <div class="text-3xl font-black text-indigo-700 font-mono mt-1">${score}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500 font-bold uppercase">Số Câu Đúng</div>
            <div class="text-3xl font-black text-emerald-600 font-mono mt-1">${correctCount}/${total}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500 font-bold uppercase">Tỷ Lệ Đúng</div>
            <div class="text-3xl font-black text-amber-600 font-mono mt-1">${Math.round((correctCount/total)*100)}%</div>
          </div>
        </div>

        <!-- Bảng xem lại chi tiết từng câu -->
        <div class="text-left space-y-3 pt-4 border-t border-slate-200">
          <h4 class="font-extrabold text-sm sm:text-base text-slate-900">
            📝 Hướng Dẫn Giải Chi Tiết Từng Câu:
          </h4>
          <div class="space-y-3 max-h-72 overflow-y-auto pr-1">
            ${examData.questions.map((q, idx) => {
              const uAns = userAnswers[idx];
              const isCorrect = uAns === q.correctAnswer;
              return `
                <div class="p-3.5 rounded-2xl border text-xs sm:text-sm ${
                  isCorrect ? "bg-emerald-50/60 border-emerald-300" : "bg-rose-50/60 border-rose-300"
                }">
                  <div class="flex items-center justify-between font-bold">
                    <span>Câu ${idx + 1}: ${isCorrect ? "✅ Đúng" : "❌ Chưa đúng"}</span>
                    <span>Bạn chọn: <strong class="text-indigo-700">${uAns !== undefined ? letters[uAns] : "Bỏ qua"}</strong> | Đáp án đúng: <strong class="text-emerald-700">${letters[q.correctAnswer]}</strong></span>
                  </div>
                  <div class="font-semibold text-slate-800 mt-1 math-rendered-box">${q.question}</div>
                  <div class="text-xs text-slate-600 mt-1.5 math-rendered-box italic">💡 Giải thích: ${q.explanation || "Chưa có lời giải chi tiết."}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Nút hành động -->
        <div class="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button 
            type="button" 
            onclick="window.openPrintPreviewModal(${JSON.stringify(examData).replace(/"/g, '&quot;')})"
            class="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-black text-xs sm:text-sm border-2 border-slate-300 shadow-2xs transition-all cursor-pointer"
          >
            🖨️ In đề thi & Phiếu đáp án
          </button>
          <button 
            type="button" 
            onclick="document.getElementById('matrix-interactive-exam-overlay').remove()"
            class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Quay Về Trang Chủ
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.renderKatex) {
    container.querySelectorAll(".math-rendered-box").forEach(el => window.renderKatex(el));
  }
}

// 8. Tự khởi tạo và gắn vào window
if (typeof window !== "undefined") {
  window.generateMatrixExam = generateMatrixExam;
  window.openExamPrintPreview = openPrintPreviewModal;
}
