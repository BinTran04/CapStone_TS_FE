import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Table, message, Popconfirm, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { userService } from "../../services/userService";
import type { UserAdmin, CourseUser } from "../../types/userTypes";
import type { Course } from "../../types/courseTypes";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAdmin | null;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [unregisteredCourses, setUnregisteredCourses] = useState<Course[]>([]);
  const [registeredCourses, setRegisteredCourses] = useState<CourseUser[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEnrollmentData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // 1. Lấy danh sách CHƯA ghi danh
      const resUnreg = await userService.getUnregisteredCourses(user.taiKhoan);
      setUnregisteredCourses(resUnreg.data);

      // 2. SỬA: Gọi hàm getRegisteredCourses thay vì getUserDetail
      const resReg = await userService.getRegisteredCourses(user.taiKhoan);
      // API này trả về mảng trực tiếp, không cần .chiTietKhoaHocGhiDanh
      setRegisteredCourses(resReg.data);
    } catch (error) {
      console.error(error);
      // Không cần báo lỗi 404 nếu user chưa có khóa học nào
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      fetchEnrollmentData();
      setSelectedCourseId(null);
    }
  }, [isOpen, user]);

  const handleRegister = async () => {
    if (!selectedCourseId || !user) return;
    try {
      await userService.registerCourse({
        maKhoaHoc: selectedCourseId,
        taiKhoan: user.taiKhoan,
      });
      message.success("Ghi danh thành công!");
      fetchEnrollmentData();
      setSelectedCourseId(null);
    } catch (error: any) {
      message.error(error.response?.data || "Ghi danh thất bại!");
    }
  };

  const handleCancel = async (maKhoaHoc: string) => {
    if (!user) return;
    try {
      await userService.cancelCourse({
        maKhoaHoc: maKhoaHoc,
        taiKhoan: user.taiKhoan,
      });
      message.success("Hủy ghi danh thành công!");
      fetchEnrollmentData();
    } catch (error: any) {
      message.error(error.response?.data || "Hủy thất bại!");
    }
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Trạng thái", // Sửa header cho rõ nghĩa
      key: "status",
      render: () => <Tag color="green">Đã ghi danh</Tag>,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: CourseUser) => (
        <Popconfirm
          title="Hủy ghi danh?"
          onConfirm={() => handleCancel(record.maKhoaHoc)}
          okText="Đồng ý"
          cancelText="Không"
          okButtonProps={{ danger: true }}
        >
          <Button danger size="small" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Modal
      title={`Quản lý ghi danh - ${user?.hoTen}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="space-y-6">
        <div className="flex gap-4 items-end border-b pb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn khóa học
            </label>
            <Select
              className="w-full"
              placeholder="Tìm kiếm khóa học..."
              showSearch
              optionFilterProp="children"
              value={selectedCourseId}
              onChange={(val) => setSelectedCourseId(val)}
            >
              {unregisteredCourses.map((course) => (
                <Select.Option key={course.maKhoaHoc} value={course.maKhoaHoc}>
                  {course.tenKhoaHoc}
                </Select.Option>
              ))}
            </Select>
          </div>
          <Button
            type="primary"
            onClick={handleRegister}
            disabled={!selectedCourseId}
          >
            Ghi danh
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Khóa học đã ghi danh</h3>
          <Table
            dataSource={registeredCourses}
            columns={columns}
            rowKey="maKhoaHoc"
            pagination={{ pageSize: 5 }}
            loading={loading}
            size="small"
            bordered
          />
        </div>
      </div>
    </Modal>
  );
};

export default EnrollmentModal;
