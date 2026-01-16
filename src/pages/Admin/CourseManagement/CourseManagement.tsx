import React, { useEffect, useState } from "react";
import { Table, Button, Input, message, Popconfirm, Image, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { courseService } from "../../../services/courseService";
import type { Course } from "../../../types/courseTypes";
import useDebounce from "../../../hooks/useDebounce";
import CourseModal from "../../../components/Admin/CourseModal";
import CourseEnrollmentModal from "../../../components/Admin/CourseEnrollmentModal";

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] =
    useState<Course | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // API search khóa học và list khóa học chung 1 logic lấy list rồi filter client hoặc api search riêng
      // Ở đây gọi list rồi filter tạm
      const res = await courseService.getCourseList();
      let data = res.data;

      if (debouncedSearchTerm) {
        data = data.filter((c) =>
          c.tenKhoaHoc.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      }
      setCourses(data);
    } catch (error) {
      message.error("Lỗi tải danh sách khóa học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [debouncedSearchTerm]);

  const handleDelete = async (maKhoaHoc: string) => {
    try {
      await courseService.deleteCourse(maKhoaHoc);
      message.success("Xóa khóa học thành công");
      fetchCourses();
    } catch (error: any) {
      message.error(error.response?.data || "Xóa thất bại");
    }
  };

  const columns: ColumnsType<Course> = [
    { title: "STT", key: "stt", width: 50, render: (_, __, i) => i + 1 },
    { title: "Mã KH", dataIndex: "maKhoaHoc", width: 100 },
    { title: "Tên khóa học", dataIndex: "tenKhoaHoc", width: 200 },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      width: 100,
      render: (url) => <Image src={url} width={80} />,
    },
    { title: "Lượt xem", dataIndex: "luotXem", width: 100 },
    { title: "Người tạo", dataIndex: ["nguoiTao", "hoTen"], width: 150 },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="default"
            size="small"
            className="text-green-600 border-green-600 hover:!text-green-500 hover:!border-green-500"
            onClick={() => {
              setSelectedCourseForEnroll(record);
              setIsEnrollModalOpen(true);
            }}
          >
            Ghi danh
          </Button>
          <Button
            type="primary"
            ghost
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedCourse(record);
              setIsModalOpen(true);
            }}
          />
          <Popconfirm
            title="Xóa?"
            onConfirm={() => handleDelete(record.maKhoaHoc)}
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Quản Lý Khóa Học</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => {
            setSelectedCourse(null);
            setIsModalOpen(true);
          }}
        >
          Thêm khóa học
        </Button>
      </div>

      <Input
        placeholder="Tìm kiếm khóa học..."
        prefix={<SearchOutlined />}
        className="mb-4"
        size="large"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={courses}
        rowKey="maKhoaHoc"
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1000 }}
        bordered
      />

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCourses}
        currentCourse={selectedCourse}
      />

      <CourseEnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        course={selectedCourseForEnroll}
      />
    </div>
  );
};

export default CourseManagement;
