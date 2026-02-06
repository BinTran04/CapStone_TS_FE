import React from "react";
import { Link } from "react-router-dom";
import type { Course } from "../../../types/courseTypes";
import { Tag, Avatar, Rate } from "antd";
import {
  UserOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Random giá demo
  const fakePrice = 10000;
  const fakeOldPrice = 1200000;

  const getTagStyle = (categoryName: string = "") => {
    const name = categoryName.toLowerCase();
    if (name.includes("front"))
      return {
        color: "cyan",
        className: "text-cyan-700 bg-cyan-50 border-cyan-200",
      };
    if (name.includes("back"))
      return {
        color: "purple",
        className: "text-purple-700 bg-purple-50 border-purple-200",
      };
    if (name.includes("full"))
      return {
        color: "geekblue",
        className: "text-indigo-700 bg-indigo-50 border-indigo-200",
      };
    if (name.includes("mobile"))
      return {
        color: "orange",
        className: "text-orange-700 bg-orange-50 border-orange-200",
      };
    return {
      color: "default",
      className: "text-gray-600 bg-gray-100 border-gray-200",
    };
  };

  const tagStyle = getTagStyle(course.danhMucKhoaHoc?.tenDanhMucKhoaHoc);

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col relative">
      {/* IMAGE SECTION */}
      <div className="relative h-44 overflow-hidden">
        <img
          alt={course.tenKhoaHoc}
          src={course.hinhAnh}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dynamic Tag */}
        <div className="absolute top-3 left-3 z-10">
          <Tag
            className={`font-bold border px-2 py-0.5 uppercase text-[10px] tracking-wide shadow-sm rounded-md ${tagStyle.className}`}
          >
            {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "COURSE"}
          </Tag>
        </div>

        {/* OVERLAY BUTTON */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
          <Link
            to={`/detail/${course.maKhoaHoc}`}
            className="bg-white text-gray-900 font-bold py-2.5 px-6 rounded-full hover:bg-indigo-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg text-sm"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <Link to={`/detail/${course.maKhoaHoc}`} title={course.tenKhoaHoc}>
          <h3 className="text-[15px] font-bold text-gray-800 mb-1 leading-snug line-clamp-2 min-h-[42px] group-hover:text-indigo-600 transition-colors">
            {course.tenKhoaHoc}
          </h3>
        </Link>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3 mt-1">
          <Avatar
            size={20}
            src={`https://ui-avatars.com/api/?name=${course.nguoiTao?.hoTen}&background=random`}
            className="flex-shrink-0"
          />
          <span className="text-xs text-gray-500 font-medium truncate">
            {course.nguoiTao?.hoTen || "CyberSoft Academy"}
          </span>
        </div>

        {/* Rating & Views */}
        <div className="flex items-center gap-3 mb-3 text-xs border-b border-gray-50 pb-3">
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-700">4.8</span>
            <Rate
              disabled
              count={1}
              defaultValue={1}
              className="text-xs text-yellow-500"
            />
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 flex items-center gap-1">
            <EyeOutlined /> {course.luotXem.toLocaleString()}
          </span>
        </div>

        {/* Footer: Giá tiền */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className="text-[10px] text-gray-400 line-through decoration-gray-300 mb-0.5">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(fakeOldPrice)}
            </span>
            <span className="text-base font-extrabold text-indigo-600">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(fakePrice)}
            </span>
          </div>

          <button className="w-8 h-8 rounded-full border border-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors hover:border-indigo-600">
            <ShoppingCartOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
