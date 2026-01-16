import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Table, message, Popconfirm, Tag } from "antd";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { userService } from "../../services/userService";
import { courseService } from "../../services/courseService";
import type { Course } from "../../types/courseTypes";
import type { UserAdmin } from "../../types/userTypes";

interface CourseEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null; // Khóa học đang được chọn
}

const CourseEnrollmentModal: React.FC<CourseEnrollmentModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  const [unenrolledUsers, setUnenrolledUsers] = useState<UserAdmin[]>([]);
  const [enrolledStudents, setEnrolledStudents] = useState<UserAdmin[]>([]);
  const [selectedUserAccount, setSelectedUserAccount] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const fetchEnrollmentData = async () => {
    if (!course) return;
    setLoading(true);
    try {
      // 1. Lấy danh sách User CHƯA ghi danh vào khóa này
      const resUnenrolled = await userService.getUnenrolledUsers(
        course.maKhoaHoc
      );
      setUnenrolledUsers(resUnenrolled.data);

      // 2. Lấy danh sách Học viên ĐÃ ghi danh vào khóa này
      const resEnrolled = await courseService.getStudentsByCourse(
        course.maKhoaHoc
      );
      setEnrolledStudents(resEnrolled.data);
    } catch (error) {
      console.error(error);
      // Không báo lỗi 404 để tránh spam
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && course) {
      fetchEnrollmentData();
      setSelectedUserAccount(null);
    }
  }, [isOpen, course]);

  // Ghi danh User vào Khóa học
  const handleRegister = async () => {
    if (!selectedUserAccount || !course) return;
    try {
      await userService.registerCourse({
        maKhoaHoc: course.maKhoaHoc,
        taiKhoan: selectedUserAccount,
      });
      message.success("Ghi danh thành công!");
      fetchEnrollmentData();
      setSelectedUserAccount(null);
    } catch (error: any) {
      message.error(error.response?.data || "Ghi danh thất bại!");
    }
  };

  // Hủy ghi danh (Xóa User khỏi Khóa học)
  const handleCancel = async (taiKhoan: string) => {
    if (!course) return;
    try {
      await userService.cancelCourse({
        maKhoaHoc: course.maKhoaHoc,
        taiKhoan: taiKhoan,
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
    { title: "Tài khoản", dataIndex: "taiKhoan", key: "taiKhoan" },
    { title: "Họ tên", dataIndex: "hoTen", key: "hoTen" },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: UserAdmin) => (
        <Popconfirm
          title="Xóa học viên?"
          description={`Bạn muốn xóa ${record.hoTen} khỏi khóa học?`}
          onConfirm={() => handleCancel(record.taiKhoan)}
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
        >
          <Button danger size="small" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Modal
      title={`Quản lý học viên - Khóa: ${course?.tenKhoaHoc}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="space-y-6">
        {/* Phần 1: Chọn User để thêm */}
        <div className="flex gap-4 items-end border-b pb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn người dùng để ghi danh
            </label>
            <Select
              className="w-full"
              placeholder="Tìm kiếm tài khoản hoặc họ tên..."
              showSearch
              optionFilterProp="children"
              value={selectedUserAccount}
              onChange={(val) => setSelectedUserAccount(val)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={unenrolledUsers.map((u) => ({
                value: u.taiKhoan,
                label: `${u.hoTen} (${u.taiKhoan})`,
              }))}
            />
          </div>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handleRegister}
            disabled={!selectedUserAccount}
          >
            Ghi danh
          </Button>
        </div>

        {/* Phần 2: Danh sách Học viên hiện tại */}
        <div>
          <h3 className="text-lg font-medium mb-3">
            Danh sách học viên ({enrolledStudents.length})
          </h3>
          <Table
            dataSource={enrolledStudents}
            columns={columns}
            rowKey="taiKhoan"
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

export default CourseEnrollmentModal;
