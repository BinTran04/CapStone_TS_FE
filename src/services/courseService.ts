import { http } from "./axiosConfig";
import type { Course, CourseCategory } from "../types/courseTypes";
import type { UserAdmin } from "../types/userTypes";

export const courseService = {
  getCourseCategories: () => {
    return http.get<CourseCategory[]>("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
  getCourseList: () => {
    return http.get<Course[]>("/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01");
  },
  getCourseDetail: (maKhoaHoc: string) => {
    return http.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
  },
  deleteCourse: (maKhoaHoc: string) => {
    return http.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`);
  },

  // --- SỬA: XÓA HEADERS ĐỂ AXIOS TỰ XỬ LÝ ---
  addCourseUpload: (formData: FormData) => {
    return http.post("/QuanLyKhoaHoc/ThemKhoaHocUploadHinh", formData);
  },

  updateCourseUpload: (formData: FormData) => {
    return http.post("/QuanLyKhoaHoc/CapNhatKhoaHocUpload", formData);
  },

  getStudentsByCourse: (maKhoaHoc: string) => {
    return http.get<UserAdmin[]>(
      `/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?MaKhoaHoc=${maKhoaHoc}`
    );
  },
};
