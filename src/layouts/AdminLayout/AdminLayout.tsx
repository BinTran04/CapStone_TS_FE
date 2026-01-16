import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  message,
  ConfigProvider,
  theme,
  Input,
  Badge,
  Button,
} from "antd";
import {
  UserOutlined,
  ReadOutlined,
  DashboardOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  MoonOutlined,
  SunOutlined,
  DollarOutlined,
  LineChartOutlined,
  ToolOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logout } from "../../store/slices/authSlice";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  // State quản lý Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    message.success("Đã đăng xuất");
    navigate("/login");
  };

  const userMenu = {
    items: [
      {
        key: "profile",
        label: "Cập nhật thông tin",
        icon: <SettingOutlined />,
      },
      {
        key: "logout",
        label: "Đăng xuất",
        icon: <LogoutOutlined />,
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "/admin/quan-ly-nguoi-dung",
      icon: <UserOutlined />,
      label: "Quản lý người dùng",
      onClick: () => navigate("/admin/quan-ly-nguoi-dung"),
    },

    {
      key: "/admin/quan-ly-giang-vien",
      icon: <TeamOutlined />,
      label: "Quản lý giảng viên",
      onClick: () => navigate("/admin/quan-ly-giang-vien"),
    },
    {
      key: "/admin/quan-ly-khoa-hoc",
      icon: <ReadOutlined />,
      label: "Quản lý khóa học",
      onClick: () => navigate("/admin/quan-ly-khoa-hoc"),
    },
    {
      key: "/admin/quan-ly-giao-dich",
      icon: <DollarOutlined />,
      label: "Quản lý giao dịch",
      onClick: () => navigate("/admin/quan-ly-giao-dich"),
    },
    {
      key: "/admin/bao-cao",
      icon: <LineChartOutlined />,
      label: "Báo cáo & Phân tích",
      onClick: () => navigate("/admin/bao-cao"),
    },
    {
      key: "/admin/cai-dat",
      icon: <ToolOutlined />,
      label: "Cài đặt hệ thống",
      onClick: () => navigate("/admin/cai-dat"),
    },
    {
      key: "/admin/phan-quyen",
      icon: <SafetyCertificateOutlined />,
      label: "Hệ thống phân quyền",
      onClick: () => navigate("/admin/phan-quyen"),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#4f46e5",
        },
      }}
    >
      <Layout className="min-h-screen">
        <Sider
          width={250}
          theme={isDarkMode ? "dark" : "light"}
          collapsible
          breakpoint="lg"
          className={isDarkMode ? "" : "border-r border-gray-200"}
        >
          <div className="h-16 flex items-center justify-center border-b border-gray-700/10">
            <span
              className={`font-bold text-xl tracking-wider ${
                isDarkMode ? "text-white" : "text-indigo-600"
              }`}
            >
              CyberSoft
            </span>
          </div>
          <Menu
            theme={isDarkMode ? "dark" : "light"}
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={menuItems}
            className="mt-4 border-none"
          />
        </Sider>

        <Layout>
          {/* Header */}
          <Header
            className="p-0 shadow-sm flex justify-between items-center px-6"
            style={{ background: isDarkMode ? "#001529" : "#fff" }}
          >
            {/* Thanh Search Global */}
            <div className="w-1/3">
              {/* SỬA LỖI: bordered={false} -> variant="borderless" */}
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Tìm kiếm bất cứ thứ gì..."
                variant="borderless"
                className="bg-gray-100 rounded-md hover:bg-gray-200 focus:bg-white transition-all"
              />
            </div>

            {/* Các công cụ góc phải */}
            <div className="flex items-center space-x-6">
              <Button
                type="text"
                icon={
                  isDarkMode ? (
                    <SunOutlined className="text-yellow-400" />
                  ) : (
                    <MoonOutlined />
                  )
                }
                onClick={() => setIsDarkMode(!isDarkMode)}
              />

              <Badge count={5} size="small">
                <Button
                  type="text"
                  icon={<BellOutlined style={{ fontSize: 20 }} />}
                />
              </Badge>

              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                <Dropdown menu={userMenu} placement="bottomRight" arrow>
                  <div className="flex items-center">
                    <Avatar
                      size="large"
                      className="bg-gradient-to-r from-indigo-500 to-purple-500"
                      icon={<UserOutlined />}
                    />
                    <span
                      className={`ml-3 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {currentUser?.hoTen || "Admin"}
                    </span>
                  </div>
                </Dropdown>
              </div>
            </div>
          </Header>

          <Content className="m-6">
            <div
              className={`p-6 rounded-lg shadow-sm min-h-[80vh] ${
                isDarkMode ? "bg-[#141414]" : "bg-white"
              }`}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;
