/**
 * =========================================================================
 * GOOGLE APPS SCRIPT CHO D'LUXURY DESIGN
 * Tự động nhận dữ liệu ĐỘNG từ khách hàng, ghi vào Google Sheet & gửi Telegram
 * =========================================================================
 */

// ⚙️ CẤU HÌNH HỆ THỐNG
const CONFIG = {
  TELEGRAM_BOT_TOKEN: '8987108385:AAHimdTJBN5MWqYol2BTP81PpoJkjWoFYxg',
  TELEGRAM_CHAT_ID: '6929317961',
  SPREADSHEET_ID: '1pLzyBWXtVPJvNe0Ig5cYuBRO8_9yBHCVFrP8gUqQJfY',
};

/**
 * HÀM CHÍNH: Nhận 100% dữ liệu ĐỘNG do khách hàng nhập từ Form Landing Page
 */
function doPost(e) {
  try {
    // 1. Đọc dữ liệu thực tế do khách hàng gửi lên
    let data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 2. Lấy các thông tin khách vừa điền trên Form
    const createdAt = data.createdAt || Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    const fullName = data.fullName || '(Không điền)';
    const phone = data.phone || '(Không điền)';
    const service = data.service || 'Thiết kế nội thất';
    const budget = data.budget || 'Chưa chọn';
    const location = data.location || '(Không điền)';
    const notes = data.notes || '(Không có)';

    // 3. Mở bảng Google Sheet của bạn để ghi dòng mới
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Tự động tạo hàng tiêu đề bảng ở dòng đầu tiên nếu bảng còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời gian đăng ký',
        'Họ và tên khách',
        'Số điện thoại',
        'Dịch vụ quan tâm',
        'Ngân sách dự kiến',
        'Địa chỉ / Dự án',
        'Ghi chú yêu cầu',
        'Trạng thái xử lý'
      ]);
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#8A4F2C');
      headerRange.setFontColor('#FFFFFF');
    }

    // Thêm dòng thông tin khách vừa gửi vào bảng tính
    sheet.appendRow([
      createdAt,
      fullName,
      "'" + phone, // Thêm dấu ' để giữ nguyên số 0 ở đầu số điện thoại
      service,
      budget,
      location,
      notes,
      '⏳ Mới đăng ký (Chưa gọi)'
    ]);

    // 4. Bắn tin nhắn thông báo tức thì sang Telegram
    sendTelegramNotification({
      createdAt: createdAt,
      fullName: fullName,
      phone: phone,
      service: service,
      budget: budget,
      location: location,
      notes: notes,
    });

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success', message: 'Lead saved successfully!' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Xử lý GET request (kiểm tra trạng thái Webhook)
 */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'online', message: 'D\'Luxury Lead Webhook is running active!' })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Gửi tin nhắn HTML sang Telegram
 */
function sendTelegramNotification(lead) {
  const url = 'https://api.telegram.org/bot' + CONFIG.TELEGRAM_BOT_TOKEN + '/sendMessage';
  
  const text = 
    '🌟 <b>KHÁCH HÀNG MỚI ĐĂNG KÝ TƯ VẤN (D\'LUXURY)</b> 🌟\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '👤 <b>Họ tên:</b> ' + lead.fullName + '\n' +
    '📞 <b>Số điện thoại:</b> <code>' + lead.phone + '</code>\n' +
    '🛋️ <b>Dịch vụ quan tâm:</b> ' + lead.service + '\n' +
    '💰 <b>Ngân sách dự kiến:</b> ' + lead.budget + '\n' +
    '📍 <b>Địa chỉ / Dự án:</b> ' + lead.location + '\n' +
    '📝 <b>Ghi chú:</b> ' + lead.notes + '\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '⏰ <b>Thời gian:</b> ' + lead.createdAt + '\n' +
    '🌐 <b>Nguồn:</b> Landing Page D\'Luxury Design';

  const payload = {
    chat_id: CONFIG.TELEGRAM_CHAT_ID,
    text: text,
    parse_mode: 'HTML',
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  UrlFetchApp.fetch(url, options);
}
