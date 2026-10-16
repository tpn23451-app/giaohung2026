/**
 * Script đồng bộ danh sách học sinh từ Google Sheet sang Firebase Realtime Database
 * Nguồn Google Sheet: https://docs.google.com/spreadsheets/d/1jq4F9fh_gnZ6wE0ID4z_4R7J-do-H1SMkBBOeHUNyLE
 * Đích Firebase: https://cosodulieuhungtbs-default-rtdb.asia-southeast1.firebasedatabase.app/students
 */

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

async function syncStudents() {
  console.log('🔄 Đang đồng bộ danh sách học sinh từ Google Sheet sang Firebase...');
  
  const res = await httpsRequest(GOOGLE_SHEET_URL, { method: 'GET' });
  if (res.statusCode !== 200) {
    throw new Error(`Không thể kết nối Google Sheet: HTTP ${res.statusCode}`);
  }

  const lines = res.body.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  console.log(`📊 Tìm thấy ${lines.length} dòng dữ liệu.`);

  if (lines.length <= 1) {
    console.log('⚠️ Google Sheet hiện chưa có dòng học sinh nào (chỉ có tiêu đề cột).');
    console.log('👉 Vui lòng thêm các dòng học sinh vào Sheet rồi chạy lại lệnh này!');
    return;
  }

  const headers = parseCSVLine(lines[0]);
  console.log('Cột nhận diện:', headers);

  const students = {};
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
      syncedAt: new Date().toISOString()
    };
  }

  const total = Object.keys(students).length;
  console.log(`Đã phân tích được ${total} học sinh.`);

  // Cập nhật lên Firebase (dùng PATCH để không xóa tài khoản admin/mẫu nếu có)
  const url = `${FIREBASE_DB_URL}/students.json`;
  const body = JSON.stringify(students);
  const fbRes = await httpsRequest(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);

  if (fbRes.statusCode >= 200 && fbRes.statusCode < 300) {
    console.log(`✅ Đồng bộ thành công ${total} học sinh lên Firebase!`);
  } else {
    throw new Error(`Lỗi cập nhật Firebase: HTTP ${fbRes.statusCode}`);
  }
}

syncStudents().catch(err => {
  console.error('❌ Lỗi:', err);
});
