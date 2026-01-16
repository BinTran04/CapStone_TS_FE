import { http } from "./axiosConfig";
import type { UserAdmin, UserProfile } from "../types/userTypes";
import type { Course } from "../types/courseTypes";
import type { CourseUser } from "../types/userTypes";
import type { RegisterPayload } from "../types/authTypes";
import RegisterPage from "../pages/Auth/RegisterPage";

export const userService = {
  getUserList: () => {
    // Lấy danh sách người dùng
    return http.get<UserAdmin[]>(
      `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`
    );
  },

  // Tìm kiếm người dùng
  searchUser: (tuKhoa: string) => {
    return http.get<UserAdmin[]>(
      `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`
    );
  },

  // Xóa người dùng
  deleteUser: (taiKhoan: string) => {
    return http.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  },

  // Thêm người dùng
  addUser: (payload: RegisterPayload) => {
    return http.post(`/QuanLyNguoiDung/ThemNguoiDung`, payload);
  },

  // Cập nhật thông tin người dùng
  updateUser: (payload: UserAdmin) => {
    return http.put(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, payload);
  },

  getUserDetail: (taiKhoan: string) => {
    return http.post<UserProfile>(
      `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
    );
  },
  getUnregisteredCourses: (taiKhoan: string) => {
    return http.post<Course[]>(
      `/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${taiKhoan}`
    );
  },
  getRegisteredCourses: (taiKhoan: string) => {
    return http.post<CourseUser[]>(
      "/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
      { taiKhoan: taiKhoan }
    );
  },
  registerCourse: (payload: { maKhoaHoc: string; taiKhoan: string }) => {
    return http.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", payload);
  },
  cancelCourse: (payload: { maKhoaHoc: string; taiKhoan: string }) => {
    return http.post("/QuanLyKhoaHoc/HuyGhiDanh", payload);
  },
  getUnenrolledUsers: (maKhoaHoc: string) => {
    return http.post<UserAdmin[]>(
      "/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh",
      {
        maKhoaHoc: maKhoaHoc,
      }
    );
  },
};
