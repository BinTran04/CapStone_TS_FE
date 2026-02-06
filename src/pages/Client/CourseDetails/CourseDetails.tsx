import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { courseService } from "../../../services/courseService";
import { userService } from "../../../services/userService";
import type { Course } from "../../../types/courseTypes";
import { useAppDispatch } from "../../../store/store";
import { addToCart } from "../../../store/slices/cartSlice";
import {
  Spin,
  Button,
  Card,
  Avatar,
  Breadcrumb,
  message,
  Tag,
  Modal,
  Tabs,
  Row,
  Col,
  Tooltip,
} from "antd";
import {
  GlobalOutlined,
  FieldTimeOutlined,
  SafetyCertificateOutlined,
  PlayCircleOutlined,
  CheckCircleFilled,
  BankOutlined,
  CreditCardOutlined,
  CopyOutlined,
  StarFilled,
  UserOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  MobileOutlined,
  InfoOutlined,
  ScanOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const MY_BANK = {
  BANK_ID: "VietinBank",
  ACCOUNT_NO: "101877400030",
  ACCOUNT_NAME: "CYBERSOFT ACADEMY",
  TEMPLATE: "compact2",
};

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("BANK");

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await courseService.getCourseDetail(id);
        setCourse(res.data);
      } catch (error) {
        console.error("Lỗi lấy chi tiết khóa học:", error);
        message.error("Không thể tải thông tin khóa học.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id]);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (course) {
      dispatch(addToCart(course));
      message.success({
        content: "Đã thêm khóa học vào giỏ hàng!",
        icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
      });
    }
  };

  // --- 1. HÀM KIỂM TRA LOGIN ---
  const checkLogin = () => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  // --- 2. XỬ LÝ KHI BẤM NÚT ĐĂNG KÝ ---
  const handleOpenPaymentModal = () => {
    const user = checkLogin();
    if (!user) {
      message.warning("Vui lòng đăng nhập để đăng ký khóa học");
      localStorage.setItem("REDIRECT_AFTER_LOGIN", window.location.pathname);
      navigate("/login");
      return;
    }
    setIsPaymentModalOpen(true);
  };

  // --- 3. XỬ LÝ XÁC NHẬN THANH TOÁN & GHI DANH ---
  const handleConfirmPayment = async () => {
    if (!course) return;
    const user = checkLogin();
    if (!user) {
      navigate("/login");
      return;
    }

    setLoadingPay(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await userService.registerCourse({
        maKhoaHoc: course.maKhoaHoc,
        taiKhoan: user.taiKhoan,
      });

      setIsPaymentModalOpen(false);

      Modal.success({
        title: null,
        icon: null,
        width: 500,
        centered: true,
        className: "success-modal",
        content: (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
              <CheckCircleFilled className="text-6xl text-green-500 shadow-lg shadow-green-200 rounded-full" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              Thành công!
            </h2>
            <p className="text-gray-500 mb-8 text-base px-8">
              Chúc mừng bạn đã sở hữu khóa học <br />{" "}
              <b className="text-indigo-600">{course.tenKhoaHoc}</b>.
            </p>
            <Button
              type="primary"
              size="large"
              className="bg-indigo-600 hover:!bg-indigo-700 w-full h-14 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 transform transition-transform hover:scale-[1.02]"
              onClick={() => navigate("/profile")}
            >
              Vào học ngay
            </Button>
          </div>
        ),
        footer: null,
        maskClosable: true,
      });
    } catch (error: any) {
      console.error(error);
      message.error(
        error.response?.data || "Đăng ký thất bại. Vui lòng thử lại.",
      );
    } finally {
      setLoadingPay(false);
    }
  };

  // Helper để copy text
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    message.success({
      content: `Đã sao chép ${label}`,
      icon: <CheckCircleFilled style={{ color: "#10b981" }} />,
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  if (!course)
    return <div className="text-center mt-20">Không tìm thấy khóa học</div>;

  const fakePrice = 1299000;
  const fakeOldPrice = 2500000;
  const qrUrl = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-${MY_BANK.TEMPLATE}.png?amount=${fakePrice}&addInfo=THANHTOAN ${course.maKhoaHoc}`;

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <div className="bg-[#1c1d1f] text-white py-12 lg:py-16 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            <div className="lg:col-span-2 pr-0 lg:pr-12">
              <Breadcrumb
                className="mb-4"
                separator={<span className="text-gray-400">/</span>}
                items={[
                  {
                    title: (
                      <Link to="/" className="text-gray-300 hover:text-white">
                        Trang chủ
                      </Link>
                    ),
                  },
                  {
                    title: (
                      <Link
                        to="/courses"
                        className="text-gray-300 hover:text-white"
                      >
                        Khóa học
                      </Link>
                    ),
                  },
                  {
                    title: (
                      <span className="text-white font-medium">
                        {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||
                          "Lập trình"}
                      </span>
                    ),
                  },
                ]}
              />
              <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
                {course.tenKhoaHoc}
              </h1>
              <p className="text-lg text-gray-300 mb-6 line-clamp-2">
                {course.moTa.replace(/<[^>]+>/g, "").substring(0, 150)}...
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                <Tag
                  color="#f69c08"
                  className="font-bold border-none px-2 py-1 text-black"
                >
                  Bestseller
                </Tag>
                <div className="flex items-center text-[#f69c08] font-bold">
                  <span className="mr-1">4.8</span>
                  <div className="flex text-xs">
                    {[...Array(5)].map((_, i) => (
                      <StarFilled key={i} />
                    ))}
                  </div>
                </div>
                <span className="text-blue-300 underline cursor-pointer">
                  (1,234 đánh giá)
                </span>
                <span className="text-white">5,678 học viên</span>
              </div>
              <div className="text-sm text-gray-300 flex items-center gap-4">
                <span>
                  Tạo bởi{" "}
                  <a
                    href="#"
                    className="text-blue-300 underline hover:text-blue-200"
                  >
                    Giảng viên CyberSoft
                  </a>
                </span>
                <span className="flex items-center gap-1">
                  <GlobalOutlined /> Tiếng Việt
                </span>
                <span className="flex items-center gap-1">
                  <SafetyCertificateOutlined /> Cập nhật T2/2026
                </span>
              </div>
            </div>
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-4 lg:px-8 py-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="border border-gray-200 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Bạn sẽ học được gì
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Xây dựng dự án thực tế từ con số 0",
                  "Nắm vững tư duy lập trình hiện đại",
                  "Tối ưu hóa hiệu suất ứng dụng",
                  "Làm việc với API và Database",
                  "Deploy ứng dụng lên Server",
                  "Kỹ năng Debug và xử lý lỗi",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-gray-700 text-sm"
                  >
                    <CheckCircleFilled className="text-gray-400 mt-1 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Nội dung khóa học
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 prose max-w-none text-gray-700 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: course.moTa }} />
              </div>
            </div>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Giảng viên
              </h2>
              <div className="flex gap-4">
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  src="https://ui-avatars.com/api/?name=Cyber+Soft&background=random"
                />
                <div>
                  <h3 className="text-lg font-bold text-indigo-600 underline cursor-pointer">
                    CyberSoft Academy
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Chuyên gia đào tạo lập trình
                  </p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <StarFilled className="text-yellow-500" /> 4.8 Xếp hạng
                    </span>
                    <span className="flex items-center gap-1">
                      <PlayCircleOutlined /> 15 Khóa học
                    </span>
                    <span className="flex items-center gap-1">
                      <UserOutlined /> 50k Học viên
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 order-1 lg:order-2 relative">
            <div className="lg:-mt-64 sticky top-24 transition-all duration-300">
              <Card
                className="shadow-2xl border-0 rounded-xl overflow-hidden"
                bodyStyle={{ padding: 0 }}
              >
                <div className="relative group cursor-pointer h-48 overflow-hidden bg-gray-100">
                  <img
                    src={course.hinhAnh}
                    alt={course.tenKhoaHoc}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/600x400?text=Course+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <PlayCircleOutlined className="text-6xl text-white opacity-80 group-hover:scale-110 transition-transform shadow-lg rounded-full bg-black/50" />
                  </div>
                  <div className="absolute bottom-4 left-0 w-full text-center text-white font-bold text-sm drop-shadow-md">
                    Xem trước khóa học này
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-3xl font-extrabold text-gray-900">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(fakePrice)}
                    </span>
                    <span className="text-lg text-gray-400 line-through mb-1">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(fakeOldPrice)}
                    </span>
                    <span className="text-sm text-red-500 font-bold mb-2">
                      Giảm 48%
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="primary"
                      size="large"
                      className="bg-purple-600 hover:!bg-purple-700 border-none h-12 text-lg font-bold shadow-md"
                      block
                      onClick={handleOpenPaymentModal}
                    >
                      Đăng ký ngay
                    </Button>
                    <Button
                      size="large"
                      className="h-12 text-lg font-medium border-gray-400 hover:border-gray-900 hover:text-gray-900"
                      block
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-xs text-gray-500">
                    Đảm bảo hoàn tiền trong 30 ngày
                  </div>
                  <div className="mt-6 space-y-3">
                    <h4 className="font-bold text-gray-800 text-sm">
                      Khóa học bao gồm:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2">
                        <VideoCameraOutlined /> 30 giờ video bài giảng
                      </li>
                      <li className="flex items-center gap-2">
                        <FileTextOutlined /> 15 bài viết chuyên sâu
                      </li>
                      <li className="flex items-center gap-2">
                        <MobileOutlined /> Truy cập trên mobile và TV
                      </li>
                      <li className="flex items-center gap-2">
                        <InfoOutlined /> Truy cập trọn đời
                      </li>
                      <li className="flex items-center gap-2">
                        <SafetyCertificateOutlined /> Cấp chứng chỉ hoàn thành
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isPaymentModalOpen}
        onCancel={() => setIsPaymentModalOpen(false)}
        footer={null}
        title={null}
        width={900}
        bodyStyle={{ padding: 0 }}
        mask={true}
        maskStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
        }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-5/12 bg-gradient-to-br from-gray-900 to-indigo-900 p-8 text-white relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <h3 className="text-xl font-bold mb-6 relative z-10 flex items-center gap-2">
              <ScanOutlined /> Quét mã thanh toán
            </h3>

            <div className="relative z-10 bg-white p-3 rounded-2xl shadow-2xl transform transition-transform hover:scale-105 duration-300">
              <img
                src={qrUrl}
                alt="QR Code"
                className="w-48 h-48 object-cover rounded-xl"
              />
              <div className="text-center mt-2">
                <img
                  src="https://img.vietqr.io/image/VietinBank-logo.png"
                  alt="Bank Logo"
                  className="h-6 mx-auto object-contain opacity-80"
                />
              </div>
            </div>

            <p className="relative z-10 text-gray-300 text-xs mt-6 text-center px-4">
              Sử dụng ứng dụng ngân hàng hoặc ví điện tử (Momo, ZaloPay) để quét
              mã.
            </p>

            <div className="mt-auto relative z-10 pt-8 flex items-center gap-2 text-xs text-green-400 font-medium">
              <LockOutlined /> Kết nối bảo mật 256-bit SSL
            </div>
          </div>

          <div className="md:w-7/12 bg-white p-8 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 m-0">
                Xác nhận thanh toán
              </h3>
              <Tag
                color="processing"
                className="m-0 px-3 py-1 rounded-full text-xs font-bold border-none bg-indigo-50 text-indigo-600"
              >
                Đang chờ xử lý
              </Tag>
            </div>

            <div className="space-y-6">
              {/* Amount Box */}
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex justify-between items-center">
                <span className="text-gray-500 font-medium">
                  Tổng thanh toán
                </span>
                <span className="text-2xl font-extrabold text-indigo-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(fakePrice)}
                </span>
              </div>

              {/* Bank Details */}
              <div className="space-y-4">
                <div className="group">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                    Ngân hàng
                  </span>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-1 mt-1">
                    <span className="font-semibold text-gray-700">
                      {MY_BANK.BANK_ID} - {MY_BANK.ACCOUNT_NAME}
                    </span>
                  </div>
                </div>

                <div className="group">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                    Số tài khoản
                  </span>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-1 mt-1 group-hover:border-indigo-200 transition-colors">
                    <span className="font-bold text-xl text-gray-800 tracking-wide font-mono">
                      {MY_BANK.ACCOUNT_NO}
                    </span>
                    <Tooltip title="Sao chép số tài khoản">
                      <Button
                        type="text"
                        icon={<CopyOutlined />}
                        className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                        onClick={() =>
                          handleCopy(MY_BANK.ACCOUNT_NO, "Số tài khoản")
                        }
                      />
                    </Tooltip>
                  </div>
                </div>

                <div className="group">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                    Nội dung chuyển khoản{" "}
                    <span className="text-red-500">*</span>
                  </span>
                  <div className="flex justify-between items-center bg-yellow-50 border border-yellow-200 p-3 rounded-lg mt-1">
                    <span className="font-bold text-red-600 font-mono tracking-wide">
                      THANHTOAN {course.maKhoaHoc}
                    </span>
                    <Tooltip title="Sao chép nội dung">
                      <Button
                        size="small"
                        className="border-red-200 text-red-500 hover:text-red-700 hover:border-red-400 bg-white shadow-sm"
                        icon={<CopyOutlined />}
                        onClick={() =>
                          handleCopy(
                            `THANHTOAN ${course.maKhoaHoc}`,
                            "Nội dung",
                          )
                        }
                      >
                        Sao chép
                      </Button>
                    </Tooltip>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    * Vui lòng nhập chính xác nội dung để hệ thống tự động kích
                    hoạt khóa học.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3">
              <Button
                size="large"
                className="flex-1 h-12 rounded-xl border-gray-300 font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                Để sau
              </Button>
              <Button
                type="primary"
                size="large"
                className="flex-[2] h-12 rounded-xl bg-indigo-600 hover:!bg-indigo-700 font-bold shadow-lg shadow-indigo-200 transform transition-transform hover:scale-[1.02]"
                loading={loadingPay}
                onClick={handleConfirmPayment}
                icon={<CheckCircleOutlined />}
              >
                Đã chuyển khoản xong
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Loading Overlay Global */}
      {loadingPay && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center flex-col text-white backdrop-blur-sm">
          <Spin size="large" />
          <p className="mt-4 font-bold text-lg animate-pulse">
            Đang xác thực giao dịch...
          </p>
          <p className="text-sm opacity-80">Vui lòng không tắt trình duyệt</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
