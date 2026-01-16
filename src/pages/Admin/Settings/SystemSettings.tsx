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
} from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  GlobalOutlined,
  MailOutlined,
  BgColorsOutlined,
  LayoutOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { Color } from "antd/es/color-picker";
import { initialEmails } from "./../../../mockData/mockData";

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

  const handleSave = () => {
    message.loading({ content: "Đang lưu cấu hình...", key: "save" });
    setTimeout(() => {
      message.success({ content: "Lưu cài đặt thành công!", key: "save" });
    }, 1000);
  };

  // BRANDING
  const BrandingSettings = () => (
    <Form
      layout="vertical"
      initialValues={{
        siteName: "CyberSoft Academy",
        domain: "cybersoft.edu.vn",
      }}
    >
      <Row gutter={24}>
        <Col span={16}>
          <Card
            title="Thông tin chung"
            variant="borderless"
            className="shadow-sm mb-6"
          >
            <Form.Item label="Tên hệ thống" name="siteName">
              <Input size="large" prefix={<GlobalOutlined />} />
            </Form.Item>
            <Form.Item label="Tên miền (Domain)" name="domain">
              <Input size="large" addonBefore="https://" />
            </Form.Item>
            <Form.Item label="Mô tả SEO (Meta Description)">
              <TextArea
                rows={3}
                placeholder="Mô tả ngắn về website hiển thị trên Google..."
              />
            </Form.Item>
          </Card>

          <Card
            title="Giao diện & Màu sắc"
            variant="borderless"
            className="shadow-sm"
          >
            <div className="flex items-center gap-8">
              <Form.Item label="Màu chủ đạo (Primary Color)" className="mb-0">
                <ColorPicker
                  showText
                  value={primaryColor}
                  onChange={(color: Color) =>
                    setPrimaryColor(color.toHexString())
                  }
                />
              </Form.Item>
              <div className="flex-1 p-4 rounded-lg border bg-gray-50 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  Logo
                </div>
                <div>
                  <div style={{ color: primaryColor }} className="font-bold">
                    Tiêu đề mẫu
                  </div>
                  <Button
                    type="primary"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Nút bấm mẫu
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            title="Logo & Favicon"
            variant="borderless"
            className="shadow-sm text-center"
          >
            <div className="mb-6">
              <p className="mb-2 font-medium">Logo Website</p>
              <Upload
                listType="picture-card"
                showUploadList={false}
                maxCount={1}
              >
                <div>
                  <UploadOutlined />
                  <div className="mt-2">Upload</div>
                </div>
              </Upload>
            </div>
            <Divider />
            <div>
              <p className="mb-2 font-medium">Favicon (Icon tab trình duyệt)</p>
              <Upload
                listType="picture-circle"
                showUploadList={false}
                maxCount={1}
              >
                <div>
                  <UploadOutlined />
                </div>
              </Upload>
            </div>
          </Card>
        </Col>
      </Row>
    </Form>
  );

  // CẤU HÌNH EMAIL
  const EmailSettings = () => (
    <Card variant="borderless" className="shadow-sm">
      <div className="mb-4 bg-blue-50 p-4 rounded border border-blue-100 text-blue-700">
        <MailOutlined className="mr-2" />
        Sử dụng các biến sau để cá nhân hóa email: <b>{`{userName}`}</b>,{" "}
        <b>{`{courseName}`}</b>, <b>{`{link}`}</b>.
      </div>

      <Collapse defaultActiveKey={["welcome"]} ghost>
        {initialEmails.map((email) => (
          <Panel
            header={
              <div className="flex justify-between items-center w-full">
                <span className="font-medium text-lg">{email.name}</span>
                <Switch
                  defaultChecked={email.active}
                  checkedChildren="Bật"
                  unCheckedChildren="Tắt"
                  onClick={(_, e) => e.stopPropagation()}
                />
              </div>
            }
            key={email.key}
          >
            <Form layout="vertical">
              <Form.Item label="Tiêu đề Email">
                <Input defaultValue={email.subject} />
              </Form.Item>
              <Form.Item label="Nội dung Email">
                <TextArea
                  rows={6}
                  defaultValue={`Xin chào {userName},\n\nCảm ơn bạn đã tham gia...`}
                />
              </Form.Item>
              <div className="flex justify-end">
                <Button size="small">Gửi mail test</Button>
              </div>
            </Form>
          </Panel>
        ))}
      </Collapse>
    </Card>
  );

  // LANDING PAGE BUILDER
  const LandingPageSettings = () => (
    <Row gutter={24}>
      <Col span={10}>
        <Card
          title="Tùy chỉnh nội dung"
          bordered={false}
          className="shadow-sm h-full"
        >
          <Form layout="vertical">
            <Form.Item label="Tiêu đề Hero Section">
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
            <Form.Item label="Mô tả ngắn">
              <TextArea
                rows={3}
                value={landingPreview.heroSubtitle}
                onChange={(e) =>
                  setLandingPreview({
                    ...landingPreview,
                    heroSubtitle: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Divider />
            <div className="flex justify-between items-center mb-4">
              <span>Hiển thị Đánh giá (Testimonials)</span>
              <Switch
                checked={landingPreview.showTestimonials}
                onChange={(v) =>
                  setLandingPreview({ ...landingPreview, showTestimonials: v })
                }
              />
            </div>
            <div className="flex justify-between items-center">
              <span>Hiển thị FAQ (Hỏi đáp)</span>
              <Switch
                checked={landingPreview.showFAQ}
                onChange={(v) =>
                  setLandingPreview({ ...landingPreview, showFAQ: v })
                }
              />
            </div>
          </Form>
        </Card>
      </Col>

      {/* LIVE PREVIEW SECTION */}
      <Col span={14}>
        <Card
          title="Xem trước (Live Preview)"
          variant="borderless"
          className="shadow-sm h-full bg-gray-100"
        >
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            style={{ minHeight: "400px" }}
          >
            {/* Fake Browser Header */}
            <div className="bg-gray-100 border-b p-2 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            {/* Content Preview */}
            <div
              className="p-8 text-center"
              style={{ backgroundColor: "#f8fafc" }}
            >
              <h1
                className="text-2xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                {landingPreview.heroTitle}
              </h1>
              <p className="text-gray-600 mb-6">
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

            {landingPreview.showTestimonials && (
              <div className="p-6 border-t">
                <h3 className="font-bold mb-2 text-center">Học viên nói gì?</h3>
                <div className="flex gap-2">
                  <div className="bg-gray-50 p-2 rounded text-xs flex-1">
                    "Khóa học rất tuyệt!"
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-xs flex-1">
                    "Mentor nhiệt tình."
                  </div>
                </div>
              </div>
            )}

            {landingPreview.showFAQ && (
              <div className="p-6 border-t">
                <h3 className="font-bold mb-2 text-center">
                  Câu hỏi thường gặp
                </h3>
                <div className="space-y-2">
                  <div className="border-b pb-1 text-xs text-gray-500">
                    Người mới bắt đầu học được không?
                  </div>
                  <div className="border-b pb-1 text-xs text-gray-500">
                    Lộ trình học bao lâu?
                  </div>
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

      <Tabs defaultActiveKey="1" items={items} type="card" size="large" />
    </div>
  );
};

export default SystemSettings;
