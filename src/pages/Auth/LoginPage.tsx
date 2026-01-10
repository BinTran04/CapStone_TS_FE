import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { loginThunk } from "../../store/slices/authSlice";
import type { LoginPayload } from "../../types/authTypes";

const schema = yup
  .object({
    taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
    matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
  })
  .required();

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      message.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error: any) {
      message.error(typeof error === "string" ? error : "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden flex">
        <div className="hidden md:block w-1/2 bg-indigo-600">
          <div className="h-full flex flex-col justify-center items-center text-white p-8">
            <h2 className="text-3xl font-bold mb-4">CyberSoft E-Learning</h2>
            <p>Khởi đầu sự nghiệp lập trình của bạn ngay hôm nay.</p>
          </div>
        </div>

        {/* Cột Phải: Form Đăng Nhập */}
        <div className="w-full md:w-1/2 p-8 space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Đăng nhập
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              hoặc{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                đăng ký tài khoản mới
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Field Tài Khoản */}
            <div>
              <label
                htmlFor="taiKhoan"
                className="block text-sm font-medium text-gray-700"
              >
                Tài khoản
              </label>
              <input
                id="taiKhoan"
                type="text"
                {...register("taiKhoan")}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.taiKhoan ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.taiKhoan && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.taiKhoan.message}
                </p>
              )}
            </div>

            {/* Field Mật Khẩu */}
            <div>
              <label
                htmlFor="matKhau"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <input
                id="matKhau"
                type="password"
                {...register("matKhau")}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.matKhau ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.matKhau && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.matKhau.message}
                </p>
              )}
            </div>

            {/* Hiển thị lỗi từ API nếu có */}
            {error && (
              <div className="text-red-600 text-center text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
