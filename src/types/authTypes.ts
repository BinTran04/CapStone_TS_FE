// Các kiểu dữ liệu liên quan đến việc Xác thực

// Định nghĩa các hằng số Role
export type UserRole = "HV" | "GV";

// Interface cho việc gửi dữ liệu Đăng Nhập (Request)
export interface LoginPayload {
  taiKhoan: string;
  matKhau: string;
}

// Interface cho kết quả Đăng Nhập trả về (Response)
export interface LoginResponse {
  taiKhoan: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
  accessToken: string;
}

// Interface cho việc gửi dữ liệu Đăng Ký (Request)
export interface RegisterPayload {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
}

// Interface cho kết quả Đăng Ký trả về (Response)
export interface RegisterResponse {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
}
