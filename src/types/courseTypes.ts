// Định nghĩa người tạo khóa học
export interface CourseCreator {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

export interface CourseCategory {
  maDanhMuc?: string;
  tenDanhMuc?: string;

  maDanhMucKhoahoc?: string;
  tenDanhMucKhoaHoc?: string;
}

// Định nghĩa khóa học
export interface Course {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: CourseCreator;
  danhMucKhoaHoc: CourseCategory;
}
