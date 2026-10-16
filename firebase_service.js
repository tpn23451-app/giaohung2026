/**
 * Dịch vụ kết nối và thao tác với Firebase Realtime Database
 * Dành cho ứng dụng: TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Bản quyền: Thầy Hùng ĐT (Môn: TOÁN, LÍ, HÓA, ANH)
 */

export const firebaseConfig = {
  apiKey: "AIzaSyANxl22-n0hHJUpvXyoPGSLuYledc5Gk5I",
  authDomain: "cosodulieuhungtbs.firebaseapp.com",
  databaseURL: "https://cosodulieuhungtbs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cosodulieuhungtbs",
  storageBucket: "cosodulieuhungtbs.firebasestorage.app",
  messagingSenderId: "506398296552",
  appId: "1:506398296552:web:78fbc7549ea0db9edefc5d",
  measurementId: "G-CWHT2M4YM7"
};

const BASE_URL = firebaseConfig.databaseURL;

/**
 * 1. Đăng nhập học sinh bằng Mã HS và Mật khẩu
 * @param {string} maHS Mã số học sinh (ví dụ: HS001)
 * @param {string} matKhau Mật khẩu
 * @returns {Promise<{ success: boolean, student?: object, message?: string }>}
 */
export async function loginStudent(maHS, matKhau) {
  try {
    const cleanId = (maHS || '').trim();
    if (!cleanId) return { success: false, message: 'Vui lòng nhập Mã học sinh' };

    const res = await fetch(`${BASE_URL}/students/${cleanId}.json`);
    if (!res.ok) throw new Error('Không thể kết nối đến máy chủ');

    const student = await res.json();
    if (!student) {
      return { success: false, message: 'Mã học sinh không tồn tại trong hệ thống' };
    }

    if (student.matKhau !== matKhau) {
      return { success: false, message: 'Mật khẩu không chính xác' };
    }

    if (student.trangThai && student.trangThai !== 'Hoạt động') {
      return { success: false, message: 'Tài khoản đang bị tạm khóa' };
    }

    return {
      success: true,
      student: {
        maHS: student.maHS,
        hoVaTen: student.hoVaTen,
        lop: student.lop,
        role: student.role || 'student'
      }
    };
  } catch (err) {
    console.error('Lỗi đăng nhập:', err);
    return { success: false, message: err.message || 'Lỗi kết nối cơ sở dữ liệu' };
  }
}

/**
 * 2. Lưu kết quả làm bài thi của học sinh lên Firebase
 * @param {string} maHS Mã học sinh
 * @param {object} examData Dữ liệu kết quả bài thi
 */
export async function saveExamResult(maHS, examData) {
  try {
    const payload = {
      maHS,
      ...examData,
      submittedAt: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Tạo bản ghi mới trong nhánh exam_results
    const res = await fetch(`${BASE_URL}/exam_results.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Không thể lưu kết quả thi lên máy chủ');
    const data = await res.json();
    return { success: true, resultId: data.name };
  } catch (err) {
    console.error('Lỗi lưu kết quả:', err);
    return { success: false, message: err.message };
  }
}

/**
 * 3. Lấy toàn bộ 120 bài học từ Firebase
 */
export async function getLessonsFromFirebase() {
  try {
    const res = await fetch(`${BASE_URL}/lessons.json`);
    if (!res.ok) throw new Error('Lỗi tải bài học');
    const data = await res.json();
    return Object.values(data || {});
  } catch (err) {
    console.error('Lỗi tải bài học:', err);
    return [];
  }
}

/**
 * 4. Lấy câu hỏi của một bài học từ Firebase
 * @param {string} lessonId Mã bài học (ví dụ: 'tin6-bai-1')
 */
export async function getQuestionsFromFirebase(lessonId) {
  try {
    const res = await fetch(`${BASE_URL}/questions/${lessonId}.json`);
    if (!res.ok) throw new Error('Lỗi tải câu hỏi');
    return await res.json() || [];
  } catch (err) {
    console.error('Lỗi tải câu hỏi:', err);
    return [];
  }
}
