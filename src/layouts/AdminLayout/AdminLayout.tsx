import React, { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
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
  Drawer
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
  MenuOutlined
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
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "Quản lý người dùng",
      onClick: () => navigate("/admin/users"),
    },
    {
      key: "/admin/instructors",
      icon: <TeamOutlined />,
      label: "Quản lý giảng viên",
      onClick: () => navigate("/admin/instructors"),
    },
    {
      key: "/admin/courses",
      icon: <ReadOutlined />,
      label: "Quản lý khóa học",
      onClick: () => navigate("/admin/courses"),
    },
    {
      key: "/admin/transactions",
      icon: <DollarOutlined />,
      label: "Quản lý giao dịch",
      onClick: () => navigate("/admin/transactions"),
    },
    {
      key: "/admin/analytics",
      icon: <LineChartOutlined />,
      label: "Báo cáo & Phân tích",
      onClick: () => navigate("/admin/analytics"),
    },
    {
      key: "/admin/roles",
      icon: <SafetyCertificateOutlined />,
      label: "Hệ thống phân quyền",
      onClick: () => navigate("/admin/roles"),
    },
    {
      key: "/admin/settings",
      icon: <ToolOutlined />,
      label: "Cài đặt hệ thống",
      onClick: () => navigate("/admin/settings"),
    },
  ];

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

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
        <Drawer
          title={
            <span className={isDarkMode ? "text-white" : "text-indigo-600"}>
              CyberSoft
            </span>
          }
          placement="left"
          onClose={() => setIsDrawerVisible(false)}
          open={isDrawerVisible}
          width={250}
          styles={{ body: { padding: 0 } }}
          className="lg:hidden" 
        >
          <Menu
            theme={isDarkMode ? "dark" : "light"}
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={() => setIsDrawerVisible(false)}
          />
        </Drawer>
        <Sider
          width={250}
          theme={isDarkMode ? "dark" : "light"}
          collapsible
          breakpoint="lg"
          collapsedWidth="0" 
          trigger={null} 
          className={`hidden lg:block ${isDarkMode ? "" : "border-r border-gray-200"}`}
        >
          <div className="h-16 flex items-center justify-center border-b border-gray-700/10">
            <Link to="/">
              <span
                className={`font-bold text-xl tracking-wider ${
                  isDarkMode ? "text-white" : "text-indigo-600"
                }`}
              >
                CyberSoft
              </span>
            </Link>
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
            className="p-0 shadow-sm flex justify-between items-center px-4 md:px-6"
            style={{ background: isDarkMode ? "#001529" : "#fff" }}
          >
            <Button
              type="text"
              className="lg:hidden mr-2 flex items-center justify-center" // Chỉ hiện trên mobile
              icon={<MenuOutlined style={{ fontSize: '18px' }} />}
              onClick={() => setIsDrawerVisible(true)}
            />
            <div className="hidden sm:block w-full max-w-[300px]">
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Tìm kiếm bất cứ thứ gì..."
                variant="borderless"
                className="bg-gray-100 rounded-md hover:bg-gray-200 focus:bg-white transition-all"
              />
            </div>

            {/* CÁC CÔNG CỤ GÓC PHẢI */}
            <div className="flex items-center space-x-3 md:space-x-6">
              <Button
                type="text"
                icon={isDarkMode ? <SunOutlined className="text-yellow-400" /> : <MoonOutlined />}
                onClick={() => setIsDarkMode(!isDarkMode)}
              />
              
              {/* Ẩn bớt badge thông báo trên mobile nhỏ để tránh chật chội */}
              <Badge count={5} size="small" className="hidden xs:block">
                <Button type="text" icon={<BellOutlined style={{ fontSize: 20 }} />} />
              </Badge>

              <Dropdown menu={userMenu} placement="bottomRight" arrow>
                <div className="flex items-center cursor-pointer">
                  <Avatar className="bg-gradient-to-r from-indigo-500 to-purple-500" icon={<UserOutlined />} />
                  {/* Ẩn tên User trên mobile nhỏ, chỉ hiện trên màn hình md trở lên */}
                  <span className={`ml-2 font-medium hidden md:inline-block ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {currentUser?.hoTen || "Admin"}
                  </span>
                </div>
              </Dropdown>
            </div>
          </Header>

          <Content className="m-2 sm:m-4 lg:m-6">
            <div
              className={`p-4 sm:p-6 rounded-lg shadow-sm min-h-[80vh] ${
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
