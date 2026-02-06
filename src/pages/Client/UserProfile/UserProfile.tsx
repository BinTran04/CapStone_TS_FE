import React, { useEffect, useState } from "react";
import { userService } from "../../../services/userService";
import type { UserInfo } from "../../../types/userTypes";
import {
  Spin,
  Card,
  Avatar,
  Tabs,
  List,
  Tag,
  Button,
  Descriptions,
  Empty,
  Progress,
  Modal,
  Form,
  Input,
  message,
  Divider,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  LogoutOutlined,
  CameraOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
  EditOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  LockOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Hàm lấy dữ liệu user
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await userService.getUserInfo();
      setUserInfo(res.data);
    } catch (error) {
      console.error("Lỗi lấy thông tin user:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  // Khi mở Modal thì điền dữ liệu cũ vào Form
  useEffect(() => {
    if (isModalOpen && userInfo) {
      form.setFieldsValue({
        taiKhoan: userInfo.taiKhoan,
        hoTen: userInfo.hoTen,
        email: userInfo.email,
        soDT: userInfo.soDT,
        maNhom: userInfo.maNhom,
        maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
      });
    }
  }, [isModalOpen, userInfo, form]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  // XỬ LÝ CẬP NHẬT THÔNG TIN
  const handleUpdate = async (values: any) => {
    try {
      setUpdating(true);
      // Gọi API cập nhật
      await userService.updateUserInfo(values);

      message.success("Cập nhật thông tin thành công!");
      setIsModalOpen(false);

      // Load lại dữ liệu mới
      fetchUserData();
    } catch (error: any) {
      console.error(error);
      message.error(error.response?.data || "Cập nhật thất bại!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <Spin size="large" tip="Đang tải dữ liệu học tập..." />
      </div>
    );
  }

  if (!userInfo) return null;

  // DASHBOARD KHÓA HỌC
  const MyCoursesTab = () => (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 m-0">
            Tiến độ học tập
          </h3>
          <span className="text-gray-500">
            Bạn đang tham gia {userInfo.chiTietKhoaHocGhiDanh?.length || 0} khóa
            học
          </span>
        </div>
        <Button type="default" shape="round" icon={<BookOutlined />}>
          Xem tất cả
        </Button>
      </div>

      {userInfo.chiTietKhoaHocGhiDanh &&
      userInfo.chiTietKhoaHocGhiDanh.length > 0 ? (
        <List
          grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
          dataSource={userInfo.chiTietKhoaHocGhiDanh}
          renderItem={(item) => {
            const randomProgress = Math.floor(Math.random() * (90 - 10) + 10);
            return (
              <List.Item className="h-full">
                <Card
                  hoverable
                  className="h-full flex flex-col rounded-2xl border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  bodyStyle={{
                    padding: "16px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  cover={
                    <div className="h-44 overflow-hidden relative group">
                      <img
                        alt={item.tenKhoaHoc}
                        src={item.hinhAnh}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all"></div>
                    </div>
                  }
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <div className="mb-3">
                        <h4
                          className="text-base font-bold text-gray-800 line-clamp-2 min-h-[48px] mb-1"
                          title={item.tenKhoaHoc}
                        >
                          {item.tenKhoaHoc}
                        </h4>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <ClockCircleOutlined /> Đăng ký:{" "}
                          {new Date().toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Hoàn thành</span>
                          <span className="font-bold text-indigo-600">
                            {randomProgress}%
                          </span>
                        </div>
                        <Progress
                          percent={randomProgress}
                          showInfo={false}
                          strokeColor={{ from: "#4f46e5", to: "#a855f7" }}
                          size="small"
                        />
                      </div>
                    </div>
                    <div className="mt-auto pt-2">
                      <Button
                        type="primary"
                        size="large"
                        className="w-full font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 border-none hover:shadow-lg transition-all h-10"
                        onClick={() => navigate(`/learning/${item.maKhoaHoc}`)}
                      >
                        Vào học ngay
                      </Button>
                    </div>
                  </div>
                </Card>
              </List.Item>
            );
          }}
        />
      ) : (
        <div className="bg-gray-50 rounded-2xl p-10 text-center border border-dashed border-gray-300">
          <Empty description="Bạn chưa đăng ký khóa học nào." />
          <Button
            type="primary"
            className="mt-4 bg-indigo-600"
            onClick={() => navigate("/")}
          >
            Khám phá khóa học ngay
          </Button>
        </div>
      )}
    </div>
  );

  // THÔNG TIN CÁ NHÂN
  const PersonalInfoTab = () => (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 m-0">
          Thông tin chi tiết
        </h3>
        {/* NÚT MỞ MODAL CHỈNH SỬA */}
        <Button
          icon={<EditOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium"
        >
          Chỉnh sửa hồ sơ
        </Button>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <Descriptions
          column={1}
          labelStyle={{ color: "#6b7280", width: "160px" }}
          contentStyle={{ fontWeight: 500, color: "#1f2937" }}
          size="middle"
        >
          <Descriptions.Item
            label={
              <>
                <UserOutlined className="mr-2" /> Tài khoản
              </>
            }
          >
            {userInfo.taiKhoan}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <SafetyCertificateOutlined className="mr-2" /> Họ và tên
              </>
            }
          >
            {userInfo.hoTen}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <MailOutlined className="mr-2" /> Email
              </>
            }
          >
            {userInfo.email}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <PhoneOutlined className="mr-2" /> Số điện thoại
              </>
            }
          >
            {userInfo.soDT}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <TrophyOutlined className="mr-2" /> Vai trò
              </>
            }
          >
            <Tag
              color={userInfo.maLoaiNguoiDung === "GV" ? "gold" : "blue"}
              className="rounded-full px-3"
            >
              {userInfo.maLoaiNguoiDung === "GV" ? "Giảng viên" : "Học viên"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <EnvironmentOutlined className="mr-2" /> Mã nhóm
              </>
            }
          >
            {userInfo.maNhom}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );

  const tabItems = [
    {
      key: "1",
      label: <span className="font-semibold px-2">Khóa học của tôi</span>,
      children: <MyCoursesTab />,
    },
    {
      key: "2",
      label: <span className="font-semibold px-2">Hồ sơ cá nhân</span>,
      children: <PersonalInfoTab />,
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-700 relative">
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CỘT TRÁI: INFO CARD */}
          <div className="lg:col-span-4">
            <Card
              className="shadow-lg border-none rounded-2xl overflow-hidden sticky top-24"
              bodyStyle={{ padding: 0 }}
            >
              <div className="h-28 bg-[url('https://img.freepik.com/free-vector/gradient-geometric-shapes-dark-background_23-2148433740.jpg')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-indigo-900/30"></div>
              </div>
              <div className="text-center px-6 pb-6 relative">
                <div className="relative inline-block -mt-16 mb-3">
                  <Avatar
                    size={120}
                    src={`https://ui-avatars.com/api/?name=${userInfo.hoTen}&background=e0e7ff&color=4f46e5&size=256`}
                    className="border-4 border-white shadow-md bg-white"
                    icon={<UserOutlined />}
                  />
                  <button className="absolute bottom-1 right-1 bg-gray-100 hover:bg-white text-gray-600 p-2 rounded-full shadow border border-gray-200 transition-all">
                    <CameraOutlined />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 m-0">
                  {userInfo.hoTen}
                </h2>
                <p className="text-gray-500 mt-1 mb-4">{userInfo.email}</p>
                <div className="flex flex-col gap-3">
                  <Button
                    size="large"
                    icon={<SettingOutlined />}
                    className="rounded-xl border-gray-300 hover:border-indigo-500 hover:text-indigo-600"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Cài đặt tài khoản
                  </Button>
                  <Button
                    size="large"
                    icon={<LogoutOutlined />}
                    danger
                    className="rounded-xl"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* CỘT PHẢI: TABS */}
          <div className="lg:col-span-8">
            <div className="bg-white p-2 rounded-2xl">
              <Tabs
                defaultActiveKey="1"
                items={tabItems}
                size="large"
                className="custom-tabs"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={600}
        closeIcon={
          <CloseOutlined className="text-gray-400 hover:text-gray-600" />
        }
        bodyStyle={{ padding: 0 }}
        mask={true}
        maskStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
        }}
        className="profile-modal"
      >
        <div className="p-1">
          {/* Custom Header */}
          <div className="text-center mb-8 mt-2">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-600 text-xl">
              <EditOutlined />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 m-0">
              Cập nhật hồ sơ
            </h3>
            <p className="text-gray-500 mt-1">
              Quản lý thông tin cá nhân của bạn
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
            size="large"
          >
            {/* Các trường ẩn */}
            <Form.Item name="taiKhoan" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="maNhom" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="maLoaiNguoiDung" hidden>
              <Input />
            </Form.Item>

            {/* Họ và tên */}
            <Form.Item
              label={
                <span className="font-medium text-gray-700">Họ và tên</span>
              }
              name="hoTen"
              className="mb-6"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400 text-sm mr-1" />}
                placeholder="Nhập họ và tên của bạn"
                className="rounded-xl py-2.5 bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-all shadow-sm"
              />
            </Form.Item>

            {/* Grid: Email & SDT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <Form.Item
                label={<span className="font-medium text-gray-700">Email</span>}
                name="email"
                className="mb-6"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  prefix={
                    <MailOutlined className="text-gray-400 text-sm mr-1" />
                  }
                  placeholder="example@email.com"
                  className="rounded-xl py-2.5 bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-all shadow-sm"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="font-medium text-gray-700">
                    Số điện thoại
                  </span>
                }
                name="soDT"
                className="mb-6"
                rules={[
                  { required: true, message: "Vui lòng nhập SĐT" },
                  { pattern: /^[0-9]+$/, message: "SĐT chỉ chứa số" },
                ]}
              >
                <Input
                  prefix={
                    <PhoneOutlined className="text-gray-400 text-sm mr-1" />
                  }
                  placeholder="09xx xxx xxx"
                  className="rounded-xl py-2.5 bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-all shadow-sm"
                />
              </Form.Item>
            </div>

            {/* Mật khẩu */}
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-8">
              <Form.Item
                label={
                  <span className="font-medium text-gray-800">
                    Xác thực mật khẩu
                  </span>
                }
                name="matKhau"
                className="mb-0"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu để lưu" },
                ]}
              >
                <Input.Password
                  prefix={
                    <LockOutlined className="text-gray-400 text-sm mr-1" />
                  }
                  placeholder="Nhập mật khẩu để xác nhận..."
                  className="rounded-xl py-2.5 bg-white border-gray-200 shadow-sm"
                />
                <div className="text-xs text-gray-500 mt-2 ml-1">
                  <SafetyCertificateOutlined className="mr-1 text-orange-500" />
                  Cần nhập mật khẩu để bảo mật khi thay đổi thông tin
                </div>
              </Form.Item>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
              <Button
                size="large"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl px-6 border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-medium"
              >
                Hủy bỏ
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={updating}
                className="rounded-xl px-8 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 font-semibold border-none"
              >
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
