/**
 * Module Tự Động Render Công Thức Toán, Lí, Hóa bằng KaTeX
 * Dành cho TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Thầy Hùng ĐT
 */

import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';
import 'katex/dist/katex.min.css';

const katexOptions = {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
    { left: '\\(', right: '\\)', display: false },
    { left: '\\[', right: '\\]', display: true }
  ],
  throwOnError: false,
  errorColor: '#cc0000',
  strict: false,
  trust: true
};

export function renderKatex(targetElement) {
  const el = targetElement || document.body;
  if (!el) return;
  try {
    renderMathInElement(el, katexOptions);
  } catch (err) {
    console.warn("KaTeX render notice:", err);
  }
}

// Gắn vào window
if (typeof window !== "undefined") {
  window.katex = katex;
  window.renderKatex = renderKatex;

  let debounceTimer = null;
  const scheduleRender = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      // Chỉ render trong các phần tử câu hỏi, đề thi, giải thích
      const containers = document.querySelectorAll(
        '.question-card, [data-question-id], .exam-sheet, main, #custom-exam-modal, #multi-subject-nav-hub'
      );
      if (containers.length > 0) {
        containers.forEach(c => renderKatex(c));
      } else {
        renderKatex(document.getElementById('root') || document.body);
      }
    }, 60);
  };

  // Quan sát thay đổi DOM để tự động render công thức mới
  const observer = new MutationObserver((mutations) => {
    let shouldRender = false;
    for (const m of mutations) {
      if (m.addedNodes.length > 0) {
        shouldRender = true;
        break;
      }
    }
    if (shouldRender) scheduleRender();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      observer.observe(document.body, { childList: true, subtree: true });
      scheduleRender();
    });
  } else {
    observer.observe(document.body, { childList: true, subtree: true });
    scheduleRender();
  }
}
