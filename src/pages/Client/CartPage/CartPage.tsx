import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import {
  removeFromCart,
  clearCart,
  addToCart,
} from "../../../store/slices/cartSlice";
import { courseService } from "../../../services/courseService";
import { userService } from "../../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import type { Course } from "../../../types/courseTypes";
import {
  Typography,
  Button,
  List,
  Card,
  Avatar,
  Divider,
  Empty,
  message,
  Modal,
  Input,
  Form,
  Radio,
  Spin,
  Tabs,
  Tag,
  Row,
  Col,
  Rate,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  CreditCardOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
  BankOutlined,
  CopyOutlined,
  GiftOutlined,
  StarFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// CẤU HÌNH TÀI KHOẢN NGÂN HÀNG
const MY_BANK = {
  BANK_ID: "VietinBank",
  ACCOUNT_NO: "101877454411",
  ACCOUNT_NAME: "TRAN QUOC NHUT",
  TEMPLATE: "compact",
};

const CartPage: React.FC = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loadingPay, setLoadingPay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("qr");

  const [suggestedCourses, setSuggestedCourses] = useState<Course[]>([]);

  // Lấy khóa học gợi ý khi mount
  useEffect(() => {
    courseService
      .getCourseList()
      .then((res) => {
        // Lấy ngẫu nhiên hoặc 4 khóa đầu tiên khác với khóa trong giỏ
        const filtered = res.data
          .filter(
            (c) => !cartItems.find((item) => item.maKhoaHoc === c.maKhoaHoc),
          )
          .slice(0, 4);
        setSuggestedCourses(filtered);
      })
      .catch((err) => console.log(err));
  }, [cartItems]);

  // TÍNH TOÁN GIÁ TIỀN
  const calculateSubTotal = () =>
    cartItems.reduce((total, _) => total + 1200000, 0);
  const calculateTotal = () => cartItems.reduce((total, _) => total + 10000, 0);
  const calculateDiscount = () => calculateSubTotal() - calculateTotal();

  const handleCheckout = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      Modal.confirm({
        title: "Yêu cầu đăng nhập",
        content: "Bạn cần đăng nhập để thực hiện thanh toán.",
        okText: "Đăng nhập ngay",
        onOk: () => navigate("/login"),
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = async () => {
    setIsModalOpen(false);
    setLoadingPay(true);

    try {
      const userRes = await userService.getUserInfo();
      const taiKhoan = userRes.data.taiKhoan;

      const promises = cartItems.map((course) =>
        courseService.registerCourse({
          maKhoaHoc: course.maKhoaHoc,
          taiKhoan: taiKhoan,
        }),
      );

      await Promise.all(promises);

      Modal.success({
        title: "Thanh toán thành công!",
        content: "Khóa học đã được kích hoạt. Bạn có thể vào học ngay.",
        okText: "Vào học ngay",
        onOk: () => navigate("/profile"),
        maskClosable: true,
      });
      dispatch(clearCart());
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi kích hoạt khóa học.");
    } finally {
      setLoadingPay(false);
    }
  };

  const totalAmount = calculateTotal();
  const transferContent = `THANHTOAN KH${Date.now().toString().slice(-6)}`;
  const qrCodeUrl = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-${MY_BANK.TEMPLATE}.png?amount=${totalAmount}&addInfo=${transferContent}&accountName=${encodeURIComponent(MY_BANK.ACCOUNT_NAME)}`;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <Empty
          image="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          imageStyle={{ height: 160 }}
          description={
            <span className="text-lg text-gray-500 font-medium">
              Giỏ hàng của bạn đang trống
            </span>
          }
        />
        <Link to="/">
          <Button
            type="primary"
            size="large"
            className="mt-6 bg-indigo-600 h-12 px-8 rounded-full font-bold hover:!bg-indigo-700 shadow-lg shadow-indigo-200"
          >
            Tìm khóa học ngay
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Link
            to="/"
            className="text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors"
          >
            <ArrowLeftOutlined /> Tiếp tục mua sắm
          </Link>
        </div>

        <Title level={2} className="mb-6 font-bold text-gray-800">
          Giỏ hàng{" "}
          <span className="text-gray-400 text-2xl font-normal">
            ({cartItems.length} khóa học)
          </span>
        </Title>

        <Row gutter={32}>
          {/* DANH SÁCH và GỢI Ý */}
          <Col xs={24} lg={16}>
            <div className="space-y-4 mb-12">
              {cartItems.map((item) => (
                <div
                  key={item.maKhoaHoc}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start relative group"
                >
                  {/* Ảnh khóa học */}
                  <Link
                    to={`/detail/${item.maKhoaHoc}`}
                    className="shrink-0 overflow-hidden rounded-lg w-32 h-20 md:w-40 md:h-24"
                  >
                    <img
                      src={item.hinhAnh}
                      alt={item.tenKhoaHoc}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>

                  {/* Thông tin */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/detail/${item.maKhoaHoc}`}>
                          <h3 className="text-lg font-bold text-gray-800 hover:text-indigo-600 line-clamp-2 mb-1 leading-tight">
                            {item.tenKhoaHoc}
                          </h3>
                        </Link>
                        <p className="text-gray-500 text-sm mb-1">
                          Bởi: {item.nguoiTao?.hoTen || "Giảng viên CyberSoft"}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                          <span>4.8</span>{" "}
                          <Rate
                            disabled
                            count={1}
                            defaultValue={1}
                            className="text-xs text-yellow-500"
                          />
                          <span className="text-gray-400 font-normal">
                            (1,240 đánh giá)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-indigo-600 font-bold text-lg">
                          499.000₫
                        </div>
                        <div className="text-gray-400 line-through text-sm">
                          1.200.000₫
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nút xóa */}
                  <Tooltip title="Xóa khỏi giỏ">
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border border-gray-100 rounded-full"
                      onClick={() => dispatch(removeFromCart(item.maKhoaHoc))}
                    />
                  </Tooltip>
                </div>
              ))}
            </div>

            {/* GỢI Ý KHÓA HỌC */}
            {suggestedCourses.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Có thể bạn cũng thích
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedCourses.map((course) => (
                    <div
                      key={course.maKhoaHoc}
                      className="bg-white p-3 rounded-lg border border-gray-100 flex gap-3 hover:shadow-md transition-all"
                    >
                      <img
                        src={course.hinhAnh}
                        className="w-20 h-20 rounded object-cover shrink-0"
                        alt=""
                      />
                      <div className="flex flex-col justify-between flex-1">
                        <h4 className="font-bold text-sm line-clamp-2 text-gray-800">
                          {course.tenKhoaHoc}
                        </h4>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-indigo-600 font-bold text-sm">
                            499.000₫
                          </span>
                          <Button
                            size="small"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => dispatch(addToCart(course))}
                          >
                            Thêm
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Col>

          {/* THANH TOÁN */}
          <Col xs={24} lg={8}>
            <div className="sticky top-24">
              <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
                <div className="p-2">
                  <Title level={4} className="text-gray-400 font-light mb-6">
                    Tổng thanh toán
                  </Title>

                  <div className="flex justify-between mb-3 text-gray-600">
                    <span>Giá gốc:</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(calculateSubTotal())}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4 text-green-600">
                    <span>Giảm giá:</span>
                    <span className="font-medium">
                      -
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(calculateDiscount())}
                    </span>
                  </div>

                  <Divider className="my-4" />

                  <div className="flex justify-between items-end mb-6">
                    <span className="font-bold text-gray-800 text-lg">
                      Tổng cộng:
                    </span>
                    <span className="font-extrabold text-3xl text-indigo-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalAmount)}
                    </span>
                  </div>

                  <div className="mb-6">
                    <Form layout="inline" className="w-full flex gap-2">
                      <Input
                        placeholder="Nhập mã giảm giá"
                        prefix={<GiftOutlined className="text-gray-400" />}
                        className="flex-1"
                      />
                      <Button>Áp dụng</Button>
                    </Form>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    block
                    className="h-14 text-lg font-bold bg-indigo-600 hover:!bg-indigo-700 shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-1"
                    onClick={handleCheckout}
                    loading={loadingPay}
                  >
                    THANH TOÁN NGAY
                  </Button>

                  <div className="mt-4 text-xs text-gray-500 text-center space-y-1">
                    <p className="flex justify-center items-center gap-1">
                      <SafetyCertificateOutlined className="text-green-500" />{" "}
                      Hoàn tiền trong 30 ngày nếu không hài lòng
                    </p>
                    <p>Bảo mật thanh toán SSL được chứng nhận</p>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

      {/* MODAL THANH TOÁN */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={600}
        bodyStyle={{ padding: 0 }}
        mask={true}
        maskStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
        }}
      >
        <div className="p-6">
          <Title level={3} className="text-center mb-6">
            Cổng Thanh Toán
          </Title>

          <Tabs
            defaultActiveKey="qr"
            centered
            onChange={setPaymentMethod}
            items={[
              {
                key: "qr",
                label: (
                  <span className="flex items-center gap-2">
                    <BankOutlined /> QR Code (Nhanh)
                  </span>
                ),
                children: (
                  <div className="flex flex-col items-center animate-fade-in">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center mb-4 w-full">
                      <p className="text-blue-800 mb-1 font-medium">
                        Quét mã bằng app ngân hàng / Momo
                      </p>
                      <p className="text-xs text-gray-500">
                        Hệ thống tự động điền thông tin chuyển khoản
                      </p>
                    </div>

                    <div className="border-2 border-indigo-100 rounded-xl p-2 shadow-sm mb-4 bg-white">
                      <img
                        src={qrCodeUrl}
                        alt="VietQR"
                        className="w-64 h-auto"
                      />
                    </div>

                    <div className="w-full bg-gray-50 p-4 rounded-lg space-y-2 mb-6 text-sm">
                      <div className="flex justify-between border-b pb-2 border-dashed border-gray-300">
                        <span className="text-gray-500">Chủ tài khoản:</span>
                        <span className="font-bold text-gray-800 uppercase">
                          {MY_BANK.ACCOUNT_NAME}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-gray-500">Số tiền:</span>
                        <span className="font-bold text-xl text-indigo-700">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalAmount)}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="primary"
                      size="large"
                      block
                      className="bg-green-600 hover:!bg-green-700 h-12 text-lg font-bold"
                      onClick={handlePaymentSuccess}
                      loading={loadingPay}
                    >
                      TÔI ĐÃ CHUYỂN KHOẢN
                    </Button>
                  </div>
                ),
              },
              {
                key: "card",
                label: (
                  <span className="flex items-center gap-2">
                    <CreditCardOutlined /> Thẻ quốc tế
                  </span>
                ),
                children: (
                  <div className="pt-4">
                    <Form layout="vertical" onFinish={handlePaymentSuccess}>
                      <Form.Item label="Số thẻ Visa/Mastercard" required>
                        <Input
                          prefix={<CreditCardOutlined />}
                          placeholder="0000 0000 0000 0000"
                          size="large"
                        />
                      </Form.Item>
                      <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Ngày hết hạn" required>
                          <Input placeholder="MM/YY" size="large" />
                        </Form.Item>
                        <Form.Item label="CVV" required>
                          <Input placeholder="123" size="large" />
                        </Form.Item>
                      </div>
                      <Form.Item label="Tên chủ thẻ" required>
                        <Input placeholder="NGUYEN VAN A" size="large" />
                      </Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        className="bg-indigo-600 h-12 mt-2 font-bold"
                        loading={loadingPay}
                      >
                        Thanh toán{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(totalAmount)}
                      </Button>
                    </Form>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Modal>

      {/* LOADING OVERLAY */}
      {loadingPay && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center">
            <Spin size="large" />
            <p className="mt-4 text-indigo-600 font-bold text-lg animate-pulse">
              Đang xử lý giao dịch...
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Vui lòng không tắt trình duyệt
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
