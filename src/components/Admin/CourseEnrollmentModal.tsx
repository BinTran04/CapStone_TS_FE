import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Table, message, Popconfirm, Tag } from "antd";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { userService } from "../../services/userService";
import type { Course } from "../../types/courseTypes";
import type { UserAdmin } from "../../types/userTypes";

interface CourseEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

const CourseEnrollmentModal: React.FC<CourseEnrollmentModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  const [unenrolledUsers, setUnenrolledUsers] = useState<UserAdmin[]>([]);
  const [enrolledStudents, setEnrolledStudents] = useState<UserAdmin[]>([]);
  const [selectedUserAccount, setSelectedUserAccount] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const fetchEnrollmentData = async () => {
    if (!course) return;
    setLoading(true);
    try {
      // Lấy danh sách User CHƯA ghi danh
      const resUnenrolled = await userService.getUnenrolledUsers(
        course.maKhoaHoc,
      );
      setUnenrolledUsers(resUnenrolled.data);

      // Lấy danh sách User ĐÃ ghi danh
      const resEnrolled = await userService.getEnrolledStudents(
        course.maKhoaHoc,
      );
      setEnrolledStudents(resEnrolled.data);
    } catch (error) {
      console.error(error);
      // API có thể trả lỗi nếu danh sách rỗng, et rỗng để không crash
      setEnrolledStudents([]);
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

  // Xử lý Ghi danh
  const handleRegister = async () => {
    if (!course || !selectedUserAccount) return;
    try {
      await userService.registerCourse({
        maKhoaHoc: course.maKhoaHoc,
        taiKhoan: selectedUserAccount,
      });
      message.success("Ghi danh thành công");
      fetchEnrollmentData();
      setSelectedUserAccount(null);
    } catch (error: any) {
      message.error(error.response?.data || "Ghi danh thất bại");
    }
  };

  // Xử lý Hủy ghi danh
  const handleDelete = async (userAccount: string) => {
    if (!course) return;
    try {
      await userService.cancelRegistration({
        maKhoaHoc: course.maKhoaHoc,
        taiKhoan: userAccount,
      });
      message.success("Hủy ghi danh thành công");
      fetchEnrollmentData();
    } catch (error: any) {
      message.error(error.response?.data || "Hủy thất bại");
    }
  };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: UserAdmin) => (
        <Popconfirm
          title="Xóa học viên khỏi khóa học?"
          onConfirm={() => handleDelete(record.taiKhoan)}
          okText="Có"
          cancelText="Không"
        >
          <Button danger icon={<DeleteOutlined />} size="small">
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Modal
      title={`Quản lý học viên - ${course?.tenKhoaHoc}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="space-y-6">
        {/* Thêm Học viên */}
        <div className="flex gap-4 items-end border-b pb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thêm học viên
            </label>
            <Select
              className="w-full"
              placeholder="Tìm kiếm tài khoản hoặc họ tên..."
              showSearch
              optionFilterProp="label"
              value={selectedUserAccount}
              onChange={(val) => setSelectedUserAccount(val)}
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

        {/* Danh sách Học viên hiện tại */}
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
