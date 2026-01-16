import Reac, { useEffect } from "react";
import { Modal, message } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userService } from "../../services/userService";
import type { UserAdmin } from "../../types/userTypes";
import type { RegisterPayload } from "../../types/authTypes";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentUser: UserAdmin | null; // Nếu null -> Mode Thêm, Ngược lại -> Mode Sửa
}

const schema = yup
  .object({
    taiKhoan: yup.string().required("Tài khoản là bắt buộc"),
    matKhau: yup
      .string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu ít nhất 6 ký tự"),
    hoTen: yup.string().required("Họ tên là bắt buộc"),
    email: yup
      .string()
      .required("Email là bắt buộc")
      .email("Email không hợp lệ"),
    soDt: yup
      .string()
      .required("Số điện thoại là bắt buộc")
      .matches(/^[0-9]+$/, "SĐT chỉ chứa số"),
    maLoaiNguoiDung: yup.string().required("Vui lòng chọn loại người dùng"),
    maNhom: yup.string().default("GP01"),
  })
  .required();

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentUser,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { maNhom: "GP01", maLoaiNguoiDung: "HV" },
  });

  useEffect(() => {
    if (currentUser) {
      setValue("taiKhoan", currentUser.taiKhoan);
      setValue("hoTen", currentUser.hoTen);
      setValue("email", currentUser.email);
      setValue("soDt", currentUser.soDt);
      setValue("maLoaiNguoiDung", currentUser.maLoaiNguoiDung);
      setValue("matKhau", "");
    } else {
      reset({
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        email: "",
        soDt: "",
        maLoaiNguoiDung: "HV",
        maNhom: "GP01",
      });
    }
  }, [currentUser, isOpen, reset, setValue]);

  const onSubmit = async (values: any) => {
    try {
      if (currentUser) {
        await userService.updateUser(values);
        message.success("Cập nhật thành công!");
      } else {
        const payload: RegisterPayload = {
          ...values,
          soDT: values.soDt,
        };
        await userService.addUser(payload);
        message.success("Thêm người dùng thành công!");
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      message.error(error.response?.data || "Có lỗi xảy ra!");
    }
  };
  return (
    <Modal
      title={currentUser ? "Cập Nhật Người Dùng" : "Thêm Người Dùng"}
      open={isOpen}
      onCancel={onClose}
      footer={null} // Tắt footer mặc định để dùng nút submit của form
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {/* Tài khoản */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tài khoản
          </label>
          <input
            {...register("taiKhoan")}
            disabled={!!currentUser} // Disable khi đang sửa (không được sửa khóa chính)
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.taiKhoan ? "border-red-500" : "border-gray-300"
            } ${currentUser ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
          {errors.taiKhoan && (
            <p className="text-red-500 text-xs mt-1">
              {errors.taiKhoan.message}
            </p>
          )}
        </div>

        {/* Mật khẩu */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            {...register("matKhau")}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.matKhau ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.matKhau && (
            <p className="text-red-500 text-xs mt-1">
              {errors.matKhau.message}
            </p>
          )}
        </div>

        {/* Họ tên */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Họ tên
          </label>
          <input
            {...register("hoTen")}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.hoTen ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.hoTen && (
            <p className="text-red-500 text-xs mt-1">{errors.hoTen.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            {...register("soDt")}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.soDt ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.soDt && (
            <p className="text-red-500 text-xs mt-1">{errors.soDt.message}</p>
          )}
        </div>

        {/* Loại người dùng */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loại người dùng
          </label>
          <select
            {...register("maLoaiNguoiDung")}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="HV">Học viên</option>
            <option value="GV">Giáo vụ</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-gray-400"
          >
            {currentUser ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;
