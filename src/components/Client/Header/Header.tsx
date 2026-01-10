import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { logout } from "../../../store/slices/authSlice";
import { courseService } from "../../../services/courseService";
import type { CourseCategory } from "../../../types/courseTypes";
import { message, Dropdown, type MenuProps, Space, Button } from "antd";
import { DownOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const [categories, setCategories] = useState<CourseCategory[]>([]);

  // Gọi API lấy danh mục khóa học khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await courseService.getCourseCategories();
        setCategories(res.data);
      } catch (err) {
        console.log("Lỗi lấy danh mục: ", err);
      }
    };
    fetchCategories();
  }, []);

  // Xử lý Đăng xuất
  const handleLogout = () => {
    dispatch(logout());
    message.success("Đã đăng xuất!");
    navigate("/login");
  };

  // Dropdown Menu Danh mục
  const categoryItems: MenuProps["items"] = categories.map((cat) => ({
    key: cat.maDanhMucKhoahoc,
    label: (
      <Link to={`/danhmuc/${cat.maDanhMucKhoahoc}`}>
        {cat.tenDanhMucKhoaHoc}
      </Link>
    ),
  }));

  const userItems: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link to="/thong-tin-ca-nhan">Thông tin cá nhân</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "admin",
      label:
        currentUser?.maLoaiNguoiDung === "GV" ? (
          <Link to="/admin">Trang quản trị</Link>
        ) : null,
      disabled: currentUser?.maLoaiNguoiDung !== "GV",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LoginOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        {/* 1. Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
            C
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            CyberSoft
          </span>
        </Link>

        {/* 2. Navigation Menu (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Dropdown Danh mục */}
          <Dropdown
            menu={{ items: categoryItems }}
            trigger={["click", "hover"]}
          >
            <a
              onClick={(e) => e.preventDefault()}
              className="text-gray-600 hover:text-indigo-600 font-medium cursor-pointer transition-colors flex items-center gap-1"
            >
              <i className="fa fa-th-large"></i> Danh mục{" "}
              <DownOutlined style={{ fontSize: "10px" }} />
            </a>
          </Dropdown>

          {/* Static Links */}
          <Link
            to="/khoa-hoc"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Khóa học
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Về chúng tôi
          </Link>
        </div>

        {/* 3. Search & Auth */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block relative group">
            <input
              type="text"
              placeholder="Tìm khóa học..."
              className="border border-gray-200 bg-gray-50 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 w-64 transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500">
              🔍
            </span>
          </div>

          {currentUser ? (
            <Dropdown menu={{ items: userItems }} placement="bottomRight" arrow>
              <div className="flex items-center cursor-pointer gap-2 hover:bg-gray-50 p-1 rounded-full pr-3 transition-colors">
                <img
                  src={`https://ui-avatars.com/api/?name=${currentUser.hoTen}&background=6366f1&color=fff`}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden sm:block text-gray-700 font-medium text-sm truncate max-w-[100px]">
                  {currentUser.hoTen}
                </span>
              </div>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  type="text"
                  className="font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  type="primary"
                  className="bg-indigo-600 hover:bg-indigo-700 font-medium shadow-md shadow-indigo-200 border-none rounded-full px-6"
                >
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
