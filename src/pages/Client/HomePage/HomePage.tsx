import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseService } from "../../../services/courseService";
import type { Course } from "../../../types/courseTypes";
import CourseCard from "../../../components/Client/CourseCard/CourseCard";
import { Spin, Button, Collapse, Statistic } from "antd";
import { PlayCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

// Import Mock Data
import {
  features,
  stats,
  learningPaths,
  instructors,
  reviews,
  blogs,
  faqs,
} from "./../../../constants/mockData";

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // State cho Countdown Timer (Giả lập deadline sau 2 ngày)
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await courseService.getCourseList();
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-white font-sans">
      {/* HERO SECTION */}
      <section className="relative bg-gray-900 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Hero bg"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-600/30 border border-indigo-400 text-indigo-300 text-sm font-semibold mb-6 animate-fade-in-up">
            🚀 Khởi đầu đam mê lập trình
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            Học Lập Trình <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Từ Cơ Bản Đến Nâng Cao
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Hệ thống đào tạo lập trình thực chiến hàng đầu. Cam kết đầu ra, hỗ
            trợ trọn đời, cập nhật công nghệ mới nhất 2026.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/khoa-hoc">
              <Button
                type="primary"
                size="large"
                className="bg-indigo-600 hover:bg-indigo-500 h-12 px-8 text-lg rounded-full font-bold border-none shadow-lg shadow-indigo-500/50"
              >
                Xem khóa học
              </Button>
            </Link>
            <Button
              ghost
              size="large"
              className="h-12 px-8 text-lg rounded-full font-bold hover:text-indigo-400 hover:border-indigo-400"
              icon={<PlayCircleOutlined />}
            >
              Xem Video Giới Thiệu
            </Button>
          </div>
        </div>
      </section>

      {/* STATS*/}
      <section className="py-12 bg-white -mt-16 relative z-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="text-center border-r last:border-r-0 border-gray-100"
            >
              <item.icon className="text-3xl text-indigo-600 mb-2" />
              <div className="text-3xl font-bold text-gray-800">
                {item.number}
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wide">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOTION / COUNTDOWN */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-500 py-3">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 text-white">
          <span className="font-bold text-lg">
            ⚡ ƯU ĐÃI KHỦNG: Giảm 40% cho Combo Front-end & Back-end!
          </span>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-1 rounded-lg">
            <span>Kết thúc sau:</span>
            <Statistic.Countdown
              value={deadline}
              format="DD:HH:mm:ss"
              valueStyle={{
                color: "white",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            />
          </div>
          <Link
            to="/register"
            className="bg-white text-orange-600 px-4 py-1 rounded font-bold hover:bg-gray-100 transition-colors"
          >
            Đăng ký ngay
          </Link>
        </div>
      </section>

      {/* LEARNING PATH */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">
            Lộ trình học tập rõ ràng
          </h2>
          <p className="text-gray-500 mt-2">
            Định hình con đường sự nghiệp của bạn từng bước một
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>

          {learningPaths.map((path, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex-1 relative hover:-translate-y-2 transition-transform"
            >
              <div
                className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase ${path.color}`}
              >
                {path.level}
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">{path.title}</h3>
              <p className="text-gray-500 text-sm">{path.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Khóa học phổ biến 🔥
              </h2>
              <p className="text-gray-500">
                Các khóa học được quan tâm nhiều nhất tháng này
              </p>
            </div>
            <Link
              to="/khoa-hoc"
              className="text-indigo-600 font-semibold hover:underline hidden md:block"
            >
              Xem tất cả &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {courses.slice(0, 8).map((course) => (
                <CourseCard key={course.maKhoaHoc} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* VIDEO INTRO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <span className="text-indigo-600 font-bold uppercase text-sm tracking-wider">
              Về CyberSoft
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6">
              Nền tảng học lập trình thực chiến số 1
            </h2>
            <ul className="space-y-4 mb-8">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircleOutlined className="text-green-500 text-xl mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800">{f.title}</h4>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button type="primary" size="large" className="bg-indigo-600">
              Tìm hiểu thêm
            </Button>
          </div>
          <div className="md:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
              alt="Video cover"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <PlayCircleOutlined className="text-6xl text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* INSTRUCTORS */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Đội ngũ giảng viên chuyên gia
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {instructors.map((ins, idx) => (
              <div key={idx} className="group">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-indigo-500 group-hover:border-yellow-400 transition-colors">
                  <img
                    src={ins.img}
                    alt={ins.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold">{ins.name}</h4>
                <p className="text-indigo-300 text-sm">{ins.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Cảm nhận học viên
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <i key={i} className="fa fa-star"></i>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{rev.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {rev.user.charAt(0)}
                  </div>
                  <span className="font-bold text-gray-800">{rev.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Câu hỏi thường gặp
        </h2>
        <Collapse items={faqs} defaultActiveKey={["1"]} size="large" />
      </section>

      {/* BLOG */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            Bài viết mới nhất 📰
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="rounded-xl overflow-hidden mb-4 relative">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
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
            <button className="bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-full shadow-xl hover:bg-yellow-300 hover:scale-105 transition-transform">
              Đăng Ký Ngay - Hoàn Toàn Miễn Phí
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
