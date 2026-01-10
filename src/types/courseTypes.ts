export interface CourseCreator {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

export interface CourseCategory {
  maDanhMucKhoahoc: string;
  tenDanhMucKhoaHoc: string;
}

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
