/**
 * Module Soạn Thảo & Quản Lý Câu Hỏi CMS Dành Cho Giáo Viên
 * TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Thầy Hùng ĐT
 * Hỗ trợ:
 * 1. Thêm câu hỏi thủ công kèm KaTeX xem trước thời gian thực
 * 2. Nhập đề tự động siêu tốc từ file Word / văn bản copy-paste
 * 3. Quản lý danh sách câu hỏi đã soạn, lưu Firebase & đồng bộ ngân hàng
 */

import { renderKatex } from "./katex_helper.js";
import { showToast } from "./auth_ui.js";

const FIREBASE_DB_URL = "https://cosodulieuhungtbs-default-rtdb.asia-southeast1.firebasedatabase.app";

// 1. Giao diện Modal Soạn Thảo CMS
export function createTeacherCmsModal() {
  if (document.getElementById("teacher-cms-modal")) return;

  const modal = document.createElement("div");
  modal.id = "teacher-cms-modal";
  modal.className = "fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto hidden opacity-0 transition-opacity duration-200";

  modal.innerHTML = `
    <div class="relative w-full max-w-4xl my-6 rounded-3xl bg-white shadow-2xl border-4 border-amber-500 overflow-hidden transform scale-95 transition-transform duration-200 flex flex-col max-h-[92vh]" id="teacher-cms-card">
      <!-- Header -->
      <div class="bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-950 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-md shrink-0">
            ✍️
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-300 text-amber-950 tracking-wider">
                Teacher CMS • Quản Lý Ngân Hàng Đề
              </span>
              <span class="text-xs text-amber-200 font-semibold hidden sm:inline">
                Thầy Hùng ĐT
              </span>
            </div>
            <h3 class="text-base sm:text-xl font-black text-white font-['Lexend'] mt-0.5">
              Soạn Thảo Câu Hỏi & Nhập Đề Tự Động
            </h3>
          </div>
        </div>

        <button 
          type="button" 
          onclick="window.closeTeacherCmsModal()" 
          class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Tab Switcher -->
      <div class="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0">
        <div class="flex items-center gap-2">
          <button 
            type="button" 
            id="cms-tab-import-btn"
            class="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>📥</span>
            <span>Nhập Đề Nhanh (Word / Text)</span>
          </button>

          <button 
            type="button" 
            id="cms-tab-manual-btn"
            class="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>✏️</span>
            <span>Soạn Thủ Công Từng Câu</span>
          </button>

          <button 
            type="button" 
            id="cms-tab-list-btn"
            class="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>📚</span>
            <span>Kho Câu Hỏi Đã Soạn</span>
          </button>
        </div>

        <span class="text-[11px] font-bold text-indigo-700 hidden sm:inline" id="cms-synced-count">
          ☁️ Đang kết nối Firebase
        </span>
      </div>

      <!-- Body Panels Container -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 text-slate-800">
        
        <!-- PANEL 1: NHẬP ĐỀ NHANH TỪ VĂN BẢN (FAST IMPORT) -->
        <div id="cms-panel-import" class="space-y-4">
          <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <span class="text-xl shrink-0">💡</span>
            <div>
              <p class="font-bold">Hướng dẫn nhập đề siêu tốc từ file Word hoặc PDF:</p>
              <p class="text-xs text-amber-800 mt-1 leading-relaxed">
                Thầy chỉ cần sao chép (copy) toàn bộ văn bản đề thi và dán vào ô bên dưới. Hệ thống sẽ tự động nhận diện:
                <b>Câu hỏi, các lựa chọn A, B, C, D, Đáp án đúng</b> và <b>Lời giải</b> (Hỗ trợ công thức Toán dạng <code>$x^2 + \sqrt{y}$</code>).
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Môn học:</label>
              <select id="import-subject-select" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs">
                <option value="toan">📐 Môn TOÁN</option>
                <option value="li">⚡ Môn VẬT LÍ (KHTN)</option>
                <option value="hoa">🧪 Môn HÓA HỌC (KHTN)</option>
                <option value="anh">🇬🇧 Môn TIẾNG ANH</option>
                <option value="tin">💻 Môn TIN HỌC</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Khối lớp:</label>
              <select id="import-grade-select" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs">
                <option value="9">⭐ Khối 9 & Luyện thi vào 10</option>
                <option value="8">Khối 8</option>
                <option value="7">Khối 7</option>
                <option value="6">Khối 6</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Tên chuyên đề lưu trữ:</label>
              <input type="text" id="import-topic-title" placeholder="VD: Khảo sát chất lượng Toán vào 10" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs outline-none focus:border-indigo-600" value="Đề khảo sát chất lượng bồi dưỡng Thầy Hùng ĐT" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-bold text-slate-700">Dán nội dung đề thi vào đây:</label>
              <button type="button" id="cms-fill-sample-btn" class="text-xs text-indigo-600 hover:underline font-bold cursor-pointer">
                + Dán đề mẫu kiểm tra thử
              </button>
            </div>
            <textarea 
              id="import-raw-textarea" 
              rows="9" 
              class="w-full p-3.5 rounded-2xl border-2 border-slate-300 font-mono text-xs leading-relaxed outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
              placeholder="Câu 1: Cho biểu thức $P = \sqrt{x} + 2$. Khi $x = 9$ thì giá trị của P là:&#10;A. 5&#10;B. 3&#10;C. 11&#10;D. 7&#10;Đáp án: A&#10;Lời giải: Thay $x = 9$ vào biểu thức: $P = \sqrt{9} + 2 = 3 + 2 = 5$.&#10;&#10;Câu 2: ..."
            ></textarea>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div class="text-xs text-slate-500 font-semibold" id="import-stats-label">
              Chưa phân tích nội dung. Nhấn "Phân tích cú pháp" bên dưới.
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button 
                type="button" 
                id="cms-parse-btn" 
                class="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>🔍</span>
                <span>Phân Tích Cú Pháp & Xem Trước</span>
              </button>

              <button 
                type="button" 
                id="cms-save-imported-btn" 
                class="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                <span>💾</span>
                <span>Lưu Vào Ngân Hàng Đề</span>
              </button>
            </div>
          </div>

          <!-- Khu vực xem trước câu hỏi vừa phân tích -->
          <div id="import-preview-container" class="space-y-3 pt-3 border-t border-slate-200 hidden">
            <h4 class="text-xs font-black uppercase text-indigo-900 tracking-wider flex items-center justify-between">
              <span>📋 Kết quả nhận diện câu hỏi:</span>
              <span id="import-recognized-count" class="text-emerald-700 font-bold normal-case"></span>
            </h4>
            <div id="import-preview-list" class="space-y-2.5 max-h-60 overflow-y-auto pr-1"></div>
          </div>
        </div>

        <!-- PANEL 2: SOẠN THỦ CÔNG TỪNG CÂU (MANUAL EDITOR) -->
        <div id="cms-panel-manual" class="space-y-4 hidden">
          <form id="cms-manual-form" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Môn học:</label>
                <select id="manual-subject" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs">
                  <option value="toan">📐 Môn TOÁN</option>
                  <option value="li">⚡ Môn VẬT LÍ</option>
                  <option value="hoa">🧪 Môn HÓA HỌC</option>
                  <option value="anh">🇬🇧 Môn TIẾNG ANH</option>
                  <option value="tin">💻 Môn TIN HỌC</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Khối lớp:</label>
                <select id="manual-grade" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs">
                  <option value="9">⭐ Khối 9 & Vào 10</option>
                  <option value="8">Khối 8</option>
                  <option value="7">Khối 7</option>
                  <option value="6">Khối 6</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Mức độ nhận thức:</label>
                <select id="manual-cognitive" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-xs text-indigo-900">
                  <option value="nhan_biet">🟢 Nhận biết (Dễ)</option>
                  <option value="thong_hieu">🔵 Thông hiểu (Trung bình)</option>
                  <option value="van_dung">🟡 Vận dụng (Khó)</option>
                  <option value="van_dung_cao">🔴 Vận dụng cao (Phân loại giỏi)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Đáp án đúng:</label>
                <select id="manual-correct" class="w-full p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-black text-xs">
                  <option value="0">Phương án A</option>
                  <option value="1">Phương án B</option>
                  <option value="2">Phương án C</option>
                  <option value="3">Phương án D</option>
                </select>
              </div>
            </div>

            <!-- Câu hỏi -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">
                Nội dung câu hỏi (hỗ trợ KaTeX như <code>$x^2 + 2x$</code>):
              </label>
              <textarea 
                id="manual-question-text" 
                rows="3" 
                required
                class="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                placeholder="Nhập đề bài câu hỏi tại đây..."
              ></textarea>
            </div>

            <!-- 4 Phương án -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-1">Phương án A:</label>
                <input type="text" id="manual-opt-a" required class="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium" placeholder="Nội dung phương án A" />
              </div>
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-1">Phương án B:</label>
                <input type="text" id="manual-opt-b" required class="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium" placeholder="Nội dung phương án B" />
              </div>
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-1">Phương án C:</label>
                <input type="text" id="manual-opt-c" required class="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium" placeholder="Nội dung phương án C" />
              </div>
              <div>
                <label class="block text-xs font-bold text-indigo-700 mb-1">Phương án D:</label>
                <input type="text" id="manual-opt-d" required class="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium" placeholder="Nội dung phương án D" />
              </div>
            </div>

            <!-- Lời giải & Mẹo -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Lời giải chi tiết:</label>
                <textarea id="manual-explanation" rows="2" class="w-full p-2.5 rounded-xl border border-slate-300 text-xs" placeholder="Các bước suy luận và tính toán..."></textarea>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Gợi ý / Mẹo giải nhanh:</label>
                <textarea id="manual-hint" rows="2" class="w-full p-2.5 rounded-xl border border-slate-300 text-xs" placeholder="Ghi nhớ công thức hoặc dấu hiệu nhận biết..."></textarea>
              </div>
            </div>

            <!-- Live KaTeX Preview -->
            <div class="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200">
              <div class="text-[11px] font-black uppercase text-indigo-900 tracking-wide mb-1">
                👁️ Xem trước công thức Toán học KaTeX:
              </div>
              <div id="manual-live-preview" class="text-xs text-slate-800 space-y-1">
                <span class="text-slate-400 italic">Nhập công thức vào ô trên để xem hiển thị toán học chuẩn vector tại đây.</span>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2">
              <button 
                type="submit" 
                id="cms-save-manual-btn"
                class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>➕</span>
                <span>Thêm Câu Hỏi Này Vào Ngân Hàng</span>
              </button>
            </div>
          </form>
        </div>

        <!-- PANEL 3: DANH SÁCH CÂU HỎI ĐÃ SOẠN (CMS REPOSITORY) -->
        <div id="cms-panel-list" class="space-y-4 hidden">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-slate-700">Lọc theo môn:</span>
              <select id="cms-filter-sub" class="p-2 rounded-xl border border-slate-300 text-xs font-bold bg-white">
                <option value="all">Tất cả các môn</option>
                <option value="toan">Môn TOÁN</option>
                <option value="li">Môn VẬT LÍ</option>
                <option value="hoa">Môn HÓA HỌC</option>
                <option value="anh">Môn TIẾNG ANH</option>
                <option value="tin">Môn TIN HỌC</option>
              </select>
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <button 
                type="button" 
                onclick="window.exportCustomQuestionsJson()"
                class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-all cursor-pointer flex items-center gap-1"
                title="Tải toàn bộ ngân hàng câu hỏi về máy tính dưới dạng file JSON"
              >
                <span>📥</span>
                <span>Sao Lưu (Backup JSON)</span>
              </button>
              <label 
                class="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200 transition-all cursor-pointer flex items-center gap-1"
                title="Nạp ngân hàng câu hỏi từ file JSON có sẵn trên máy tính"
              >
                <span>📤</span>
                <span>Nạp Từ JSON</span>
                <input type="file" id="cms-import-json-file" accept=".json" class="hidden" onchange="window.importCustomQuestionsJson(event)" />
              </label>
              <button 
                type="button" 
                id="cms-refresh-list-btn"
                onclick="loadCustomQuestionsFromFirebase()"
                class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                <span>🔄</span>
                <span>Làm mới</span>
              </button>
            </div>
          </div>

          <div id="cms-custom-questions-table" class="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
            <div class="text-center py-10 text-slate-400 text-xs font-medium">
              Đang tải danh sách câu hỏi...
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Gắn sự kiện chuyển tab
  setupCmsTabEvents();

  // Gắn sự kiện parser & manual form
  setupCmsActionEvents();
}

// 2. Chuyển đổi qua lại giữa các Tab
function setupCmsTabEvents() {
  const tabImport = document.getElementById("cms-tab-import-btn");
  const tabManual = document.getElementById("cms-tab-manual-btn");
  const tabList = document.getElementById("cms-tab-list-btn");

  const pImport = document.getElementById("cms-panel-import");
  const pManual = document.getElementById("cms-panel-manual");
  const pList = document.getElementById("cms-panel-list");

  const resetTabs = () => {
    [tabImport, tabManual, tabList].forEach(t => {
      t.className = "px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5";
    });
    [pImport, pManual, pList].forEach(p => p.classList.add("hidden"));
  };

  tabImport.onclick = () => {
    resetTabs();
    tabImport.className = "px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xs transition-all cursor-pointer flex items-center gap-1.5";
    pImport.classList.remove("hidden");
  };

  tabManual.onclick = () => {
    resetTabs();
    tabManual.className = "px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xs transition-all cursor-pointer flex items-center gap-1.5";
    pManual.classList.remove("hidden");
  };

  tabList.onclick = () => {
    resetTabs();
    tabList.className = "px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xs transition-all cursor-pointer flex items-center gap-1.5";
    pList.classList.remove("hidden");
    loadCustomQuestionsFromFirebase();
  };
}

// Biến lưu trữ câu hỏi vừa parse
let parsedQuestionsCache = [];

// 3. Thuật toán Regex Phân tích văn bản đề thi tự động (Smart Exam Text Parser)
export function parseExamText(rawText) {
  if (!rawText || !rawText.trim()) return [];

  const text = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const questions = [];

  // Tách các khối câu hỏi theo định dạng "Câu X:" hoặc "Câu X." hoặc "[1]" hoặc "1."
  const questionBlocks = text.split(/(?=\n\s*(?:Câu\s*\d+[\.:\)]|\d+[\.:\)]|Bài\s*\d+[\.:\)]))/gi);

  questionBlocks.forEach((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    // Tìm dòng câu hỏi và nội dung
    const lines = trimmed.split("\n").map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return;

    let questionContent = "";
    let optA = "", optB = "", optC = "", optD = "";
    let answerLetter = "A";
    let explanation = "";
    let hint = "";

    // Gom nội dung
    const fullBlockText = lines.join(" \n ");

    // 1. Tìm phương án A, B, C, D
    const matchA = fullBlockText.match(/(?:^|\n|\s)[A|a][\.:\)]\s*(.*?)(?=(?:\n|\s)[B|b][\.:\)]|$)/s);
    const matchB = fullBlockText.match(/(?:^|\n|\s)[B|b][\.:\)]\s*(.*?)(?=(?:\n|\s)[C|c][\.:\)]|$)/s);
    const matchC = fullBlockText.match(/(?:^|\n|\s)[C|c][\.:\)]\s*(.*?)(?=(?:\n|\s)[D|d][\.:\)]|$)/s);
    const matchD = fullBlockText.match(/(?:^|\n|\s)[D|d][\.:\)]\s*(.*?)(?=(?:\n|\s)(?:Đáp án|ĐA|Key|Lời giải|Giải thích|Câu|\d+[\.:\)])|$)/is);

    if (matchA && matchB) {
      optA = matchA[1].replace(/\n/g, " ").trim();
      optB = matchB[1].replace(/\n/g, " ").trim();
      optC = matchC ? matchC[1].replace(/\n/g, " ").trim() : "Chưa cập nhật";
      optD = matchD ? matchD[1].replace(/\n/g, " ").trim() : "Chưa cập nhật";

      // Lấy nội dung câu hỏi (từ đầu đến trước phương án A)
      const optAIndex = fullBlockText.search(/(?:^|\n|\s)[A|a][\.:\)]/);
      if (optAIndex > 0) {
        questionContent = fullBlockText.substring(0, optAIndex)
          .replace(/^(?:Câu\s*\d+[\.:\)]|\d+[\.:\)]|Bài\s*\d+[\.:\)])\s*/i, "")
          .replace(/\n/g, " ")
          .trim();
      }
    } else {
      // Trường hợp không đủ A, B, C, D thì lấy dòng đầu làm câu hỏi
      questionContent = lines[0].replace(/^(?:Câu\s*\d+[\.:\)]|\d+[\.:\)]|Bài\s*\d+[\.:\)])\s*/i, "").trim();
    }

    // 2. Tìm đáp án đúng
    const matchAns = fullBlockText.match(/(?:Đáp án|ĐA|Key|Đúng)\s*[:=]?\s*([A-D])/i);
    if (matchAns) {
      answerLetter = matchAns[1].toUpperCase();
    }

    const answerMap = { A: 0, B: 1, C: 2, D: 3 };
    const correctIdx = answerMap[answerLetter] !== undefined ? answerMap[answerLetter] : 0;

    // 3. Tìm lời giải chi tiết
    const matchExp = fullBlockText.match(/(?:Lời giải|Giải thích|Hướng dẫn)\s*[:=]?\s*(.*?)(?=(?:Câu|\d+[\.:\)]|$))/is);
    if (matchExp) {
      explanation = matchExp[1].replace(/\n/g, " ").trim();
    }

    if (questionContent && optA && optB) {
      questions.push({
        id: `custom-q-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
        type: "multiple_choice",
        question: questionContent,
        options: [optA, optB, optC, optD],
        correctAnswer: correctIdx,
        difficulty: idx % 3 === 0 ? "kho" : idx % 2 === 0 ? "trung_binh" : "de",
        cognitiveLevel: idx % 4 === 3 ? "van_dung_cao" : idx % 4 === 2 ? "van_dung" : idx % 4 === 1 ? "thong_hieu" : "nhan_biet",
        explanation: explanation || "Xem lại kiến thức trọng tâm trong sách giáo khoa.",
        hint: hint || "Áp dụng định nghĩa và công thức cơ bản."
      });
    }
  });

  return questions;
}

// 4. Gắn các sự kiện tương tác CMS
function setupCmsActionEvents() {
  const sampleBtn = document.getElementById("cms-fill-sample-btn");
  const rawTextarea = document.getElementById("import-raw-textarea");
  const parseBtn = document.getElementById("cms-parse-btn");
  const saveImportedBtn = document.getElementById("cms-save-imported-btn");
  const statsLabel = document.getElementById("import-stats-label");
  const previewContainer = document.getElementById("import-preview-container");
  const previewList = document.getElementById("import-preview-list");

  // Nạp đề mẫu thử nghiệm
  if (sampleBtn) {
    sampleBtn.onclick = () => {
      rawTextarea.value = `Câu 1: Cho biểu thức $P = \\frac{\\sqrt{x}}{\\sqrt{x} - 2}$ với $x \\ge 0, x \\ne 4$. Khi $x = 9$ thì giá trị của $P$ là:
A. $3$
B. $1$
C. $-3$
D. $5$
Đáp án: A
Lời giải: Thay $x = 9$ vào biểu thức: $P = \\frac{\\sqrt{9}}{\\sqrt{9} - 2} = \\frac{3}{3 - 2} = 3$.

Câu 2: Số đo bốn góc của một tứ giác có thể là bộ số nào sau đây?
A. $60^\\circ, 80^\\circ, 100^\\circ, 120^\\circ$
B. $90^\\circ, 90^\\circ, 90^\\circ, 100^\\circ$
C. $70^\\circ, 80^\\circ, 90^\\circ, 110^\\circ$
D. $100^\\circ, 100^\\circ, 100^\\circ, 100^\\circ$
Đáp án: A
Lời giải: Tổng bốn góc của một tứ giác luôn bằng $360^\\circ$. Ta có $60^\\circ + 80^\\circ + 100^\\circ + 120^\\circ = 360^\\circ$.

Câu 3: Đồ thị hàm số $y = 2x - 4$ cắt trục hoành tại điểm có tọa độ là:
A. $(2; 0)$
B. $(0; -4)$
C. $(-2; 0)$
D. $(0; 2)$
Đáp án: A
Lời giải: Giao điểm với trục hoành có $y = 0 \\Rightarrow 2x - 4 = 0 \\Rightarrow x = 2$. Vậy tọa độ là $(2; 0)$.`;
      showToast("Đã nạp đề thi mẫu! Hãy nhấn 'Phân Tích Cú Pháp'.", "info");
    };
  }

  // Nút phân tích cú pháp
  if (parseBtn) {
    parseBtn.onclick = () => {
      const text = rawTextarea.value.trim();
      if (!text) {
        alert("Vui lòng dán nội dung đề thi vào ô văn bản trước khi phân tích!");
        return;
      }

      parsedQuestionsCache = parseExamText(text);

      if (parsedQuestionsCache.length === 0) {
        alert("Không nhận diện được câu hỏi nào! Thầy hãy kiểm tra định dạng (cần có Câu X:, các lựa chọn A, B, C, D).");
        return;
      }

      statsLabel.textContent = `✅ Đã phân tích thành công ${parsedQuestionsCache.length} câu hỏi hợp lệ!`;
      statsLabel.className = "text-xs text-emerald-700 font-extrabold";
      saveImportedBtn.disabled = false;

      // Render danh sách xem trước
      previewContainer.classList.remove("hidden");
      document.getElementById("import-recognized-count").textContent = `Tổng: ${parsedQuestionsCache.length} câu`;

      const letters = ["A", "B", "C", "D"];
      previewList.innerHTML = parsedQuestionsCache.map((q, i) => `
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-indigo-800">Câu ${i + 1}:</span>
            <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[10px]">
              Đáp án đúng: ${letters[q.correctAnswer]}
            </span>
          </div>
          <div class="font-bold text-slate-800 exam-math-content">${q.question}</div>
          <div class="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
            ${q.options.map((opt, oIdx) => `
              <div class="${oIdx === q.correctAnswer ? 'text-emerald-700 font-bold' : ''} exam-math-content">
                ${letters[oIdx]}. ${opt}
              </div>
            `).join("")}
          </div>
          ${q.explanation ? `
            <div class="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/60 exam-math-content">
              💡 Giải thích: ${q.explanation}
            </div>
          ` : ""}
        </div>
      `).join("");

      // Render KaTeX trên danh sách xem trước
      if (window.renderKatex) {
        window.renderKatex(previewList);
      }

      showToast(`Đã nhận diện thành công ${parsedQuestionsCache.length} câu hỏi!`, "success");
    };
  }

  // Nút lưu vào Firebase & Ngân hàng
  if (saveImportedBtn) {
    saveImportedBtn.onclick = async () => {
      if (parsedQuestionsCache.length === 0) return;

      const subKey = document.getElementById("import-subject-select").value;
      const gradeNum = parseInt(document.getElementById("import-grade-select").value, 10);
      const topicTitle = document.getElementById("import-topic-title").value.trim() || "Chuyên đề Thầy Hùng ĐT";

      saveImportedBtn.disabled = true;
      saveImportedBtn.textContent = "⏳ Đang lưu lên Firebase...";

      const targetLessonId = `${subKey}-custom-${Date.now()}`;

      // 1. Đăng ký câu hỏi vào bộ nhớ trình duyệt ngay lập tức
      window.__QUESTION_BANKS__ = window.__QUESTION_BANKS__ || window.__EXTRA_QUESTION_BANKS__ || {};
      window.__QUESTION_BANKS__[targetLessonId] = parsedQuestionsCache;

      // 2. Thêm chuyên đề mới vào danh sách bài học
      window.__EXTRA_LESSONS__ = window.__EXTRA_LESSONS__ || [];
      const newLesson = {
        id: targetLessonId,
        subject: subKey === "toan" ? "Môn TOÁN" : subKey === "li" ? "Môn LÍ" : subKey === "hoa" ? "Môn HÓA" : subKey === "anh" ? "Môn ANH" : "Môn TIN",
        grade: `Khối ${gradeNum}`,
        gradeNumber: gradeNum,
        title: `📖 ${topicTitle} (${parsedQuestionsCache.length} câu)`,
        description: `Ngân hàng câu hỏi biên soạn bởi Thầy Hùng ĐT. Cập nhật ngày ${new Date().toLocaleDateString("vi-VN")}.`,
        iconName: subKey === "toan" ? "BookOpen" : subKey === "li" ? "Zap" : "Scroll",
        color: subKey === "toan" ? "from-blue-600 to-indigo-700" : "from-emerald-600 to-teal-700",
        isSpecialExam: true
      };
      window.__EXTRA_LESSONS__.unshift(newLesson);

      // 3. Đồng bộ lên Firebase Realtime Database
      try {
        await fetch(`${FIREBASE_DB_URL}/custom_questions/${targetLessonId}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lesson: newLesson,
            questions: parsedQuestionsCache,
            createdAt: new Date().toISOString(),
            author: "Thầy Hùng ĐT"
          })
        });

        showToast(`🎉 Đã lưu ${parsedQuestionsCache.length} câu hỏi lên Firebase thành công!`, "success");
        saveImportedBtn.textContent = "✓ Đã Lưu Thành Công";
        setTimeout(() => {
          window.closeTeacherCmsModal();
          saveImportedBtn.disabled = false;
          saveImportedBtn.innerHTML = "<span>💾</span><span>Lưu Vào Ngân Hàng Đề</span>";
          rawTextarea.value = "";
          previewContainer.classList.add("hidden");
        }, 1200);
      } catch (err) {
        console.error("Lỗi lưu Firebase:", err);
        showToast("⚠️ Đã lưu offline! (Lỗi đồng bộ Firebase)", "info");
        saveImportedBtn.disabled = false;
        saveImportedBtn.innerHTML = "<span>💾</span><span>Lưu Lại</span>";
      }
    };
  }

  // Live KaTeX preview cho Form soạn thủ công
  const manualQuestion = document.getElementById("manual-question-text");
  const manualPreview = document.getElementById("manual-live-preview");
  if (manualQuestion && manualPreview) {
    manualQuestion.addEventListener("input", () => {
      const val = manualQuestion.value.trim();
      if (!val) {
        manualPreview.innerHTML = `<span class="text-slate-400 italic">Nhập công thức vào ô trên để xem hiển thị toán học chuẩn vector tại đây.</span>`;
        return;
      }
      manualPreview.innerHTML = `<div class="exam-math-content font-medium text-slate-800">${val}</div>`;
      if (window.renderKatex) {
        window.renderKatex(manualPreview);
      }
    });
  }

  // Xử lý gửi Form thủ công
  const manualForm = document.getElementById("cms-manual-form");
  if (manualForm) {
    manualForm.onsubmit = async (e) => {
      e.preventDefault();

      const subKey = document.getElementById("manual-subject").value;
      const gradeNum = parseInt(document.getElementById("manual-grade").value, 10);
      const cog = document.getElementById("manual-cognitive").value;
      const correctIdx = parseInt(document.getElementById("manual-correct").value, 10);

      const qText = document.getElementById("manual-question-text").value.trim();
      const optA = document.getElementById("manual-opt-a").value.trim();
      const optB = document.getElementById("manual-opt-b").value.trim();
      const optC = document.getElementById("manual-opt-c").value.trim();
      const optD = document.getElementById("manual-opt-d").value.trim();
      const exp = document.getElementById("manual-explanation").value.trim();
      const hint = document.getElementById("manual-hint").value.trim();

      const newQ = {
        id: `custom-manual-${Date.now()}`,
        type: "multiple_choice",
        question: qText,
        options: [optA, optB, optC, optD],
        correctAnswer: correctIdx,
        difficulty: cog === "van_dung_cao" ? "kho" : cog === "van_dung" ? "kho" : cog === "thong_hieu" ? "trung_binh" : "de",
        cognitiveLevel: cog,
        explanation: exp || "Xem lại bài giảng lý thuyết.",
        hint: hint || "Ghi nhớ công thức biến đổi cơ bản."
      };

      const targetLessonId = `${subKey}-manual-bank`;
      window.__QUESTION_BANKS__ = window.__QUESTION_BANKS__ || window.__EXTRA_QUESTION_BANKS__ || {};
      window.__QUESTION_BANKS__[targetLessonId] = window.__QUESTION_BANKS__[targetLessonId] || [];
      window.__QUESTION_BANKS__[targetLessonId].push(newQ);

      // Lưu câu lẻ lên Firebase
      try {
        await fetch(`${FIREBASE_DB_URL}/custom_single_questions/${newQ.id}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newQ,
            subjectKey: subKey,
            gradeNumber: gradeNum,
            createdAt: new Date().toISOString()
          })
        });
        showToast("✅ Đã thêm câu hỏi mới thành công!", "success");
        manualForm.reset();
        manualPreview.innerHTML = `<span class="text-emerald-600 font-bold">✓ Đã thêm câu hỏi thành công! Bạn có thể tiếp tục soạn câu tiếp theo.</span>`;
      } catch (err) {
        showToast("Đã thêm câu hỏi vào bộ nhớ tạm!", "info");
      }
    };
  }
}

// 5. Tải danh sách câu hỏi đã lưu từ Firebase
async function loadCustomQuestionsFromFirebase() {
  const table = document.getElementById("cms-custom-questions-table");
  const countLabel = document.getElementById("cms-synced-count");
  if (!table) return;

  table.innerHTML = `<div class="text-center py-6 text-slate-400 text-xs font-semibold animate-pulse">⏳ Đang tải dữ liệu từ máy chủ Firebase...</div>`;

  try {
    const res = await fetch(`${FIREBASE_DB_URL}/custom_questions.json`);
    const data = await res.json();

    if (!data || Object.keys(data).length === 0) {
      table.innerHTML = `
        <div class="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <p class="text-xs text-slate-500 font-bold">Chưa có bộ đề tự biên soạn nào trên Firebase.</p>
          <p class="text-[11px] text-slate-400 mt-1">Thầy hãy dùng tab "Nhập Đề Nhanh" để tạo bộ đề đầu tiên!</p>
        </div>
      `;
      if (countLabel) countLabel.textContent = "☁️ 0 bộ đề tùy chỉnh";
      return;
    }

    const keys = Object.keys(data);
    if (countLabel) countLabel.textContent = `☁️ Đã lưu ${keys.length} bộ đề trên Firebase`;

    const letters = ["A", "B", "C", "D"];
    table.innerHTML = keys.map(k => {
      const item = data[k];
      const qCount = item.questions?.length || 0;
      return `
        <div class="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-400 shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-[10px] uppercase">
                ${item.lesson?.subject || "Đa môn"}
              </span>
              <span class="text-xs text-slate-400 font-semibold">${item.lesson?.grade || "THCS"}</span>
              <span class="text-xs text-slate-500">• ${new Date(item.createdAt || Date.now()).toLocaleDateString("vi-VN")}</span>
            </div>
            <h4 class="font-extrabold text-sm text-slate-900 mt-1">
              ${item.lesson?.title || k}
            </h4>
            <p class="text-xs text-slate-500 mt-0.5">Quy mô: <strong class="text-indigo-600">${qCount} câu hỏi</strong> trắc nghiệm phân hóa chuẩn Bộ.</p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <button 
              type="button" 
              onclick="window.startExamFromCustom('${k}')"
              class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1"
            >
              <span>🚀 Làm bài</span>
            </button>
            <button 
              type="button" 
              onclick="window.deleteCustomExam('${k}')"
              class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 text-xs font-bold transition-all cursor-pointer"
              title="Xóa bộ đề này khỏi Firebase"
            >
              🗑️
            </button>
          </div>
        </div>
      `;
    }).join("");

  } catch (err) {
    table.innerHTML = `
      <div class="text-center py-6 text-rose-600 text-xs font-bold">
        ❌ Không thể tải dữ liệu từ Firebase. Vui lòng kiểm tra kết nối mạng!
      </div>
    `;
  }
}

// 6. Xóa bộ đề trên Firebase
window.deleteCustomExam = async function (examKey) {
  if (!confirm(`Bạn có chắc chắn muốn xóa bộ đề này khỏi hệ thống Firebase không?`)) return;
  try {
    await fetch(`${FIREBASE_DB_URL}/custom_questions/${encodeURIComponent(examKey)}.json`, {
      method: "DELETE"
    });
    showToast("Đã xóa bộ đề thành công!", "success");
    loadCustomQuestionsFromFirebase();
  } catch (e) {
    showToast("Lỗi khi xóa bài thi!", "error");
  }
};

// 7. Làm bài trực tuyến từ bộ đề tự biên soạn
window.startExamFromCustom = async function (examKey) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/custom_questions/${encodeURIComponent(examKey)}.json`);
    const data = await res.json();
    if (!data || !data.questions) {
      alert("Không tìm thấy dữ liệu câu hỏi của bộ đề này!");
      return;
    }

    window.closeTeacherCmsModal();

    // Khởi chạy bài thi bằng Exam Matrix Module runner
    const examData = {
      examCode: String(Math.floor(100 + Math.random() * 900)),
      title: data.lesson?.title || "BÀI THI BIÊN SOẠN THẦY HÙNG ĐT",
      subjectName: data.lesson?.subject || "Môn học",
      gradeName: data.lesson?.grade || "THCS",
      totalQuestions: data.questions.length,
      timeMinutes: Math.max(15, Math.round(data.questions.length * 1.5)),
      questions: data.questions.map((q, idx) => ({ ...q, order: idx + 1 })),
      authorName: "Thầy Hùng ĐT"
    };

    if (window.startInteractiveOnlineExam) {
      window.startInteractiveOnlineExam(examData, examKey);
    } else {
      window.openPrintPreviewModal(examData);
    }
  } catch (e) {
    alert("Lỗi khi tải bài thi!");
  }
};

// 8. Xuất & Nhập Ngân Hàng Câu Hỏi JSON (Backup & Restore)
window.exportCustomQuestionsJson = async function () {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/custom_questions.json`);
    const data = await res.json();
    if (!data) {
      alert("Chưa có bộ đề nào để xuất sao lưu!");
      return;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ngan_hang_de_giao_hung_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Đã tải xuống file sao lưu JSON thành công!", "success");
  } catch (e) {
    showToast("Lỗi khi tải file sao lưu!", "error");
  }
};

window.importCustomQuestionsJson = function (event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const json = JSON.parse(e.target.result);
      if (typeof json !== "object") throw new Error("File không đúng cấu trúc JSON");

      // Cập nhật lên Firebase
      await fetch(`${FIREBASE_DB_URL}/custom_questions.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json)
      });

      showToast("Đã phục hồi dữ liệu từ file JSON lên Firebase thành công!", "success");
      loadCustomQuestionsFromFirebase();
    } catch (err) {
      alert("Lỗi khi đọc file JSON: " + err.message);
    }
  };
  reader.readAsText(file);
};

// 9. Đóng / Mở Modal CMS
window.openTeacherCmsModal = function () {
  createTeacherCmsModal();
  const modal = document.getElementById("teacher-cms-modal");
  const card = document.getElementById("teacher-cms-card");
  if (modal) {
    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      if (card) card.classList.remove("scale-95");
    });
  }
};

window.closeTeacherCmsModal = function () {
  const modal = document.getElementById("teacher-cms-modal");
  const card = document.getElementById("teacher-cms-card");
  if (modal) {
    modal.classList.add("opacity-0");
    if (card) card.classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 200);
  }
};
