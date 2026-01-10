import React from "react";
import { Link } from "react-router-dom";
import type { Course } from "../../../types/courseTypes";
import { Rate, Tag } from "antd";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden">
        <img
          alt={course.tenKhoaHoc}
          src={course.hinhAnh}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://picsum.photos/300/200";
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Tag color="cyan" className="font-bold shadow-md">
            Frontend
          </Tag>
        </div>
        {/* Overlay Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link
            to={`/chitiet/${course.maKhoaHoc}`}
            className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full transform scale-90 group-hover:scale-100 transition-transform shadow-lg"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[56px] group-hover:text-indigo-600 transition-colors">
          {course.tenKhoaHoc}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700 text-xs font-bold">
            <span>4.8</span> <i className="fa fa-star text-yellow-400"></i>
          </div>
          <span className="text-gray-400 text-xs">
            ({course.luotXem} học viên)
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="author"
              className="w-8 h-8 rounded-full border border-gray-200"
            />
            <span className="text-xs text-gray-500 font-medium">CyberSoft</span>
          </div>
          <span className="text-indigo-600 font-bold text-lg">Miễn phí</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
