import { http } from "./axiosConfig";
import type { Course, CourseCategory } from "../types/courseTypes";

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
};
