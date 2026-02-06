// Định nghĩa cấu trúc khóa học trong danh sách đã đăng ký
export interface RegisteredCourse {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: string;
  danhGia: number;
}

// Định nghĩa thông tin tài khoản cá nhân
export interface UserInfo {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
  chiTietKhoaHocGhiDanh: RegisteredCourse[];
}

// Định nghĩa User cho trang Admin
export interface UserAdmin {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung?: string;
}

// interface cũ nếu cần tương thích ngược (Alias)
export type UserProfile = UserInfo;
export type CourseUser = RegisteredCourse;
