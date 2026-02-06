import React, { useState } from "react";
import {
  Tabs,
  Card,
  Form,
  Input,
  Button,
  Upload,
  ColorPicker,
  Switch,
  Select,
  Row,
  Col,
  message,
  Typography,
  Collapse,
  Divider,
  List,
  Modal,
} from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  GlobalOutlined,
  MailOutlined,
  BgColorsOutlined,
  LayoutOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { Color } from "antd/es/color-picker";
import {
  initialEmails,
  type EmailTemplate,
} from "./../../../mockData/mockData";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const SystemSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [primaryColor, setPrimaryColor] = useState<string>("#4f46e5");

  const [landingPreview, setLandingPreview] = useState({
    heroTitle: "Học Lập Trình Để Đi Làm",
    heroSubtitle: "Cam kết đầu ra - Thực chiến dự án - Mentor tận tâm",
    showTestimonials: true,
    showFAQ: true,
  });

  const [emailTemplates, setEmailTemplates] =
    useState<EmailTemplate[]>(initialEmails);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [editingEmail, setEditingEmail] = useState<EmailTemplate | null>(null);

  // Hàm lưu chung
  const handleSave = () => {
    message.loading({ content: "Đang lưu cấu hình...", key: "save" });
    setTimeout(() => {
      message.success({ content: "Lưu cấu hình thành công!", key: "save" });
    }, 1000);
  };

  const BrandingSettings = () => (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        siteName: "CyberSoft Learning",
        siteDesc: "Hệ thống đào tạo lập trình hàng đầu",
      }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Tên Website" name="siteName">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Mô tả SEO" name="siteDesc">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Logo">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                <img
                  src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyber-logo-white.png" // Ảnh demo
                  alt="Logo"
                  className="max-w-full max-h-full p-2 object-contain bg-black"
                />
              </div>
              <Upload>
                <Button icon={<UploadOutlined />}>Tải logo mới</Button>
              </Upload>
            </div>
          </Form.Item>
          <Form.Item label="Màu chủ đạo">
            <ColorPicker
              showText
              value={primaryColor}
              onChange={(value: Color, hex: string) => setPrimaryColor(hex)}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const handleEditEmail = (template: EmailTemplate) => {
    setEditingEmail(template);
    setIsEmailModalOpen(true);
  };

  const handleToggleEmail = (id: string, checked: boolean) => {
    const newEmails = emailTemplates.map((e) =>
      e.id === id ? { ...e, isActive: checked } : e,
    );
    setEmailTemplates(newEmails);
    message.success(`Đã ${checked ? "bật" : "tắt"} mẫu email này`);
  };

  const EmailSettings = () => (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Text type="secondary">
          Quản lý các mẫu email gửi tự động cho học viên
        </Text>
      </div>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={emailTemplates}
        renderItem={(item) => (
          <List.Item>
            <Card
              size="small"
              title={
                <span className="font-bold text-indigo-700">{item.type}</span>
              }
              extra={
                <Switch
                  checkedChildren="Bật"
                  unCheckedChildren="Tắt"
                  checked={item.isActive}
                  onChange={(checked) => handleToggleEmail(item.id, checked)}
                />
              }
              actions={[
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEditEmail(item)}
                >
                  Chỉnh sửa nội dung
                </Button>,
              ]}
            >
              <div className="text-gray-600 mb-2">
                <strong>Tiêu đề:</strong> {item.subject}
              </div>
              <div className="text-xs text-gray-400 truncate">
                {item.content}
              </div>
            </Card>
          </List.Item>
        )}
      />

      {/* Modal Chỉnh Sửa Email */}
      <Modal
        title={`Chỉnh sửa: ${editingEmail?.type}`}
        open={isEmailModalOpen}
        onCancel={() => setIsEmailModalOpen(false)}
        onOk={() => {
          message.success("Cập nhật mẫu email thành công!");
          setIsEmailModalOpen(false);
        }}
      >
        {editingEmail && (
          <Form layout="vertical" initialValues={editingEmail}>
            <Form.Item label="Tiêu đề Email" name="subject">
              <Input />
            </Form.Item>
            <Form.Item label="Nội dung (HTML/Text)" name="content">
              <TextArea rows={6} />
            </Form.Item>
            <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-700">
              Lưu ý: Bạn có thể dùng các biến {`{{name}}`}, {`{{course_name}}`}{" "}
              để thay thế dữ liệu động.
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );

  const LandingPageSettings = () => (
    <Row gutter={24}>
      <Col span={10}>
        <Card
          title="Nội dung Hero Section"
          bordered={false}
          className="shadow-sm"
        >
          <Form layout="vertical">
            <Form.Item label="Tiêu đề chính">
              <Input
                value={landingPreview.heroTitle}
                onChange={(e) =>
                  setLandingPreview({
                    ...landingPreview,
                    heroTitle: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Tiêu đề phụ">
              <TextArea
                value={landingPreview.heroSubtitle}
                onChange={(e) =>
                  setLandingPreview({
                    ...landingPreview,
                    heroSubtitle: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Hiển thị section">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span>Đánh giá học viên</span>
                  <Switch
                    checked={landingPreview.showTestimonials}
                    onChange={(v) =>
                      setLandingPreview({
                        ...landingPreview,
                        showTestimonials: v,
                      })
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <span>Câu hỏi thường gặp (FAQ)</span>
                  <Switch
                    checked={landingPreview.showFAQ}
                    onChange={(v) =>
                      setLandingPreview({ ...landingPreview, showFAQ: v })
                    }
                  />
                </div>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={14}>
        <Card
          title="Xem trước (Preview)"
          className="bg-gray-50 text-center h-full"
        >
          <div className="border border-gray-200 bg-white p-6 rounded-lg shadow-sm">
            {/* Fake Header */}
            <div className="flex justify-between items-center mb-8 border-b pb-2">
              <div className="w-20 h-6 bg-indigo-600 rounded"></div>
              <div className="flex gap-2">
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Hero Section Preview */}
            <div className="py-10">
              <h1
                className="text-2xl font-bold text-gray-800 mb-2"
                style={{ color: primaryColor }}
              >
                {landingPreview.heroTitle}
              </h1>
              <p className="text-gray-500 mb-6">
                {landingPreview.heroSubtitle}
              </p>
              <Button
                type="primary"
                size="large"
                style={{ backgroundColor: primaryColor }}
              >
                Đăng ký ngay
              </Button>
            </div>

            {/* Testimonials Preview */}
            {landingPreview.showTestimonials && (
              <div className="mt-8 pt-4 border-t border-dashed">
                <div className="text-xs text-gray-400 uppercase mb-2">
                  Đánh giá học viên
                </div>
                <div className="flex gap-2 justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="bg-gray-100 p-2 rounded text-xs text-left w-48">
                    "Khóa học rất tuyệt vời..."
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Preview */}
            {landingPreview.showFAQ && (
              <div className="mt-4 pt-4 border-t border-dashed">
                <div className="text-xs text-gray-400 uppercase mb-2">
                  Lộ trình học bao lâu?
                </div>
              </div>
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );

  const items = [
    {
      key: "1",
      label: (
        <span>
          <BgColorsOutlined /> Thương hiệu & Giao diện
        </span>
      ),
      children: <BrandingSettings />,
    },
    {
      key: "2",
      label: (
        <span>
          <MailOutlined /> Cấu hình Email
        </span>
      ),
      children: <EmailSettings />,
    },
    {
      key: "3",
      label: (
        <span>
          <LayoutOutlined /> Landing Page
        </span>
      ),
      children: <LandingPageSettings />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>
            Cài đặt hệ thống
          </Title>
          <Text type="secondary">
            Quản lý toàn bộ cấu hình website của bạn tại đây
          </Text>
        </div>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          size="large"
          onClick={handleSave}
          style={{ backgroundColor: primaryColor }}
        >
          Lưu thay đổi
        </Button>
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        size="large"
        className="bg-white p-6 rounded-lg shadow-sm"
      />
    </div>
  );
};

export default SystemSettings;
