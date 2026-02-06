import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin, Button, Tabs, Statistic, message } from "antd";

import { courseService } from "../../../services/courseService";
import type { Course, CourseCategory } from "../../../types/courseTypes";

import CourseCard from "../../../components/Client/CourseCard/CourseCard";

import { reviews, blogs, stats } from "../../../mockData/mockData";

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Lấy list khóa học & Lấy danh mục
        const [courseRes, categoryRes] = await Promise.all([
          courseService.getCourseList(),
          courseService.getCourseCategories(),
        ]);

        setCourses(courseRes.data);
        setFilteredCourses(courseRes.data);
        setCategories(categoryRes.data);
      } catch (err) {
        console.error(err);
        message.error("Lỗi tải dữ liệu khóa học!");
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchData();
  }, []);

  // XỬ LÝ LỌC KHÓA HỌC THEO TAB
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (key === "ALL") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (c) => c.danhMucKhoaHoc.maDanhMucKhoahoc === key,
      );
      setFilteredCourses(filtered);
    }
  };

  const tabItems = [
    { key: "ALL", label: "Tất cả khóa học" },
    ...categories.map((cat) => ({
      key: cat.maDanhMucKhoahoc,
      label: cat.tenDanhMucKhoaHoc,
    })),
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* HERO BANNER */}
      <section className="relative bg-[#644b91] text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/50 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded text-sm uppercase tracking-wider">
              E-Learning Platform
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Khởi đầu sự nghiệp <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Lập Trình Viên
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Hệ thống đào tạo lập trình thực chiến hàng đầu. Hơn{" "}
              {stats[1]?.value} khóa học từ Frontend, Backend đến Mobile và AI.
            </p>

            {/* Countdown Timer */}
            <div className="flex gap-4 items-center bg-white/10 p-4 rounded-lg backdrop-blur-sm w-fit border border-white/10">
              <span className="font-bold text-yellow-400">
                Ưu đãi kết thúc:
              </span>
              <Statistic.Countdown
                value={deadline}
                format="D Ngày H:m:s"
                valueStyle={{
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link to="/search">
                <Button
                  type="primary"
                  size="large"
                  className="h-14 px-8 text-lg font-bold bg-indigo-600 hover:!bg-indigo-500 border-none rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all"
                >
                  Xem Khóa Học
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg"
              alt="Hero Banner"
              className="w-full drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* THỐNG KÊ NHANH */}
      <section className="py-10 bg-indigo-900 text-white border-t border-indigo-800">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-yellow-400">
                {stat.value}
              </div>
              <div className="text-indigo-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DANH SÁCH KHÓA HỌC */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Khám phá khóa học
            </h2>
            <p className="text-gray-500 text-lg">
              Hàng trăm khóa học mới được cập nhật mỗi tháng
            </p>
          </div>

          {/* Tab Danh mục */}
          <div className="flex justify-center mb-8">
            <Tabs
              defaultActiveKey="ALL"
              activeKey={activeTab}
              onChange={handleTabChange}
              type="card"
              size="large"
              items={[
                { key: "ALL", label: "Tất cả khoá học" },
                // Map danh sách danh mục từ API
                ...categories.map((cat, index) => {
                  const uniqueKey =
                    cat.maDanhMuc || cat.maDanhMucKhoahoc || `cat_${index}`;
                  const labelName =
                    cat.tenDanhMuc || cat.tenDanhMucKhoaHoc || "Danh mục";

                  return {
                    key: uniqueKey,
                    label: labelName,
                  };
                }),
              ]}
              className="custom-tabs"
            />
          </div>

          {/* Grid Khóa học */}
          {loading ? (
            <div className="h-64 flex justify-center items-center">
              <Spin size="large" tip="Đang tải khóa học..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredCourses.length > 0 ? (
                filteredCourses
                  .slice(0, 8)
                  .map((course) => (
                    <CourseCard key={course.maKhoaHoc} course={course} />
                  ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  Không tìm thấy khóa học nào trong danh mục này.
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/search">
              <Button
                size="large"
                className="px-10 h-12 rounded-full font-bold border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Xem tất cả khóa học
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Học viên nói gì về chúng tôi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 p-8 rounded-2xl relative hover:shadow-lg transition-shadow"
              >
                <div className="absolute -top-6 left-8">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>
                <div className="mt-8">
                  <h4 className="font-bold text-lg">{review.name}</h4>
                  <p className="text-indigo-600 text-sm mb-4">{review.role}</p>
                  <p className="text-gray-600 italic">"{review.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Bài viết mới nhất</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4 h-64">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 bg-indigo-600 text-white text-xs px-3 py-1">
                    {blog.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-500 mt-2 line-clamp-2">
                  Tổng hợp các kiến thức quan trọng bạn cần nắm vững...
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Bạn đã sẵn sàng bắt đầu?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Đăng ký tài khoản ngay hôm nay để nhận ưu đãi khóa học và tham gia
            cộng đồng 50.000+ học viên.
          </p>
          <Link to="/register">
            <button className="bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-full hover:bg-yellow-300 transition-transform hover:scale-105 shadow-xl">
              Đăng Ký Ngay
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
