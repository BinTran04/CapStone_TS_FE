import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { authService } from "../../services/authService";
import type { RegisterPayload } from "../../types/authTypes";

const schema = yup
  .object({
    taiKhoan: yup.string().required("Tài khoản không được để trống"),
    matKhau: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(6, "Mật khẩu phải từ 6 ký tự"),
    hoTen: yup.string().required("Họ tên không được để trống"),
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Email không hợp lệ"),
    soDT: yup
      .string()
      .required("Số điện thoại không được để trống")
      .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
    maNhom: yup.string().default("GP01"),
  })
  .required();

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      maNhom: "GP01",
    },
  });

  const onSubmit = async (values: RegisterPayload) => {
    try {
      await authService.register(values);
      message.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error: any) {
      message.error(error.response?.data || "Đăng ký thất bại");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Đăng Ký</h2>
          <p className="mt-2 text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Tài khoản */}
          <div>
            <input
              {...register("taiKhoan")}
              placeholder="Tài khoản"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.taiKhoan && (
              <p className="text-red-500 text-xs mt-1">
                {errors.taiKhoan.message}
              </p>
            )}
          </div>

          {/* Mật khẩu */}
          <div>
            <input
              type="password"
              {...register("matKhau")}
              placeholder="Mật khẩu"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.matKhau && (
              <p className="text-red-500 text-xs mt-1">
                {errors.matKhau.message}
              </p>
            )}
          </div>

          {/* Họ tên */}
          <div>
            <input
              {...register("hoTen")}
              placeholder="Họ tên"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.hoTen && (
              <p className="text-red-500 text-xs mt-1">
                {errors.hoTen.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Số điện thoại */}
          <div>
            <input
              {...register("soDT")}
              placeholder="Số điện thoại"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.soDT && (
              <p className="text-red-500 text-xs mt-1">{errors.soDT.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
