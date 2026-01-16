// Thông tin chi tiết về người dùng và lịch sử khóa học.

export interface CourseUser {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  hinhAnh: string;
  ngayTao: string;
  danhGia: number;
}

export interface UserProfile {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
  chiTietKhoaHocGhiDanh: CourseUser[];
}

export interface UserAdmin {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: "GV" | "HV";
  matKhau?: string;
}
