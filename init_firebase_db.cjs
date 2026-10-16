const fs = require('fs');
const https = require('https');

const FIREBASE_DB_URL = 'https://cosodulieuhungtbs-default-rtdb.asia-southeast1.firebasedatabase.app';
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1jq4F9fh_gnZ6wE0ID4z_4R7J-do-H1SMkBBOeHUNyLE/gviz/tq?tqx=out:csv&gid=0';

function httpsRequest(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// 1. Fetch & parse Google Sheet
async function fetchGoogleSheetStudents() {
  console.log('📡 Đang tải danh sách học sinh từ Google Sheet...');
  const res = await httpsRequest(GOOGLE_SHEET_URL, { method: 'GET' });
  if (res.statusCode !== 200) {
    throw new Error(`Lỗi tải Google Sheet: HTTP ${res.statusCode}`);
  }

  const lines = res.body.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  console.log(`📄 Tìm thấy ${lines.length} dòng trong Google Sheet.`);

  // Parse CSV
  function parseCSVLine(line) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  }

  const students = {};
  if (lines.length > 1) {
    const headers = parseCSVLine(lines[0]);
    console.log('Tiêu đề cột:', headers);

    for (let i = 1; i < lines.length; i++) {
      const row = parseCSVLine(lines[i]);
      const maHS = (row[0] || '').trim();
      if (!maHS) continue;

      students[maHS] = {
        maHS: maHS,
        matKhau: (row[1] || '123456').trim(),
        hoVaTen: (row[2] || '').trim(),
        lop: (row[3] || '').trim(),
        trangThai: (row[4] || 'Hoạt động').trim(),
        trangThaiDoiMK: (row[5] || 'Chưa đổi').trim(),
        updatedAt: new Date().toISOString()
      };
    }
  }

  // Thêm 1 tài khoản mẫu để kiểm thử nếu sheet chưa có học sinh
  if (Object.keys(students).length === 0) {
    console.log('ℹ️ Sheet hiện chưa có dòng học sinh nào, tạo tài khoản mẫu HS001 & GIAOVIEN để kiểm thử.');
    students['HS001'] = {
      maHS: 'HS001',
      matKhau: '123456',
      hoVaTen: 'Nguyễn Văn An (Tài khoản mẫu)',
      lop: '6A1',
      trangThai: 'Hoạt động',
      trangThaiDoiMK: 'Chưa đổi',
      updatedAt: new Date().toISOString()
    };
    students['GIAOVIEN'] = {
      maHS: 'GIAOVIEN',
      matKhau: 'admin123',
      hoVaTen: 'Thầy Hùng ĐT',
      lop: 'Giáo viên',
      trangThai: 'Hoạt động',
      trangThaiDoiMK: 'Đã đổi',
      role: 'teacher',
      updatedAt: new Date().toISOString()
    };
  }

  console.log(`✅ Đã chuẩn bị ${Object.keys(students).length} tài khoản trong nhánh students.`);
  return students;
}

async function uploadToFirebase(path, data) {
  const url = `${FIREBASE_DB_URL}/${path}.json`;
  const body = JSON.stringify(data);
  const res = await httpsRequest(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);

  if (res.statusCode >= 200 && res.statusCode < 300) {
    console.log(`✅ [${path}] Tải lên Firebase thành công (HTTP ${res.statusCode})!`);
  } else {
    throw new Error(`❌ Lỗi tải lên ${path}: HTTP ${res.statusCode} - ${res.body}`);
  }
}

async function main() {
  console.log('🚀 BẮT ĐẦU KHỞI TẠO CƠ SỞ DỮ LIỆU FIREBASE...');

  // 1. App Info / Metadata
  console.log('\n--- 1. Nạp App Info / Cấu hình hệ thống ---');
  const appInfo = {
    appName: 'TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - Thầy Hùng ĐT',
    author: 'Thầy Hùng ĐT',
    databaseVersion: '1.0.0',
    googleSheetId: '1jq4F9fh_gnZ6wE0ID4z_4R7J-do-H1SMkBBOeHUNyLE',
    totalLessons: 120,
    totalQuestions: 534,
    lastSync: new Date().toISOString(),
    description: 'Hệ thống bồi dưỡng văn hóa và luyện thi đại học các môn TOÁN, LÍ, HÓA, ANH - Thầy Hùng ĐT'
  };
  await uploadToFirebase('app_info', appInfo);

  // 2. Students
  console.log('\n--- 2. Nạp Danh sách Học sinh ---');
  const students = await fetchGoogleSheetStudents();
  await uploadToFirebase('students', students);

  // 3. Lessons (120 bài)
  console.log('\n--- 3. Nạp Danh mục 120 Bài học ---');
  const lessons = JSON.parse(fs.readFileSync('extracted_lessons.json', 'utf8'));
  const lessonsMap = {};
  for (const item of lessons) {
    lessonsMap[item.id] = item;
  }
  await uploadToFirebase('lessons', lessonsMap);

  // 4. Questions (534 câu)
  console.log('\n--- 4. Nạp Ngân hàng 534 Câu hỏi ---');
  const questions = JSON.parse(fs.readFileSync('extracted_questions.json', 'utf8'));
  await uploadToFirebase('questions', questions);

  // 5. Exam Results Schema
  console.log('\n--- 5. Khởi tạo nhánh Lưu kết quả thi (exam_results) ---');
  await uploadToFirebase('exam_results/init_note', {
    message: 'Nhánh lưu trữ kết quả và điểm số thi trắc nghiệm của học sinh',
    createdAt: new Date().toISOString()
  });

  console.log('\n🎉 ====================================================');
  console.log('🎉 TOÀN BỘ CƠ SỞ DỮ LIỆU ĐÃ ĐƯỢC TẠO VÀ TẢI THÀNH CÔNG LÊN FIREBASE!');
  console.log('🎉 ====================================================');
}

main().catch(err => {
  console.error('LỖI KHỞI TẠO:', err);
  process.exit(1);
});
