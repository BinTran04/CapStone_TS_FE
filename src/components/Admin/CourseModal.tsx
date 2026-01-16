import React, { useEffect, useState } from "react";
import { Modal, message, Upload, DatePicker, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { courseService } from "../../services/courseService";
import { useAppSelector } from "../../store/store";
import type { Course, CourseCategory } from "./../../types/courseTypes";

interface CouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentCourse: Course | null;
}

const schema = yup
  .object({
    maKhoaHoc: yup.string().required("Mã khóa học là bắt buộc"),
    tenKhoaHoc: yup.string().required("Tên khóa học là bắt buộc"),
    biDanh: yup.string().required("Bí danh là bắt buộc"),
    moTa: yup.string().required("Mô tả là bắt buộc"),
    hinhAnh: yup.mixed().required("Hình ảnh là bắt buộc"),
    maDanhMucKhoaHoc: yup.string().required("Danh mục là bắt buộc"),
  })
  .required();

const CourseModal: React.FC<CouseModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentCourse,
}) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      maKhoaHoc: "",
      tenKhoaHoc: "",
      biDanh: "",
      moTa: "",
      maDanhMucKhoaHoc: "",
    },
  });

  // Lấy danh mục khóa học để đổ vào Select
  useEffect(() => {
    courseService.getCourseCategories().then((res) => setCategories(res.data));
  }, []);

  // Đổ dữ liệu khi sửa
  useEffect(() => {
    if (currentCourse) {
      setValue("maKhoaHoc", currentCourse.maKhoaHoc);
      setValue("tenKhoaHoc", currentCourse.tenKhoaHoc);
      setValue("biDanh", currentCourse.biDanh);
      setValue("moTa", currentCourse.moTa);
      setValue("maDanhMucKhoaHoc", currentCourse.danhMucKhoaHoc.maDanhMuc);

      // Hiển thị ảnh cũ trong Upload component
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: currentCourse.hinhAnh,
        },
      ]);
      // Bypass validation hình ảnh khi đang sửa
      setValue("hinhAnh", "old_image");
    } else {
      reset();
      setFileList([]);
    }
  }, [currentCourse, isOpen, reset, setValue]);

  const onSubmit = async (values: any) => {
    const formData = new FormData();

    formData.append("maKhoaHoc", values.maKhoaHoc);
    formData.append("tenKhoaHoc", values.tenKhoaHoc);
    formData.append("alias", values.biDanh);
    formData.append("moTa", values.moTa);
    formData.append("maNhom", "GP01");
    formData.append("ngayTao", dayjs().format("DD/MM/YYYY"));
    formData.append("maDanhMucKhoaHoc", values.maDanhMucKhoaHoc);
    formData.append("taiKhoanNguoiTao", currentUser?.taiKhoan || "");
    formData.append("luotXem", "0");
    formData.append("danhGia", "0");

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("frm", fileList[0].originFileObj);
    } else if (currentCourse) {
    } else {
      message.error("Vui lòng chọn hình ảnh!");
      return;
    }
    try {
      if (currentCourse) {
        await courseService.updateCourseUpload(formData);
        message.success("Cập nhật khóa học thành công!");
      } else {
        await courseService.addCourseUpload(formData);
        message.success("Thêm khóa học thành công!");
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      message.error(error.response?.data || "Có lỗi xảy ra!");
    }
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setValue("hinhAnh", fileList[0].originFileObj);
    } else {
      setValue("hinhAnh", null as any);
    }
  };

  return (
    <Modal
      title={currentCourse ? "Cập Nhật Khóa Học" : "Thêm Khóa Học"}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800} // Modal to hơn chút cho dễ soạn thảo
      style={{ top: 20 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Mã khóa học */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mã khóa học
            </label>
            <input
              {...register("maKhoaHoc")}
              disabled={!!currentCourse} // Không cho sửa mã
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.maKhoaHoc && (
              <p className="text-red-500 text-xs">
                {errors.maKhoaHoc.message as string}
              </p>
            )}
          </div>

          {/* Tên khóa học */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên khóa học
            </label>
            <input
              {...register("tenKhoaHoc")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.tenKhoaHoc && (
              <p className="text-red-500 text-xs">
                {errors.tenKhoaHoc.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Bí danh */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bí danh
            </label>
            <input
              {...register("biDanh")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.biDanh && (
              <p className="text-red-500 text-xs">
                {errors.biDanh.message as string}
              </p>
            )}
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Danh mục
            </label>
            <select
              {...register("maDanhMucKhoaHoc")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.maDanhMuc} value={cat.maDanhMuc}>
                  {cat.tenDanhMuc}
                </option>
              ))}
            </select>
            {errors.maDanhMucKhoaHoc && (
              <p className="text-red-500 text-xs">
                {errors.maDanhMucKhoaHoc.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Upload Hình Ảnh */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh
          </label>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false} // Chặn auto upload
            maxCount={1}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
          {errors.hinhAnh && (
            <p className="text-red-500 text-xs">Vui lòng chọn ảnh</p>
          )}
        </div>

        {/* Mô tả - CKEditor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả
          </label>
          <Controller
            name="moTa"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CKEditor
                editor={ClassicEditor as any}
                data={value || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  onChange(data);
                }}
              />
            )}
          />
          {errors.moTa && (
            <p className="text-red-500 text-xs">
              {errors.moTa.message as string}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {currentCourse ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CourseModal;
