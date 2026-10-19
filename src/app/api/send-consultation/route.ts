import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, budget, project, address, notes } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Họ tên và số điện thoại là bắt buộc" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    const newLead = {
      id: Date.now().toString(),
      name,
      phone,
      email: email || "Không cung cấp",
      budget: budget || "Chưa xác định",
      project: project || "Tư vấn tổng thể",
      address: address || "Chưa cung cấp",
      notes: notes || "Không có ghi chú thêm",
      createdAt: timestamp,
    };

    // 1. Persist lead to data/consultations.json
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "consultations.json");
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        try {
          leads = JSON.parse(fs.readFileSync(leadsFile, "utf8"));
        } catch {
          leads = [];
        }
      }
      leads.unshift(newLead);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf8");
    } catch (saveErr) {
      console.error("Error saving lead to disk:", saveErr);
    }

    // 2. Send email via Nodemailer if SMTP is configured
    const recipientEmail = "d2luxurydesign@gmail.com";
    let emailSent = false;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT) || 465,
          secure: (process.env.SMTP_SECURE ?? "true") === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"D2 Luxury Web" <${process.env.SMTP_USER}>`,
          to: recipientEmail,
          replyTo: email || recipientEmail,
          subject: `[D2 Luxury] Đăng ký tư vấn mới: ${name} - ${phone}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ded8ce; border-radius: 8px;">
              <h2 style="color: #8a522a; text-transform: uppercase; margin-bottom: 5px;">Đăng Ký Tư Vấn Thiết Kế Mới</h2>
              <p style="color: #666; font-size: 13px; margin-top: 0;">Thời gian: ${timestamp}</p>
              <hr style="border: none; border-top: 1px solid #ded8ce; margin: 15px 0;" />
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 160px; color: #333;">Họ và tên:</td><td style="color: #111;">${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Số điện thoại:</td><td style="color: #8a522a; font-weight: bold;"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Email khách hàng:</td><td style="color: #111;">${email || "Chưa cung cấp"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Ngân sách dự kiến:</td><td style="color: #111;">${budget || "Chưa xác định"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Dự án / Dịch vụ quan tâm:</td><td style="color: #111;">${project || "Tư vấn tổng thể"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Địa chỉ công trình:</td><td style="color: #111;">${address || "Chưa cung cấp"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Ghi chú yêu cầu:</td><td style="color: #111; white-space: pre-wrap;">${notes || "Không có"}</td></tr>
              </table>
              <hr style="border: none; border-top: 1px solid #ded8ce; margin: 15px 0;" />
              <p style="color: #888; font-size: 12px; text-align: center;">Email tự động gửi từ hệ thống website D2 Luxury Design.</p>
            </div>
          `,
        });
        emailSent = true;
      } catch (mailErr) {
        console.error("Nodemailer error:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Đã ghi nhận yêu cầu tư vấn thành công!",
      lead: newLead,
      emailSent,
      targetEmail: recipientEmail,
    });
  } catch (error) {
    console.error("API send-consultation error:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi khi xử lý yêu cầu" },
      { status: 500 }
    );
  }
}

