import { LEAD_CONFIG } from '../config/leadConfig';

export interface LeadData {
  fullName: string;
  phone: string;
  email?: string;
  service?: string;
  budget?: string;
  location?: string;
  notes?: string;
  createdAt?: string;
}

/**
 * Format thời gian theo giờ Việt Nam
 */
export const formatVietnamTime = (date = new Date()): string => {
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
};

/**
 * Gửi thông tin tư vấn trực tiếp về Hộp thư Email của Quản trị viên
 * Sử dụng FormSubmit AJAX Endpoint (Serverless, miễn phí 100%, không cần cài backend)
 */
export const sendLeadToEmail = async (lead: LeadData): Promise<boolean> => {
  const { adminEmail } = LEAD_CONFIG;

  if (!adminEmail) {
    return false;
  }

  const timeStr = lead.createdAt || formatVietnamTime();

  // Dữ liệu format chuẩn tiếng Việt hiển thị trong email
  const payload = {
    _subject: `[D'Luxury Design] Khách hàng mới đăng ký tư vấn: ${lead.fullName} (${lead.phone})`,
    _template: 'table',
    _captcha: 'false',
    'Họ và tên': lead.fullName,
    'Số điện thoại': lead.phone,
    'Email khách': lead.email || 'Không cung cấp',
    'Dịch vụ quan tâm': lead.service || 'Chưa chọn',
    'Ngân sách dự kiến': lead.budget || 'Chưa chọn',
    'Địa chỉ / Dự án': lead.location || 'Không cung cấp',
    'Ghi chú yêu cầu': lead.notes || 'Không có',
    'Thời gian đăng ký': timeStr,
    'Nguồn': "Landing Page D'Luxury Design",
  };

  try {
    const url = `https://formsubmit.co/ajax/${encodeURIComponent(adminEmail)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.warn('FormSubmit email status:', res.status);
    }
    return res.ok;
  } catch (error) {
    console.error('Lỗi khi gửi email thông báo tư vấn:', error);
    return false;
  }
};

/**
 * Gửi thông tin tới Telegram Bot (Phụ trợ)
 */
export const sendLeadToTelegram = async (lead: LeadData): Promise<boolean> => {
  const { telegramBotToken, telegramChatId } = LEAD_CONFIG;

  if (!telegramBotToken || !telegramChatId) {
    return false;
  }

  const timeStr = lead.createdAt || formatVietnamTime();

  const text = `
🌟 <b>KHÁCH HÀNG ĐĂNG KÝ TƯ VẤN MỚI</b> 🌟
━━━━━━━━━━━━━━━━━━
👤 <b>Họ tên:</b> ${lead.fullName}
📞 <b>Số điện thoại:</b> <code>${lead.phone}</code>
📧 <b>Email:</b> ${lead.email || 'Không cung cấp'}
🛋️ <b>Dịch vụ:</b> ${lead.service || 'Chưa chọn'}
💰 <b>Ngân sách:</b> ${lead.budget || 'Chưa chọn'}
📍 <b>Địa chỉ / Dự án:</b> ${lead.location || 'Không có'}
📝 <b>Ghi chú:</b> ${lead.notes || 'Không có'}
━━━━━━━━━━━━━━━━━━
⏰ <b>Thời gian:</b> ${timeStr}
🌐 <b>Nguồn:</b> D'Luxury Design Landing Page
`.trim();

  try {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });
    return res.ok;
  } catch (error) {
    console.error('Lỗi khi gửi thông báo tới Telegram:', error);
    return false;
  }
};

/**
 * Gửi thông tin tới Google Apps Script (Phụ trợ)
 */
export const sendLeadToGoogleSheet = async (lead: LeadData): Promise<boolean> => {
  const { googleScriptUrl } = LEAD_CONFIG;

  if (!googleScriptUrl) {
    return false;
  }

  const payload = {
    ...lead,
    createdAt: lead.createdAt || formatVietnamTime(),
  };

  try {
    await fetch(googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error('Lỗi khi gửi dữ liệu tới Google Sheets:', error);
    return false;
  }
};

/**
 * Hàm tổng hợp xử lý tiếp nhận thông tin tư vấn
 * Gửi Email thông báo chính và đồng bộ sang Telegram / Google Sheets nếu được cấu hình
 */
export const submitLead = async (data: LeadData): Promise<{ success: boolean; message: string }> => {
  const payload: LeadData = {
    ...data,
    createdAt: formatVietnamTime(),
  };

  const tasks: Promise<boolean>[] = [];

  // 1. Luồng chính: Gửi trực tiếp về Email quản trị viên
  if (LEAD_CONFIG.adminEmail) {
    tasks.push(sendLeadToEmail(payload));
  }

  // 2. Gửi Telegram (nếu có cấu hình)
  if (LEAD_CONFIG.telegramBotToken && LEAD_CONFIG.telegramChatId) {
    tasks.push(sendLeadToTelegram(payload));
  }

  // 3. Gửi Google Sheets (nếu có cấu hình)
  if (LEAD_CONFIG.googleScriptUrl) {
    tasks.push(sendLeadToGoogleSheet(payload));
  }

  // Gửi đồng thời và đảm bảo trải nghiệm người dùng luôn mượt mà
  await Promise.allSettled(tasks);

  return {
    success: true,
    message: 'Đăng ký tư vấn thành công!',
  };
};
