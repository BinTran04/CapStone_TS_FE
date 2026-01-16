import React from "react";
import { Card, Col, Row, Table, Tag, Progress, Avatar, Typography } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Line,
} from "recharts";
import {
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  courseRevenueData,
  completionRateData,
  topStudentsData,
  promoEfficiencyData,
} from "./../../../mockData/mockData";

const { Title, Text } = Typography;

const ReportAnalytics: React.FC = () => {
  // Cấu hình cột cho bảng Top Học Viên
  const studentColumns = [
    {
      title: "Học viên",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <Avatar
            icon={<UserOutlined />}
            style={{ backgroundColor: "#87d068" }}
          />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: "Khóa học",
      dataIndex: "courses",
      key: "courses",
      render: (val: number) => <Tag color="blue">{val} khóa</Tag>,
    },
    {
      title: "Điểm TB",
      dataIndex: "score",
      key: "score",
      render: (val: number) => (
        <span className="font-bold text-indigo-600">{val}</span>
      ),
    },
    {
      title: "Thời gian học",
      dataIndex: "hours",
      key: "hours",
      render: (val: number) => `${val}h`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title level={2}>Báo Cáo & Phân Tích</Title>
        <Tag color="geekblue" className="px-3 py-1 text-sm">
          Cập nhật: Vừa xong
        </Tag>
      </div>

      {/* DOANH THU & HIỆU QUẢ KHUYẾN MÃI */}
      <Row gutter={16}>
        {/* Doanh thu theo khóa học */}
        <Col span={12}>
          <Card
            title="Doanh thu theo Khóa học (Top 5)"
            variant="borderless"
            className="shadow-sm"
          >
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <ComposedChart data={courseRevenueData} layout="vertical">
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip
                    formatter={(value) =>
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(Number(value))
                    }
                  />
                  <Bar
                    dataKey="revenue"
                    barSize={20}
                    fill="#4f46e5"
                    radius={[0, 4, 4, 0]}
                    name="Doanh thu"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Hiệu quả khuyến mãi */}
        <Col span={12}>
          <Card
            title="Hiệu quả chương trình Khuyến mãi"
            variant="borderless"
            className="shadow-sm"
            extra={
              <Tag color="green">
                <RiseOutlined /> +24% Hiệu quả
              </Tag>
            }
          >
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={promoEfficiencyData}>
                  <defs>
                    <linearGradient id="colorPromo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorOrganic"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="organic"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorOrganic)"
                    name="Tự nhiên"
                  />
                  <Area
                    type="monotone"
                    dataKey="promo"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPromo)"
                    name="Qua Khuyến mãi"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* TỶ LỆ HOÀN THÀNH & TOP HỌC VIÊN */}
      <Row gutter={16}>
        {/* Tỷ lệ hoàn thành */}
        <Col span={10}>
          <Card
            title="Tỷ lệ hoàn thành khóa học"
            variant="borderless"
            className="shadow-sm h-full"
          >
            <div className="space-y-6 mt-2">
              {completionRateData.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500">{item.rate}%</span>
                  </div>
                  <Progress
                    percent={item.rate}
                    strokeColor={
                      item.rate > 80
                        ? "#52c41a"
                        : item.rate > 60
                        ? "#1890ff"
                        : "#faad14"
                    }
                    trailColor="#f0f0f0"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded text-xs text-gray-500">
              <FallOutlined className="text-red-500 mr-1" />
              Tỷ lệ hoàn thành trung bình giảm 5% so với tháng trước. Cần tối ưu
              nội dung khóa "Data Science".
            </div>
          </Card>
        </Col>

        {/* Học viên tiêu biểu */}
        <Col span={14}>
          <Card
            title={
              <>
                <TrophyOutlined className="text-yellow-500 mr-2" /> Top Học Viên
                Xuất Sắc
              </>
            }
            variant="borderless"
            className="shadow-sm h-full"
          >
            <Table
              dataSource={topStudentsData}
              columns={studentColumns}
              pagination={false}
              rowKey="id"
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportAnalytics;
