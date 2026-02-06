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
import type { Course, CourseCategory } from "../../types/courseTypes";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentCourse: Course | null;
}

const schema = yup.object({
  maKhoaHoc: yup.string().required("Mã khóa học là bắt buộc"),
  tenKhoaHoc: yup.string().required("Tên khóa học là bắt buộc"),
  biDanh: yup.string().required("Bí danh là bắt buộc"),
  moTa: yup.string().required("Mô tả là bắt buộc"),
  hinhAnh: yup.mixed().required("Hình ảnh là bắt buộc"),
  maDanhMucKhoaHoc: yup.string().required("Danh mục là bắt buộc"),
  ngayTao: yup.string().required("Ngày tạo là bắt buộc"),
});

const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentCourse,
}) => {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Lấy danh sách danh mục khi Modal được mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await courseService.getCourseCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh mục", err);
      }
    };
    fetchCategories();
  }, []);

  // Điền dữ liệu khi Sửa
  useEffect(() => {
    if (currentCourse) {
      setValue("maKhoaHoc", currentCourse.maKhoaHoc);
      setValue("tenKhoaHoc", currentCourse.tenKhoaHoc);
      setValue("biDanh", currentCourse.biDanh);
      setValue("moTa", currentCourse.moTa);
      setValue(
        "maDanhMucKhoaHoc",
        currentCourse.danhMucKhoaHoc?.maDanhMucKhoahoc || "",
      );
      setValue("ngayTao", currentCourse.ngayTao);
      setValue("hinhAnh", currentCourse.hinhAnh);

      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: currentCourse.hinhAnh,
        },
      ]);
    } else {
      reset({
        maKhoaHoc: "",
        tenKhoaHoc: "",
        biDanh: "",
        moTa: "",
        maDanhMucKhoaHoc: "",
        ngayTao: dayjs().format("DD/MM/YYYY"),
      });
      setFileList([]);
    }
  }, [currentCourse, isOpen, reset, setValue]);

  // Xử lý Upload ảnh
  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
    // Nếu có file, set value cho react-hook-form
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      setValue("hinhAnh", newFileList[0].originFileObj);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("maKhoaHoc", data.maKhoaHoc);
      formData.append("tenKhoaHoc", data.tenKhoaHoc);
      formData.append("biDanh", data.biDanh);
      formData.append("moTa", data.moTa);
      formData.append("luotXem", "0");
      formData.append("danhGia", "0");
      formData.append("maNhom", "GP01");
      formData.append("ngayTao", data.ngayTao);
      formData.append("maDanhMucKhoaHoc", data.maDanhMucKhoaHoc);
      formData.append("taiKhoanNguoiTao", "admin_test");

      // Xử lý file ảnh
      if (typeof data.hinhAnh === "object") {
        formData.append("file", data.hinhAnh);
      } else if (currentCourse) {
      }

      if (currentCourse) {
        await courseService.updateCourse(formData);
        message.success("Cập nhật khóa học thành công");
      } else {
        await courseService.addCourse(formData);
        message.success("Thêm khóa học thành công");
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      message.error(error.response?.data || "Có lỗi xảy ra");
    }
  };

  return (
    <Modal
      title={currentCourse ? "Cập nhật khóa học" : "Thêm khóa học"}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      forceRender
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Mã khóa học */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mã khóa học
            </label>
            <input
              {...register("maKhoaHoc")}
              disabled={!!currentCourse}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                !!currentCourse ? "bg-gray-100" : "border-gray-300"
              }`}
            />
            {errors.maKhoaHoc && (
              <p className="text-red-500 text-xs">{errors.maKhoaHoc.message}</p>
            )}
          </div>

          {/* Tên khóa học */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên khóa học
            </label>
            <input
              {...register("tenKhoaHoc")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
            {errors.tenKhoaHoc && (
              <p className="text-red-500 text-xs">
                {errors.tenKhoaHoc.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Danh mục */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục
            </label>
            <Controller
              control={control}
              name="maDanhMucKhoaHoc"
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full"
                  placeholder="Chọn danh mục"
                  options={categories.map((cat) => ({
                    value: cat.maDanhMucKhoahoc || cat.maDanhMuc,
                    label: cat.tenDanhMucKhoaHoc || cat.tenDanhMuc,
                  }))}
                />
              )}
            />
            {errors.maDanhMucKhoaHoc && (
              <p className="text-red-500 text-xs">
                {errors.maDanhMucKhoaHoc.message}
              </p>
            )}
          </div>

          {/* Ngày tạo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày tạo
            </label>
            <Controller
              control={control}
              name="ngayTao"
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
                  onChange={(date, dateString) => field.onChange(dateString)}
                />
              )}
            />
            {errors.ngayTao && (
              <p className="text-red-500 text-xs">{errors.ngayTao.message}</p>
            )}
          </div>
        </div>

        {/* Bí danh */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bí danh
          </label>
          <input
            {...register("biDanh")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
          {errors.biDanh && (
            <p className="text-red-500 text-xs">{errors.biDanh.message}</p>
          )}
        </div>

        {/* Hình ảnh */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh
          </label>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
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
            <p className="text-red-500 text-xs">{errors.moTa.message}</p>
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
            {isSubmitting ? "Đang xử lý..." : "Lưu"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CourseModal;
