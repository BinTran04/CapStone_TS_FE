import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin, Button, Tabs, Statistic, Card, Avatar } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

import { courseService } from "../../../services/courseService";
import type { Course, CourseCategory } from "../../../types/courseTypes";

import CourseCard from "../../../components/Client/CourseCard/CourseCard";

import {
  reviews,
  blogs,
  stats,
  features,
  instructorData,
} from "../../../mockData/mockData";

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("ALL");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Lấy list khóa học & Lấy danh mục
        const [courseRes, categoryRes] = await Promise.all([
          courseService.getCourseList(),
          courseService.getCourseCategories(),
        ]);

        // Cập nhật State
        setCourses(courseRes.data);
        setFilteredCourses(courseRes.data);

        setCategories(categoryRes.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hàm xử lý khi chuyển Tab
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (key === "ALL") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) => course.danhMucKhoaHoc?.maDanhMucKhoahoc === key,
      );
      setFilteredCourses(filtered);
    }
  };

  // Tab Items cho Antd Tabs
  const tabItems = [
    { key: "ALL", label: "Tất cả" },
    ...categories.map((cat) => ({
      key: cat.maDanhMucKhoahoc || cat.maDanhMuc || "",
      label: cat.tenDanhMucKhoaHoc || cat.tenDanhMuc || "Danh mục",
    })),
  ];

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="home-page bg-gray-50">
      {/* HERO SECTION */}
      <section className="relative bg-gray-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight animate-fade-in-up">
            Khởi đầu sự nghiệp{" "}
            <span className="text-yellow-400">Lập Trình</span>
            <br />
            của bạn ngay hôm nay
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Hệ thống đào tạo lập trình thực chiến, cam kết đầu ra và hỗ trợ trọn
            đời. Hơn 50.000 học viên đã thành công.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button
                type="primary"
                size="large"
                className="bg-indigo-600 border-none h-12 px-8 text-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/50"
              >
                Xem khóa học
              </Button>
            </Link>
            <Button
              size="large"
              ghost
              className="h-12 px-8 text-lg font-bold border-white text-white hover:text-yellow-400 hover:border-yellow-400"
            >
              Tư vấn lộ trình
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 border-t border-gray-700 pt-10">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-yellow-400">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 bg-white -mt-10 relative z-20 container mx-auto px-4 rounded-3xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Khám phá các khóa học nổi bật
          </h2>
          <p className="text-gray-500 mt-2">
            Hơn 200 khóa học từ cơ bản đến nâng cao
          </p>
        </div>

        {/* TABS DANH MỤC */}
        <Tabs
          defaultActiveKey="ALL"
          activeKey={activeTab}
          items={tabItems}
          centered
          size="large"
          className="custom-tabs mb-8"
          onChange={handleTabChange}
        />

        {/* DANH SÁCH KHÓA HỌC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.slice(0, 8).map((course) => (
            <CourseCard key={course.maKhoaHoc} course={course} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/courses">
            <Button
              size="large"
              className="px-10 h-12 rounded-full border-gray-300 hover:border-indigo-600 hover:text-indigo-600"
            >
              Xem tất cả khóa học
            </Button>
          </Link>
        </div>
      </section>

      {/* INSTRUCTORS SECTION */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">
              Đội ngũ Giảng viên tiêu biểu
            </h2>
            <p className="text-gray-500 mt-2">
              Học từ những chuyên gia hàng đầu trong ngành
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructorData.slice(0, 3).map((inst) => (
              <div
                key={inst.id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center group"
              >
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-indigo-100 rounded-full transform group-hover:scale-110 transition-transform"></div>
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{inst.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">
                  {inst.specialty}
                </p>
                <p className="text-gray-500 text-sm line-clamp-2 px-4">
                  {inst.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Học viên nói gì về chúng tôi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg relative"
            >
              <div className="absolute top-6 right-6 text-6xl text-indigo-100 font-serif leading-none">
                "
              </div>
              <p className="text-gray-600 italic mb-6 relative z-10">
                {review.content}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <div className="text-xs text-gray-500">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Bài viết mới nhất
              </h2>
              <p className="text-gray-500 mt-1">
                Chia sẻ kiến thức và kinh nghiệm lập trình
              </p>
            </div>
            <Link
              to="/blog"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Xem thêm bài viết &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl mb-4 relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 bg-indigo-600 text-white text-xs px-3 py-1">
                    {blog.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-500 mt-2 line-clamp-2">
                  Tổng hợp các kiến thức quan trọng bạn cần nắm vững để trở
                  thành lập trình viên chuyên nghiệp...
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Bạn đã sẵn sàng bắt đầu?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Đăng ký tài khoản ngay hôm nay để nhận ưu đãi khóa học và tham gia
            cộng đồng 50.000+ học viên.
          </p>
          <Link to="/register">
            <button className="bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-full hover:bg-yellow-300 transition-transform hover:scale-105 shadow-xl">
              Đăng ký miễn phí ngay
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
