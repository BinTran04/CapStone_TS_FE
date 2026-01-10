import { http } from "./axiosConfig";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "./../types/authTypes";

export const authService = {
  login: (payload: LoginPayload) => {
    return http.post<LoginResponse>("/QuanLyNguoiDung/DangNhap", payload);
  },

  register: (payload: RegisterPayload) => {
    return http.post<RegisterResponse>("/QuanLyNguoiDung/DangKy", payload);
  },
};
