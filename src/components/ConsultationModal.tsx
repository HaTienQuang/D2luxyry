'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  AppstoreOutlined,
  DollarOutlined,
  CheckCircleFilled,
  SendOutlined,
} from '@ant-design/icons';
import { submitLead } from '../services/leadService';

const { TextArea } = Input;

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  open,
  onClose,
  defaultService,
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      if (defaultService) {
        form.setFieldsValue({ service: defaultService });
      } else {
        form.setFieldsValue({ service: '' });
      }
    }
  }, [open, defaultService, form]);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      await submitLead(values);
      setSubmitted(true);
      message.success("Đăng ký tư vấn thành công! D'Luxury Design sẽ liên hệ quý khách trong vòng 15 phút.");
    } catch (error) {
      message.error('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại hoặc gọi hotline!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    form.resetFields();
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleResetAndClose}
      footer={null}
      centered
      width={580}
      title={null}
      className="consultation-modal"
    >
      <div className="pt-2 pb-1">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
              <CheckCircleFilled />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1613]">
              Gửi yêu cầu thành công!
            </h3>
            <p className="text-sm text-[#6B635B] max-w-sm mx-auto leading-relaxed">
              Cảm ơn quý khách đã tin tưởng D&apos;Luxury Design. Chuyên viên tư vấn kiến trúc của chúng tôi sẽ gọi điện hỗ trợ trong ít phút.
            </p>
            <div className="pt-4">
              <Button type="primary" size="large" onClick={handleResetAndClose} className="!px-8 !rounded-full">
                Hoàn tất
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Modal Header */}
            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A4F2C]">
                ĐĂNG KÝ TƯ VẤN MIỄN PHÍ
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1613]">
                Kiến Tạo Không Gian Sống Của Bạn
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C]">
                Nhận giải pháp thiết kế tối ưu và bảng dự toán chi tiết không phát sinh.
              </p>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                service: defaultService || '',
                budget: '',
              }}
              requiredMark={false}
              className="space-y-3.5 [&_.ant-form-item]:!mb-3"
            >
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Form.Item
                  name="fullName"
                  label={<span className="text-[13px] font-medium text-[#4A423B]">Họ và tên *</span>}
                  rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-stone-400 text-sm" />}
                    placeholder="Nhập họ và tên"
                    size="middle"
                    className="!py-2 !text-sm placeholder:!text-[13px] placeholder:!text-stone-400"
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label={<span className="text-[13px] font-medium text-[#4A423B]">Số điện thoại *</span>}
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                    { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined className="text-stone-400 text-sm" />}
                    placeholder="Nhập số điện thoại"
                    size="middle"
                    className="!py-2 !text-sm placeholder:!text-[13px] placeholder:!text-stone-400"
                    allowClear
                  />
                </Form.Item>
              </div>

              {/* Row 2: Email & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Form.Item
                  name="email"
                  label={<span className="text-[13px] font-medium text-[#4A423B]">Email</span>}
                  rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
                >
                  <Input
                    prefix={<MailOutlined className="text-stone-400 text-sm" />}
                    placeholder="Nhập email của bạn"
                    size="middle"
                    className="!py-2 !text-sm placeholder:!text-[13px] placeholder:!text-stone-400"
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name="budget"
                  label={<span className="text-[13px] font-medium text-[#4A423B]">Ngân sách dự kiến</span>}
                >
                  <Input
                    prefix={<DollarOutlined className="text-stone-400 text-sm" />}
                    placeholder="Nhập mức ngân sách dự kiến"
                    size="middle"
                    className="!py-2 !text-sm placeholder:!text-[13px] placeholder:!text-stone-400"
                    allowClear
                  />
                </Form.Item>
              </div>

              {/* Row 3: Full Width - Service / Project */}
              <Form.Item
                name="service"
                label={<span className="text-[13px] font-medium text-[#4A423B]">Dịch vụ / Dự án quan tâm</span>}
              >
                <Input
                  prefix={<AppstoreOutlined className="text-stone-400 text-sm" />}
                  placeholder="Nhập dịch vụ hoặc tên dự án mong muốn"
                  size="middle"
                  className="!py-2 !text-sm placeholder:!text-[13px] placeholder:!text-stone-400"
                  allowClear
                />
              </Form.Item>

              {/* Row 4: Full Width - Location */}
              <Form.Item
                name="location"
                label={<span className="text-[13px] font-medium text-[#4A423B]">Địa chỉ công trình</span>}
              >
                <Input
                  prefix={<HomeOutlined className="text-stone-400 text-sm" />}
                  placeholder="Nhập địa chỉ hoặc khu đô thị / căn hộ"
                  size="middle"
                  className="!py-2 !text-sm placeholder:!text-[13px] placeholder:!text-stone-400"
                  allowClear
                />
              </Form.Item>

              {/* Row 5: Full Width - Notes */}
              <Form.Item
                name="notes"
                label={<span className="text-[13px] font-medium text-[#4A423B]">Ghi chú yêu cầu</span>}
              >
                <TextArea
                  rows={3}
                  placeholder="Nhập thêm các yêu cầu đặc biệt hoặc phong cách bạn yêu thích..."
                  className="!text-sm placeholder:!text-[13px] placeholder:!text-stone-400"
                />
              </Form.Item>

              <div className="pt-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  block
                  size="large"
                  icon={<SendOutlined />}
                  className="!h-12 !text-[15px] !font-bold !rounded-full shadow-lg"
                >
                  Gửi yêu cầu nhận tư vấn
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </Modal>
  );
};
