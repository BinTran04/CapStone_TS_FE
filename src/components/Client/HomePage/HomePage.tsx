import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseService } from "../../../services/courseService";
import type { Course } from "../../../types/courseTypes";
import CourseCard from "../../../components/Client/CourseCard/CourseCard";
import { Spin, Button } from "antd";

// Mock Data cho các phần tĩnh
const features = [
  {
    icon: "🎓",
    title: "Học mọi lúc mọi nơi",
    desc: "Truy cập bài giảng 24/7 trên mọi thiết bị.",
  },
  {
    icon: "🔥",
    title: "Thực hành dự án thật",
    desc: "Làm dự án thực tế để xây dựng Portfolio.",
  },
  {
    icon: "🤝",
    title: "Cộng đồng & Mentor",
    desc: "Đội ngũ Mentor hỗ trợ 24/7 nhiệt tình.",
  },
];

const instructors = [
  {
    name: "Nguyễn Văn A",
    role: "Senior Frontend Dev",
    img: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random",
  },
  {
    name: "Trần Thị B",
    role: "Lead Backend Engineer",
    img: "https://ui-avatars.com/api/?name=Tran+Thi+B&background=random",
  },
  {
    name: "Lê Văn C",
    role: "Fullstack Expert",
    img: "https://ui-avatars.com/api/?name=Le+Van+C&background=random",
  },
  {
    name: "Phạm Thị D",
    role: "UI/UX Designer",
    img: "https://ui-avatars.com/api/?name=Pham+Thi+D&background=random",
  },
];

const reviews = [
  {
    user: "Hải Nam",
    comment: "Khóa học rất thực tế, giảng viên dạy dễ hiểu.",
    rating: 5,
  },
  {
    user: "Minh Tú",
    comment: "Mình đã xin được việc ngay sau khi tốt nghiệp khóa React.",
    rating: 5,
  },
  {
    user: "Thanh Hằng",
    comment: "Support cực nhanh, sửa lỗi code nhiệt tình.",
    rating: 4,
  },
];

const blogs = [
  {
    title: "Lộ trình Frontend 2026",
    img: "https://picsum.photos/400/250?random=1",
    date: "10 Jan 2026",
  },
  {
    title: "Tại sao nên học ReactJS?",
    img: "https://picsum.photos/400/250?random=2",
    date: "05 Jan 2026",
  },
  {
    title: "Tips phỏng vấn IT hiệu quả",
    img: "https://picsum.photos/400/250?random=3",
    date: "01 Jan 2026",
  },
];

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Gọi API lấy danh sách khóa học
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
    <div className="bg-white">
      {/* 1. HERO SECTION */}
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
            <Button
              type="primary"
              size="large"
              className="bg-indigo-600 hover:bg-indigo-500 h-12 px-8 text-lg rounded-full font-bold border-none shadow-lg shadow-indigo-500/50"
            >
              Xem khóa học
            </Button>
            <Button
              ghost
              size="large"
              className="h-12 px-8 text-lg rounded-full font-bold hover:text-indigo-400 hover:border-indigo-400"
            >
              Tư vấn lộ trình
            </Button>
          </div>
        </div>
      </section>

      {/* 2. FEATURES / BENEFITS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-20">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="text-4xl mb-4 bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR COURSES */}
      <section className="py-20 container mx-auto px-4">
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
        <div className="mt-10 text-center md:hidden">
          <Button>Xem tất cả khóa học</Button>
        </div>
      </section>

      {/* 4. INSTRUCTORS */}
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

      {/* 5. TESTIMONIALS */}
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

      {/* 6. BLOG / RESOURCES */}
      <section className="py-20 container mx-auto px-4">
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
                Tổng hợp các kiến thức quan trọng bạn cần nắm vững để trở thành
                lập trình viên chuyên nghiệp...
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA BOTTOM */}
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
