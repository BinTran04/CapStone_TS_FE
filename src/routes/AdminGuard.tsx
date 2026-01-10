import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./../store/store";
import { message } from "antd";

const AdminGuard: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  // Chưa đăng nhập -> Đẩy về login
  if (!currentUser) {
    message.warning("Vui lòng đăng nhập để truy cập quản trị!");
    return <Navigate to="/login" />;
  }

  // Đã đăng nhập nhưng không phải Giáo vụ (GV) -> Đẩy về trang chủ
  if (currentUser.maLoaiNguoiDung !== "GV") {
    message.error("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/" />;
  }

  // Hợp lệ -> Cho phép đi tiếp
  return <Outlet />;
};

export default AdminGuard;
