import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { logout } from "../../../store/slices/authSlice";
import { courseService } from "../../../services/courseService";
import type { CourseCategory } from "../../../types/courseTypes";
import { message, Dropdown, type MenuProps, Space, Button, Badge } from "antd"; // Thêm Badge
import {
  DownOutlined,
  UserOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  // --- Lấy số lượng giỏ hàng từ Redux ---
  const { cartItems } = useAppSelector((state) => state.cart);

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
  const categoryItems: MenuProps["items"] = categories.map((cat, index) => {
    const catName = cat.tenDanhMuc || cat.tenDanhMucKhoaHoc || "Danh mục khác";
    const catId = cat.maDanhMuc || cat.maDanhMucKhoahoc || `cat_${index}`;
    return {
      key: catId,
      label: <Link to={`/search?category=${catId}`}>{catName}</Link>,
    };
  });

  // Dropdown Menu User
  const userItems: MenuProps["items"] = [
    {
      key: "info",
      label: <Link to="/profile">Thông tin cá nhân</Link>,
      icon: <UserOutlined />,
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
    <header className="bg-white shadow-md sticky top-0 z-50 h-16 flex items-center font-sans">
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="Logo"
            className="h-8 sm:h-9 object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* DANH MỤC */}
        <div className="hidden md:flex items-center ml-6 uppercase font-semibold text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer text-sm tracking-wide">
          <Dropdown menu={{ items: categoryItems }} trigger={["hover"]}>
            <Space>
              <span className="hover:text-indigo-600 transition-colors">
                Danh mục
              </span>
              <DownOutlined className="text-xs" />
            </Space>
          </Dropdown>
        </div>

        <div className="hidden md:flex flex-1 mx-8 max-w-xl relative"></div>

        {/* USER ACTIONS */}
        <div className="flex items-center gap-4">
          <Link to="/cart">
            <div className="mr-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors relative flex items-center justify-center">
              <Badge
                count={cartItems.length}
                showZero
                size="small"
                offset={[0, 0]}
              >
                <ShoppingCartOutlined className="text-2xl text-gray-600" />
              </Badge>
            </div>
          </Link>

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
