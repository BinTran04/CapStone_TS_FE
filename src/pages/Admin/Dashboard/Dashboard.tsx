import React from "react";
import { Card, Col, Row, Statistic, Progress, Table, Tag } from "antd";
import {
  UserOutlined,
  ReadOutlined,
  DollarCircleOutlined,
  LikeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { revenueData, categoryData } from "../../../mockData/mockData";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* CARDS THỐNG KÊ */}
      <Row gutter={16}>
        <Col span={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            {/* FIX LỖI 1: Đổi valueStyle thành styles={{ content: ... }} */}
            <Statistic
              title="Tổng Doanh Thu"
              value={112893}
              precision={2}
              styles={{ content: { color: "#3f8600", fontWeight: "bold" } }}
              prefix={<DollarCircleOutlined />}
              suffix="$"
            />
            <div className="flex items-center text-green-600 mt-2 text-xs">
              <ArrowUpOutlined /> 12% so với tháng trước
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <Statistic
              title="Học viên mới"
              value={93}
              styles={{ content: { color: "#1677ff", fontWeight: "bold" } }}
              prefix={<UserOutlined />}
            />
            <div className="flex items-center text-red-500 mt-2 text-xs">
              <ArrowDownOutlined /> 5% so với tháng trước
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <Statistic
              title="Tổng Khóa học"
              value={45}
              styles={{ content: { color: "#cf1322", fontWeight: "bold" } }}
              prefix={<ReadOutlined />}
            />
            <div className="flex items-center text-gray-500 mt-2 text-xs">
              +2 khóa mới hôm nay
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <Statistic
              title="Đánh giá"
              value={4.8}
              precision={1}
              styles={{ content: { color: "#faad14", fontWeight: "bold" } }}
              prefix={<LikeOutlined />}
              suffix="/ 5"
            />
            <div className="mt-2">
              <Progress
                percent={96}
                showInfo={false}
                strokeColor="#faad14"
                size="small"
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* BIỂU ĐỒ CHÍNH */}
      <Row gutter={16}>
        {/* Biểu đồ Doanh thu */}
        <Col span={16}>
          <Card
            title="Phân tích Doanh thu & Học viên"
            variant="borderless"
            className="shadow-sm"
          >
            <div style={{ width: "100%", height: 350, minHeight: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    name="Doanh thu ($)"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="students"
                    name="Học viên"
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Biểu đồ Tròn */}
        <Col span={8}>
          <Card
            title="Cấu trúc khóa học"
            variant="borderless"
            className="shadow-sm"
          >
            <div style={{ width: "100%", height: 350, minHeight: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* BẢNG HOẠT ĐỘNG */}
      <Card
        title="Giao dịch gần đây"
        variant="borderless"
        className="shadow-sm"
      >
        <Table
          dataSource={[
            {
              key: "1",
              user: "Nguyễn Văn A",
              course: "ReactJS Master",
              date: "10:30 AM",
              status: "Success",
              amount: "$50",
            },
            {
              key: "2",
              user: "Trần Thị B",
              course: "NodeJS API",
              date: "09:15 AM",
              status: "Pending",
              amount: "$40",
            },
            {
              key: "3",
              user: "Lê Văn C",
              course: "Java Spring",
              date: "Yesterday",
              status: "Failed",
              amount: "$60",
            },
          ]}
          columns={[
            { title: "Học viên", dataIndex: "user", key: "user" },
            { title: "Khóa học", dataIndex: "course", key: "course" },
            { title: "Thời gian", dataIndex: "date", key: "date" },
            {
              title: "Trạng thái",
              dataIndex: "status",
              key: "status",
              render: (status) => (
                <Tag
                  color={
                    status === "Success"
                      ? "green"
                      : status === "Pending"
                      ? "orange"
                      : "red"
                  }
                >
                  {status.toUpperCase()}
                </Tag>
              ),
            },
            {
              title: "Số tiền",
              dataIndex: "amount",
              key: "amount",
              className: "font-bold",
            },
          ]}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
