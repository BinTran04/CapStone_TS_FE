import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  Card,
  Modal,
  Statistic,
  Row,
  Col,
  message,
  Typography,
  Divider,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  ReloadOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PrinterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  transactionData,
  type Transaction,
} from "./../../../mockData/mockData";

const { Title, Text } = Typography;

const TransactionManagement: React.FC = () => {
  const [data, setData] = useState<Transaction[]>(transactionData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const handleRefund = () => {
    if (!selectedTx) return;
    // Cập nhật trạng thái giả lập
    const newData = data.map((item) =>
      item.id === selectedTx.id
        ? { ...item, status: "Refunded" as const }
        : item,
    );
    setData(newData);
    message.success(`Đã hoàn tiền cho giao dịch ${selectedTx.id}`);
    setIsRefundOpen(false);
  };

  const filteredData = data.filter((item) => {
    const matchSearch =
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter ? item.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  const columns: ColumnsType<Transaction> = [
    {
      title: "Mã Giao Dịch",
      dataIndex: "id",
      key: "id",
      render: (text) => <span className="font-mono font-semibold">{text}</span>,
    },
    {
      title: "Khách hàng",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Khóa học",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (val) => (
        <span className="font-bold text-indigo-600">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(val)}
        </span>
      ),
    },
    {
      title: "Cổng thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => {
        let color = "default";
        if (method === "Momo") color = "pink";
        if (method === "ZaloPay") color = "blue";
        if (method === "Stripe") color = "purple";
        return <Tag color={color}>{method}</Tag>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        let icon = null;
        if (status === "Success") {
          color = "success";
          icon = <CheckCircleOutlined />;
        }
        if (status === "Pending") {
          color = "warning";
          icon = <ReloadOutlined spin />;
        }
        if (status === "Failed") {
          color = "error";
          icon = <CloseCircleOutlined />;
        }
        if (status === "Refunded") {
          color = "purple";
          icon = <ReloadOutlined />;
        }
        return (
          <Tag icon={icon} color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedTx(record);
              setIsInvoiceOpen(true);
            }}
          >
            Hóa đơn
          </Button>
          {record.status === "Success" && (
            <Button
              size="small"
              danger
              onClick={() => {
                setSelectedTx(record);
                setIsRefundOpen(true);
              }}
            >
              Hoàn tiền
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* THỐNG KÊ NHANH */}
      <Row gutter={16}>
        <Col span={8}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic
              title="Tổng Doanh Thu Thực Tế"
              value={125000000}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<DollarCircleOutlined />}
              suffix="VND"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic
              title="Đơn hàng chờ xử lý"
              value={5}
              valueStyle={{ color: "#faad14" }}
              prefix={<ReloadOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless" className="shadow-sm">
            <Statistic
              title="Tỷ lệ hoàn tiền"
              value={1.2}
              precision={1}
              valueStyle={{ color: "#cf1322" }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* THANH CÔNG CỤ VÀ BẢNG */}
      <Card title="Lịch sử giao dịch" bordered={false} className="shadow-sm">
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Tìm kiếm mã GD, tên khách hàng..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-1/3"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            placeholder="Lọc theo trạng thái"
            style={{ width: 200 }}
            allowClear
            onChange={(val) => setStatusFilter(val)}
            options={[
              { value: "Success", label: "Thành công" },
              { value: "Pending", label: "Đang xử lý" },
              { value: "Failed", label: "Thất bại" },
              { value: "Refunded", label: "Đã hoàn tiền" },
            ]}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </Card>

      {/* MODAL HÓA ĐƠN */}
      <Modal
        title="Chi tiết hóa đơn"
        open={isInvoiceOpen}
        onCancel={() => setIsInvoiceOpen(false)}
        footer={[
          <Button key="print" icon={<PrinterOutlined />}>
            In hóa đơn
          </Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            Tải PDF
          </Button>,
        ]}
        width={600}
      >
        {selectedTx && (
          <div className="p-4 border rounded-lg bg-gray-50 font-mono">
            <div className="text-center mb-6 border-b pb-4">
              <Title level={3} style={{ margin: 0 }}>
                CYBERSOFT ACADEMY
              </Title>
              <Text type="secondary">Hóa đơn thanh toán điện tử</Text>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Text strong>Mã giao dịch:</Text>
                <Text>{selectedTx.id}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>Ngày thanh toán:</Text>
                <Text>{selectedTx.date}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>Khách hàng:</Text>
                <Text>{selectedTx.user}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>Phương thức:</Text>
                <Text>{selectedTx.paymentMethod}</Text>
              </div>
              <Divider dashed />
              <div className="flex justify-between items-center">
                <Text>{selectedTx.courseName}</Text>
                <Text>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(selectedTx.amount)}
                </Text>
              </div>
              <Divider />
              <div className="flex justify-between text-lg font-bold">
                <Text>TỔNG CỘNG</Text>
                <Text className="text-indigo-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(selectedTx.amount)}
                </Text>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              Cảm ơn bạn đã đăng ký khóa học! Mọi thắc mắc xin liên hệ
              support@cybersoft.edu.vn
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL HOÀN TIỀN */}
      <Modal
        title="Xác nhận hoàn tiền"
        open={isRefundOpen}
        onOk={handleRefund}
        onCancel={() => setIsRefundOpen(false)}
        okText="Xác nhận hoàn tiền"
        okButtonProps={{ danger: true }}
      >
        <p>
          Bạn có chắc chắn muốn hoàn tiền cho giao dịch <b>{selectedTx?.id}</b>?
        </p>
        <p>
          Số tiền:{" "}
          <b>
            {selectedTx &&
              new Intl.NumberFormat("vi-VN").format(selectedTx.amount)}{" "}
            VND
          </b>
        </p>
        <Input.TextArea
          placeholder="Nhập lý do hoàn tiền (VD: Khách hàng mua nhầm, lỗi hệ thống...)"
          rows={3}
          className="mt-3"
        />
      </Modal>
    </div>
  );
};

export default TransactionManagement;
