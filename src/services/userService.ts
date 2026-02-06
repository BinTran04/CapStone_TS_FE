import { http } from "./axiosConfig";
import type { UserAdmin, UserInfo, CourseUser } from "../types/userTypes";
import type { RegisterPayload } from "../types/authTypes";
import type { Course } from "../types/courseTypes";

export const userService = {
  getUserInfo: () => {
    return http.post<UserInfo>("/QuanLyNguoiDung/ThongTinTaiKhoan");
  },

  updateUserInfo: (data: any) => {
    return http.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  },

  getUserList: () => {
    return http.get<UserAdmin[]>(
      "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
    );
  },

  searchUser: (tuKhoa: string) => {
    return http.get<UserAdmin[]>(
      `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`,
    );
  },

  deleteUser: (taiKhoan: string) => {
    return http.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  },

  addUser: (payload: RegisterPayload) => {
    return http.post("/QuanLyNguoiDung/ThemNguoiDung", payload);
  },

  updateUser: (payload: any) => {
    return http.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload);
  },

  registerCourse: (data: { maKhoaHoc: string; taiKhoan: string }) => {
    return http.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data);
  },

  cancelRegistration: (data: { maKhoaHoc: string; taiKhoan: string }) => {
    return http.post("/QuanLyKhoaHoc/HuyGhiDanh", data);
  },

  getUnregisteredCourses: (taiKhoan: string) => {
    return http.post<Course[]>(
      `/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${taiKhoan}`,
    );
  },

  getRegisteredCourses: (taiKhoan: string) => {
    return http.post<CourseUser[]>(
      "/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
      {
        taiKhoan: taiKhoan,
      },
    );
  },

  getApprovedCourses: (taiKhoan: string) => {
    return http.post<CourseUser[]>(
      "/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
      { taiKhoan },
    );
  },

  getUnenrolledUsers: (maKhoaHoc: string) => {
    return http.post<UserAdmin[]>(
      "/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh",
      { maKhoaHoc },
    );
  },

  getEnrolledStudents: (maKhoaHoc: string) => {
    return http.post<UserAdmin[]>(
      "/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc",
      { maKhoaHoc },
    );
  },
};
