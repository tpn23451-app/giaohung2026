# HỆ THỐNG QUẢN LÝ DẠY HỌC & LUYỆN THI TRỰC TUYẾN
## TRUNG TÂM BDVH & LTĐH GIÁO HÙNG - THẦY HÙNG ĐT

---

### 🌟 TỔNG QUAN HỆ THỐNG
Nền tảng học tập và thi trắc nghiệm trực tuyến thế hệ mới dành riêng cho **Trung tâm Bồi dưỡng Văn hóa & Luyện thi Đại học Giáo Hùng (Tác giả: Thầy Hùng ĐT)**, bao trùm đầy đủ 5 môn học trọng tâm:
1. 📐 **Môn TOÁN:** Chương trình GDPT 2018 (SGK Kết nối tri thức, Cánh diều, Chân trời sáng tạo) & Luyện thi vào 10, Đại học.
2. ⚡ **Môn VẬT LÍ / KHTN:** Điện học, Quang hình học, Cơ học, Nhiệt học, Năng lượng.
3. 🧪 **Môn HÓA HỌC:** Oxit, Axit, Bazơ, Muối, Dãy hoạt động hóa học kim loại & Hóa học hữu cơ.
4. 🇬🇧 **Môn TIẾNG ANH:** Ngữ pháp chuyên sâu, các thì động từ, câu bị động, câu gián tiếp, mệnh đề quan hệ & từ vựng bám sát đề thi tuyển sinh.
5. 💻 **Môn TIN HỌC:** Thuật toán, lập trình cơ bản và ứng dụng công nghệ thông tin.

---

### 🎯 TÍNH NĂNG NỔI BẬT ĐÃ HOÀN TẤT QUA CÁC GIAI ĐOẠN

#### 1. Hệ thống Đa Môn & Hiển Thị Công Thức KaTeX Vector
* Hiển thị siêu sắc nét mọi công thức Toán học, Vật lí, Hóa học bằng **KaTeX**:
  * Phương trình bậc hai: $ax^2 + bx + c = 0$
  * Hệ thức Vi-ét: $x_1 + x_2 = -\frac{b}{a}; \quad x_1 x_2 = \frac{c}{a}$
  * Định luật Ôm: $I = \frac{U}{R}$
  * Công suất điện: $P = U \cdot I = I^2 R$
  * Phản ứng hóa học: $\text{Fe} + 2\text{HCl} \rightarrow \text{FeCl}_2 + \text{H}_2 \uparrow$

#### 2. Xác Thực & Đồng Bộ Đám Mây Firebase Realtime Database
* **Tài khoản Học sinh:** Đăng nhập bằng Mã học sinh (ví dụ: `HS001`, `HS002`, `8A1-05`,...) và mật khẩu. Tự động lưu lịch sử bài thi, điểm số, thời gian làm bài lên nhánh `/exam_results.json`.
* **Tài khoản Giáo viên (Thầy Hùng ĐT):** Đăng nhập mã `GIAOVIEN` (mật khẩu mặc định: `hungdt2026`). Có toàn quyền quản trị:
  * Xem nhật ký thi thời gian thực của toàn bộ học sinh.
  * Xuất bảng điểm chi tiết định dạng CSV tương thích Excel.
  * Lọc tìm kiếm theo Tên, Mã HS, Lớp, Tên bài kiểm tra.
* **Cơ chế Ngoại Tuyến (Offline Resilience):** Khi mất mạng, bài thi tự động lưu tạm vào `localStorage`. Ngay khi có mạng trở lại, hệ thống tự động đẩy toàn bộ lên máy chủ Firebase mà không làm mất điểm của học sinh.

#### 3. Bộ Tạo Đề Ma Trận 4 Mức Độ Nhận Thức GDPT 2018 & Xuất Bản In Ấn A4
* Tùy chỉnh tỷ lệ ma trận theo chuẩn Bộ GD&ĐT:
  * 🌱 **Nhận biết:** 40% (16 câu)
  * 💡 **Thông hiểu:** 30% (12 câu)
  * ⚙️ **Vận dụng:** 20% (8 câu)
  * 🚀 **Vận dụng cao:** 10% (4 câu)
* Tạo đề thi ngẫu nhiên phân hóa kèm 3 mã đề đảo câu tự động (`101`, `102`, `103`).
* **Xuất bản in ấn chuyên nghiệp chuẩn A4:**
  * 📄 **Đề thi A4:** Header trung tâm Giáo Hùng, mã đề, thông tin thí sinh, chia cột tiết kiệm giấy in.
  * 📊 **Bảng ma trận đặc tả đề thi:** Thống kê số câu, tỷ lệ điểm theo chuẩn GDPT 2018.
  * ⭕ **Phiếu trả lời trắc nghiệm chuẩn OMR:** 40 câu tô tròn A, B, C, D chuyên nghiệp như phòng thi thật.
  * 🔑 **Bảng đáp án & Hướng dẫn giải chi tiết:** Lời giải từng câu kèm phân loại mức độ nhận thức.

#### 4. Phòng Thi Trực Tuyến Tương Tác
* Đồng hồ đếm ngược thời gian làm bài chuẩn phòng thi (50p, 60p, 90p).
* **Question Palette:** Bảng màu 40 câu hỏi, đánh dấu trạng thái *Đã làm*, *Chưa làm*, *Đang xem*.
* Tự động cuộn trang mượt mà (smooth scrolling) đến đúng câu hỏi khi chuyển câu.

#### 5. Bộ Soạn Thảo Đề Thi CMS Dành Cho Giáo Viên (Teacher CMS)
* **Bóc tách văn bản đề thi tự động (Word/PDF Parser):** Thầy cô chỉ cần copy văn bản đề thi từ Word/PDF dán vào khung, hệ thống tự động bóc tách Câu hỏi, 4 đáp án A/B/C/D, đáp án đúng và lời giải chi tiết.
* **Nạp đề mẫu thử nghiệm:** Tích hợp nút nạp mẫu đề thi có công thức KaTeX để giáo viên trải nghiệm ngay mà không cần chuẩn bị file.
* **Soạn thủ công từng câu:** Hỗ trợ nhập liệu có khung xem trước KaTeX thời gian thực.
* **Sao lưu & Phục hồi JSON:** Xuất toàn bộ ngân hàng câu hỏi thành file `.json` về máy tính và nạp lại khi cần chuyển đổi thiết bị.

#### 6. Bảng Vàng Vinh Danh (Top 10 Leaderboard) & Gamification
* Bục vinh danh Podium 3 hạng đầu: 🥇 **Top 1 Thủ Khoa Vàng**, 🥈 **Hạng 2 Bạc**, 🥉 **Hạng 3 Đồng**.
* Bảng Danh Dự Top 4–10 cập nhật thời gian thực từ Firebase.
* Bộ lọc theo môn: Toàn hệ thống, Toán, Lí, Hóa, Tiếng Anh.

#### 7. AI Phân Tích Lỗ Hổng Năng Lực & Chế Độ "Smart Re-try"
* Đánh giá tỷ lệ chính xác trên 4 mức độ nhận thức GDPT 2018.
* Đưa ra nhận xét sư phạm định hướng học tập cá nhân hóa.
* **Chế độ Luyện tập lại các câu sai (Smart Re-try):** Tự động lọc ra các câu học sinh làm sai và tạo bài thi phục thù ngay lập tức để khắc phục triệt để lỗ hổng.

#### 8. Hiệu Ứng Âm Thanh Web Audio, Pháo Hoa & Giấy Khen Danh Dự A4
* **Web Audio Synthesizer:** Âm thanh click êm ái, chuông đúng, khúc nhạc khải hoàn chiến thắng (Fanfare).
* **Canvas Confetti:** Bắn pháo hoa rực rỡ khi học sinh đạt điểm Giỏi ($\ge 8.0/10$).
* **Giấy Khen Danh Dự Khổ Ngang (A4 Landscape):** Khi đạt điểm Giỏi, học sinh có thể nhấn nút **[📜 In Giấy Khen Danh Dự]** để in giấy khen có hoa văn trang trọng, quốc hiệu, con dấu đỏ và chữ ký số nghệ thuật của **Thầy Hùng ĐT**.

---

### 💻 HƯỚNG DẪN VẬN HÀNH DÀNH CHO THẦY HÙNG ĐT

#### 1. Khởi Chạy Hệ Thống Ở Môi Trường Phát Triển
```bash
# Cài đặt thư viện (nếu cần)
npm install

# Khởi chạy máy chủ phát triển
npm run dev
# Mở trình duyệt tại: http://localhost:5173/
```

#### 2. Đóng Gói Bản Build Sản Phẩm (Production)
```bash
npm run build
# Thư mục /dist sẽ được tạo ra sẵn sàng để đưa lên Hosting hoặc máy chủ web.
```

#### 3. Đăng Nhập Quản Trị Giáo Viên
* Nhấp vào nút **"Đăng nhập Học sinh / GV"** ở góc phải thanh Hub.
* **Mã đăng nhập:** `GIAOVIEN`
* **Mật khẩu:** `hungdt2026`
* Nhấn **"📊 Quản Trị"** để mở bảng theo dõi điểm số, học sinh và xuất file Excel.

---

### 🛡️ BẢN QUYỀN
© 2026 Bản quyền thuộc về **Thầy Hùng ĐT - TRUNG TÂM BDVH & LTĐH GIÁO HÙNG** (Môn: TOÁN, LÍ, HÓA, ANH, TIN HỌC).
Vui lòng không sao chép dưới mọi hình thức.
