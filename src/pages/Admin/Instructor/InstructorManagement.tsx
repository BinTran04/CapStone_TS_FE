import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Input,
  Avatar,
  Tag,
  Rate,
  Button,
  Drawer,
  Typography,
  Statistic,
  List,
  Progress,
  Divider,
} from "antd";
import {
  SearchOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  BookOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { instructorData, type Instructor } from "./../../../mockData/mockData";

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;

const InstructorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  // Filter logic
  const filteredData = instructorData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showDetails = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setOpenDrawer(true);
  };

  const closeDetails = () => {
    setOpenDrawer(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER & TOOLBAR */}
      <div className="flex justify-between items-center">
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>
            Quản Lý Giảng Viên
          </Title>
          <Text type="secondary">Theo dõi hồ sơ và hiệu suất giảng dạy</Text>
        </div>
        <Button type="primary" size="large" icon={<UserAddOutlined />}>
          Thêm giảng viên
        </Button>
      </div>

      <Input
        placeholder="Tìm kiếm giảng viên..."
        prefix={<SearchOutlined className="text-gray-400" />}
        size="large"
        className="max-w-md shadow-sm"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* GRID VIEW GIẢNG VIÊN */}
      <Row gutter={[24, 24]}>
        {filteredData.map((instructor) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={instructor.id}>
            <Card
              hoverable
              className="shadow-sm rounded-xl overflow-hidden group"
              cover={
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                    <Avatar
                      src={instructor.avatar}
                      size={80}
                      className="border-4 border-white shadow-md"
                    />
                  </div>
                </div>
              }
              actions={[
                <div key="students" className="text-gray-500">
                  <TeamOutlined /> {instructor.totalStudents}
                </div>,
                <div key="courses" className="text-gray-500">
                  <BookOutlined /> {instructor.coursesCount}
                </div>,
                <div key="rating" className="text-yellow-500 font-bold">
                  {instructor.rating} ★
                </div>,
              ]}
              onClick={() => showDetails(instructor)}
            >
              <div className="mt-8 text-center">
                <Title level={4} style={{ marginBottom: 4 }}>
                  {instructor.name}
                </Title>
                <Tag color="geekblue" className="mb-4">
                  {instructor.specialty}
                </Tag>
                <Paragraph
                  ellipsis={{ rows: 2 }}
                  className="text-gray-500 text-sm px-2"
                >
                  {instructor.bio}
                </Paragraph>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* SLIDE-OVER */}
      <Drawer
        width={640}
        placement="right"
        onClose={closeDetails}
        open={openDrawer}
        title="Hồ sơ giảng viên chi tiết"
      >
        {selectedInstructor && (
          <div className="space-y-8">
            {/* Header Info */}
            <div className="flex items-start gap-4">
              <Avatar
                src={selectedInstructor.avatar}
                size={100}
                shape="square"
                className="rounded-lg"
              />
              <div>
                <Title level={3} style={{ marginBottom: 0 }}>
                  {selectedInstructor.name}
                </Title>
                <Tag color="purple" className="mt-1 mb-2 text-base px-3 py-1">
                  {selectedInstructor.specialty}
                </Tag>
                <div className="space-y-1 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MailOutlined /> {selectedInstructor.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneOutlined /> {selectedInstructor.phone}
                  </div>
                </div>
              </div>
            </div>

            <Divider />

            {/* Key Metrics */}
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small" className="bg-blue-50 border-blue-100">
                  <Statistic
                    title="Tổng học viên"
                    value={selectedInstructor.totalStudents}
                    prefix={<TeamOutlined className="text-blue-500" />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" className="bg-yellow-50 border-yellow-100">
                  <Statistic
                    title="Đánh giá TB"
                    value={selectedInstructor.rating}
                    precision={1}
                    suffix="/ 5"
                    prefix={
                      <Rate
                        disabled
                        defaultValue={1}
                        count={1}
                        className="text-yellow-500 text-lg"
                      />
                    }
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" className="bg-green-50 border-green-100">
                  <Statistic
                    title="Hoàn thành"
                    value={selectedInstructor.completionRate}
                    suffix="%"
                    prefix={<CheckCircleOutlined className="text-green-500" />}
                  />
                </Card>
              </Col>
            </Row>

            {/* Performance Chart */}
            <div>
              <Title level={5}>
                <RiseOutlined /> Hiệu suất giảng dạy (4 tháng gần nhất)
              </Title>
              <div className="h-64 mt-4 p-4 border rounded-lg bg-gray-50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedInstructor.performanceData}>
                    <defs>
                      <linearGradient
                        id="colorStudents"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorStudents)"
                      name="Học viên mới"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Course List */}
            <div>
              <Title level={5}>
                <BookOutlined /> Các khóa học đang phụ trách
              </Title>
              <List
                itemLayout="horizontal"
                dataSource={selectedInstructor.courses}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: "#fde3cf",
                            color: "#f56a00",
                          }}
                        >
                          K
                        </Avatar>
                      }
                      title={<span className="font-medium">{item.name}</span>}
                      description={
                        <div className="flex gap-4 text-xs">
                          <span>{item.students} học viên</span>
                          <span className="text-yellow-500">
                            ★ {item.rating}
                          </span>
                        </div>
                      }
                    />
                    <Button size="small">Chi tiết</Button>
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default InstructorManagement;
