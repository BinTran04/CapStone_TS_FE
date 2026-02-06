import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Table, message, Popconfirm, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { userService } from "../../services/userService";
import type { UserAdmin } from "../../types/userTypes";
import type { Course } from "../../types/courseTypes";
import type { CourseUser } from "../../types/userTypes";

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

  // Hàm lấy dữ liệu
  const fetchEnrollmentData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Lấy danh sách khóa học CHƯA ghi danh
      const resUnreg = await userService.getUnregisteredCourses(user.taiKhoan);
      setUnregisteredCourses(resUnreg.data);

      // Lấy danh sách khóa học ĐÃ ghi danh
      const resReg = await userService.getRegisteredCourses(user.taiKhoan);
      setRegisteredCourses(resReg.data);
    } catch (error) {
      console.error(error);
      message.error("Lỗi tải dữ liệu ghi danh");
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

  // Xử lý Ghi danh
  const handleRegister = async () => {
    if (!user || !selectedCourseId) return;
    try {
      await userService.registerCourse({
        maKhoaHoc: selectedCourseId,
        taiKhoan: user.taiKhoan,
      });
      message.success("Ghi danh thành công");
      fetchEnrollmentData();
      setSelectedCourseId(null);
    } catch (error: any) {
      message.error(error.response?.data || "Ghi danh thất bại");
    }
  };

  // Xử lý Hủy ghi danh
  const handleDelete = async (courseId: string) => {
    if (!user) return;
    try {
      await userService.cancelRegistration({
        maKhoaHoc: courseId,
        taiKhoan: user.taiKhoan,
      });
      message.success("Hủy ghi danh thành công");
      fetchEnrollmentData();
    } catch (error: any) {
      message.error(error.response?.data || "Hủy thất bại");
    }
  };

  const columns = [
    {
      title: "Mã KH",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      width: 100,
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Hành động",
      key: "action",
      width: 100,
      render: (_: any, record: CourseUser) => (
        <Popconfirm
          title="Bạn chắc chắn muốn hủy ghi danh?"
          onConfirm={() => handleDelete(record.maKhoaHoc)}
          okText="Có"
          cancelText="Không"
        >
          <Button danger icon={<DeleteOutlined />} size="small">
            Hủy
          </Button>
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
              filterOption={(input, option) =>
                (String(option?.children) ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
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

        {/* Bảng danh sách đã ghi danh */}
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
