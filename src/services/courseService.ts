import { http } from "./axiosConfig";
import type { Course, CourseCategory } from "../types/courseTypes";

export const courseService = {
  getCourseCategories: () => {
    return http.get<CourseCategory[]>("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },

  getCourseList: (tenKhoaHoc: string = "") => {
    if (tenKhoaHoc.trim() !== "") {
      return http.get<Course[]>(
        `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP01`,
      );
    }
    return http.get<Course[]>("/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01");
  },

  getCoursesByCategory: (maDanhMuc: string) => {
    return http.get<Course[]>(
      `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`,
    );
  },

  getCourseDetail: (maKhoaHoc: string) => {
    return http.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
  },

  deleteCourse: (maKhoaHoc: string) => {
    return http.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`);
  },

  addCourse: (formData: FormData) => {
    return http.post("/QuanLyKhoaHoc/ThemKhoaHocUploadHinh", formData);
  },

  updateCourse: (formData: FormData) => {
    return http.post("/QuanLyKhoaHoc/CapNhatKhoaHocUpload", formData);
  },

  registerCourse: (data: { maKhoaHoc: string; taiKhoan: string }) => {
    return http.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data);
  },
};
