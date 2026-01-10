import React from "react";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 font-sans">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Cột 1: Thông tin chung */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4 text-white">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-lg">
              C
            </div>
            <span className="text-2xl font-bold">CyberSoft</span>
          </Link>
          <p className="text-sm leading-relaxed mb-4">
            Hệ thống đào tạo lập trình chuyên sâu theo dự án thực tế. Học đi đôi
            với hành, cam kết việc làm cho học viên.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              <FacebookOutlined className="text-xl" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <YoutubeOutlined className="text-xl" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <InstagramOutlined className="text-xl" />
            </a>
          </div>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Liên kết</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-indigo-400 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/khoa-hoc"
                className="hover:text-indigo-400 transition-colors"
              >
                Khóa học
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-indigo-400 transition-colors"
              >
                Blog công nghệ
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-indigo-400 transition-colors"
              >
                Về chúng tôi
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Khóa học nổi bật */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Khóa học</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#" className="hover:text-indigo-400 transition-colors">
                Lập trình Front End
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-indigo-400 transition-colors">
                Lập trình Back End
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-indigo-400 transition-colors">
                Lập trình Fullstack
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-indigo-400 transition-colors">
                Lập trình Java Web
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Liên hệ</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <i className="fa fa-map-marker mt-1 text-indigo-500"></i>
              <span>Trụ sở: 112 Cao Thắng, Quận 3, TP. Hồ Chí Minh</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa fa-phone text-indigo-500"></i>
              <span>096.105.1014</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa fa-envelope text-indigo-500"></i>
              <span>contact@cybersoft.edu.vn</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; 2026 CyberSoft Academy. All rights reserved. Designed by Student.
      </div>
    </footer>
  );
};

export default Footer;
