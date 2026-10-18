/**
 * Module Âm Thanh Hiệu Ứng, Pháo Hoa Vinh Danh & Giấy Khen Danh Dự A4 (Giai đoạn cuối)
 * TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Thầy Hùng ĐT
 * 
 * Tính năng chính:
 * 1. Web Audio API Synthesizer (Chime, Fanfare, Click - không phụ thuộc file mp3 bên ngoài)
 * 2. Canvas Confetti (Hiệu ứng pháo hoa vinh danh rực rỡ khi đạt điểm cao)
 * 3. Giấy Khen Danh Dự Chuẩn In Ấn A4 Khổ Ngang (Certificate of Achievement)
 * 4. Cơ chế đồng bộ Offline Resilience (Lưu tạm LocalStorage khi mất mạng, tự đẩy lên Firebase khi có mạng)
 */

// ==========================================
// 1. WEB AUDIO API SYNTHESIZER
// ==========================================

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem("giao_hung_sound_muted") === "true";
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("giao_hung_sound_muted", String(this.isMuted));
    return this.isMuted;
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playCorrect() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.35);
      });
    } catch (e) {}
  }

  playWrong() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [311.13, 293.66]; // Eb4, D4
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.09, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.28);
      });
    } catch (e) {}
  }

  playFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Khúc nhạc khải hoàn chiến thắng
      const melody = [
        { f: 523.25, d: 0.15 }, // C5
        { f: 659.25, d: 0.15 }, // E5
        { f: 783.99, d: 0.18 }, // G5
        { f: 1046.50, d: 0.45 }, // C6
        { f: 880.00, d: 0.18 }, // A5
        { f: 1046.50, d: 0.65 } // C6
      ];
      let offset = 0;
      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(item.f, now + offset);
        gain.gain.setValueAtTime(0.18, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + item.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + item.d + 0.05);
        offset += item.d * 0.85;
      });
    } catch (e) {}
  }
}

export const soundManager = new SoundManager();

// ==========================================
// 2. CANVAS CONFETTI CELEBRATION
// ==========================================

export function triggerConfetti(durationMs = 3500) {
  let canvas = document.getElementById("giao-hung-confetti-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "giao-hung-confetti-canvas";
    canvas.className = "fixed inset-0 pointer-events-none z-50 w-full h-full";
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#fbbf24"];
  const pieces = [];
  const pieceCount = 140;

  for (let i = 0; i < pieceCount; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 3,
      speedX: Math.random() * 4 - 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 8 - 4
    });
  }

  let animationFrameId;
  const startTime = Date.now();

  function render() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      ctx.restore();

      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });

    if (elapsed < durationMs) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  render();
}

// ==========================================
// 3. GIẤY KHEN DANH DỰ CHUẨN IN ẤN A4 KHỔ NGANG
// ==========================================

export function openCertificateModal(studentInfo, examData, score) {
  const existing = document.getElementById("certificate-modal");
  if (existing) existing.remove();

  const studentName = studentInfo?.hoVaTen || studentInfo?.fullName || "Học Sinh Xuất Sắc";
  const studentId = studentInfo?.maHS || "HS-2026";
  const studentClass = studentInfo?.lop || studentInfo?.className || "Lớp 9";
  const examTitle = examData?.title || "Bài Kiểm Tra Chất Lượng";
  const currentDate = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const modal = document.createElement("div");
  modal.id = "certificate-modal";
  modal.className = "fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto";

  modal.innerHTML = `
    <div class="relative w-full max-w-5xl my-4 flex flex-col items-center">
      
      <!-- Top Action Bar (ẩn khi in) -->
      <div class="w-full flex items-center justify-between pb-3 text-white no-print">
        <div class="flex items-center gap-2">
          <span class="text-xl">📜</span>
          <span class="font-black text-sm sm:text-base">GIẤY KHEN DANH DỰ • THẦY HÙNG ĐT</span>
        </div>
        <div class="flex items-center gap-2">
          <button 
            type="button" 
            onclick="window.print()" 
            class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>🖨️</span>
            <span>In Giấy Khen / Lưu PDF (A4 Ngang)</span>
          </button>
          <button 
            type="button" 
            onclick="document.getElementById('certificate-modal').remove()" 
            class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-base font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- BẢN IN GIẤY KHEN A4 LANDSCAPE -->
      <div class="certificate-paper w-full bg-[#fdfbf7] text-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl border-[12px] border-double border-amber-600 relative overflow-hidden flex flex-col justify-between" style="min-height: 580px; aspect-ratio: 1.414 / 1;">
        
        <!-- Họa tiết góc cổ điển & hoa văn nền -->
        <div class="absolute inset-2 border-2 border-amber-400/80 pointer-events-none rounded-xl"></div>
        <div class="absolute top-4 left-4 text-3xl text-amber-500/40 select-none">⚜️</div>
        <div class="absolute top-4 right-4 text-3xl text-amber-500/40 select-none">⚜️</div>
        <div class="absolute bottom-4 left-4 text-3xl text-amber-500/40 select-none">⚜️</div>
        <div class="absolute bottom-4 right-4 text-3xl text-amber-500/40 select-none">⚜️</div>

        <!-- Watermark chìm -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none text-9xl font-black">
          GIÁO HÙNG
        </div>

        <!-- Header Quốc Hiệu / Đơn Vị -->
        <div class="text-center relative z-10">
          <div class="text-[11px] sm:text-xs font-black tracking-widest uppercase text-amber-800">
            HỆ THỐNG GIÁO DỤC CHẤT LƯỢNG CAO • BỒI DƯỠNG VĂN HÓA & LTĐH
          </div>
          <h2 class="text-base sm:text-xl font-black uppercase text-indigo-950 font-['Lexend'] tracking-wider mt-0.5">
            TRUNG TÂM BDVH & LTĐH GIÁO HÙNG
          </h2>
          <div class="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-2"></div>
        </div>

        <!-- Tiêu Đề Giấy Khen -->
        <div class="text-center my-3 relative z-10">
          <h1 class="text-3xl sm:text-5xl font-black text-amber-800 font-['Lexend'] tracking-wider uppercase drop-shadow-xs">
            GIẤY KHEN DANH DỰ
          </h1>
          <p class="text-xs sm:text-sm font-bold text-slate-600 italic mt-1">
            Trao tặng thành tích học tập xuất sắc trong kỳ kiểm tra chất lượng
          </p>
        </div>

        <!-- Thân Giấy Khen: Tên Học Sinh -->
        <div class="text-center my-2 relative z-10 space-y-2">
          <p class="text-xs sm:text-sm uppercase tracking-widest text-slate-500 font-bold">Chứng nhận em:</p>
          <div class="text-2xl sm:text-4xl font-black text-indigo-950 font-['Lexend'] tracking-normal underline decoration-amber-500 decoration-4 underline-offset-8">
            ${studentName}
          </div>
          <p class="text-xs sm:text-sm font-bold text-slate-700 mt-2">
            Mã học sinh: <span class="font-mono text-indigo-800">${studentId}</span> • Chi đội / Lớp: <span class="text-indigo-800">${studentClass}</span>
          </p>
          <p class="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed pt-2">
            Đã hoàn thành xuất sắc bài kiểm tra: <strong class="text-slate-900">${examTitle}</strong><br/>
            Đạt kết quả xuất sắc với số điểm: <strong class="text-rose-600 text-lg font-mono">${score} / 10</strong> điểm.
          </p>
        </div>

        <!-- Chữ Ký & Con Dấu -->
        <div class="grid grid-cols-2 pt-6 relative z-10 text-center">
          <!-- Cột Trái: Trưởng Ban Giám Sát -->
          <div class="flex flex-col items-center justify-end">
            <div class="w-20 h-20 rounded-full border-4 border-amber-500/80 bg-amber-50 flex items-center justify-center text-3xl shadow-inner text-amber-600">
              🏅
            </div>
            <span class="text-[11px] font-bold text-amber-900 mt-1 uppercase tracking-wider">Huy Hiệu Vinh Danh</span>
          </div>

          <!-- Cột Phải: Thầy Hùng ĐT Ký & Đóng Dấu -->
          <div class="flex flex-col items-center text-right">
            <p class="text-xs text-slate-500 italic">Ngày ${currentDate}</p>
            <p class="text-xs font-black uppercase text-slate-800 tracking-wider mt-0.5">GIÁM ĐỐC TRUNG TÂM</p>
            
            <!-- Con Dấu Đỏ & Chữ Ký Nghệ Thuật -->
            <div class="relative my-1 flex items-center justify-center h-20 w-44">
              <!-- Vết mực con dấu tròn -->
              <div class="absolute inset-0 border-3 border-rose-600 rounded-full opacity-80 flex flex-col items-center justify-center text-[9px] font-black text-rose-600 leading-tight transform -rotate-12 pointer-events-none">
                <span>★ GIÁO HÙNG ★</span>
                <span class="text-[8px] font-bold">ĐÀO TẠO & LTĐH</span>
                <span>CHẤT LƯỢNG CAO</span>
              </div>
              <!-- Chữ ký số Thầy Hùng -->
              <span class="font-serif italic font-black text-2xl text-blue-900 transform -rotate-6 select-none relative z-10">
                Thầy Hùng ĐT
              </span>
            </div>

            <p class="text-xs font-black text-indigo-950 font-['Lexend']">Thầy Hùng ĐT</p>
            <p class="text-[10px] text-slate-500 font-semibold">Tác giả & Chủ nhiệm bộ môn</p>
          </div>
        </div>

      </div>

    </div>
  `;

  document.body.appendChild(modal);
}

// ==========================================
// 4. OFFLINE RESILIENCE & TỰ ĐỘNG ĐỒNG BỘ
// ==========================================

export function initOfflineResilience() {
  const checkStatus = () => {
    const isOnline = navigator.onLine;
    let pill = document.getElementById("network-status-indicator");
    if (!pill) {
      pill = document.createElement("div");
      pill.id = "network-status-indicator";
      pill.className = "fixed bottom-3 right-3 z-40 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 pointer-events-none";
      document.body.appendChild(pill);
    }

    if (isOnline) {
      pill.className = "fixed bottom-3 right-3 z-40 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm bg-emerald-500/90 text-white backdrop-blur-md opacity-80 transition-all duration-300 flex items-center gap-1.5 pointer-events-none";
      pill.innerHTML = `<span>🟢</span><span>Đã kết nối Cloud</span>`;
      setTimeout(() => {
        if (pill) pill.classList.add("opacity-0");
      }, 3000);
      syncOfflineQueue();
    } else {
      pill.className = "fixed bottom-3 right-3 z-40 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg bg-amber-500 text-slate-950 backdrop-blur-md opacity-100 transition-all duration-300 flex items-center gap-1.5 pointer-events-none animate-pulse";
      pill.innerHTML = `<span>🟠</span><span>Chế độ Ngoại Tuyến (Offline)</span>`;
    }
  };

  window.addEventListener("online", checkStatus);
  window.addEventListener("offline", checkStatus);
  checkStatus();
}

async function syncOfflineQueue() {
  try {
    const raw = localStorage.getItem("giao_hung_offline_exam_queue");
    if (!raw) return;
    const queue = JSON.parse(raw);
    if (!Array.isArray(queue) || queue.length === 0) return;

    console.log(`☁️ Đang đồng bộ ${queue.length} bài thi ngoại tuyến lên Firebase...`);
    const FIREBASE_DB_URL = "https://cosodulieuhungtbs-default-rtdb.asia-southeast1.firebasedatabase.app";

    for (const item of queue) {
      await fetch(`${FIREBASE_DB_URL}/exam_results.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
    }

    localStorage.removeItem("giao_hung_offline_exam_queue");
    console.log("✅ Đã hoàn tất đồng bộ bài thi ngoại tuyến!");
  } catch (e) {
    console.warn("Lỗi khi đồng bộ ngoại tuyến:", e);
  }
}

// Khởi tạo các hàm global vào window
if (typeof window !== "undefined") {
  window.soundManager = soundManager;
  window.triggerConfetti = triggerConfetti;
  window.openCertificateModal = openCertificateModal;
  window.initOfflineResilience = initOfflineResilience;
  
  // Khởi chạy kiểm tra mạng khi nạp trang
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOfflineResilience);
  } else {
    initOfflineResilience();
  }
}
