import React, { useEffect, useState } from "react";
import { Table, Button, Input, message, Popconfirm, Tag, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { userService } from "../../../services/userService";
import type { UserAdmin } from "../../../types/userTypes";
import useDebounce from "../../../hooks/useDebounce";
import UserModal from "../../../components/Admin/UserModal";
import EnrollmentModal from "../../../components/Admin/EnrollmentModal";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAdmin | null>(null);

  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedUserForEnroll, setSelectedUserForEnroll] =
    useState<UserAdmin | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Hàm gọi API lấy danh sách
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = debouncedSearchTerm
        ? await userService.searchUser(debouncedSearchTerm)
        : await userService.getUserList();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      message.error("Lỗi lấy danh sách người dùng!");
    } finally {
      setLoading(false);
    }
  };

  // Gọi lại API khi từ khóa search thay đổi
  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchTerm]);

  // Xử lý Xóa User
  const handleDelete = async (taiKhoan: string) => {
    try {
      await userService.deleteUser(taiKhoan);
      message.success("Xóa thành công!");
      fetchUsers();
    } catch (error: any) {
      message.error(error.response?.data || "Không thể xóa người dùng này!");
    }
  };

  const handleOpenAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: UserAdmin) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const columns: ColumnsType<UserAdmin> = [
    {
      title: "STT",
      key: "stt",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Số ĐT",
      dataIndex: "soDt",
      key: "soDT",
    },
    {
      title: "Loại",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (role) => (
        <Tag color={role === "GV" ? "red" : "blue"}>
          {role === "GV" ? "Giáo vụ" : "Học viên"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* Nút Ghi danh */}
          <Button
            type="default"
            size="small"
            className="text-green-600 border-green-600 hover:!text-green-500 hover:!border-green-500"
            onClick={() => {
              setSelectedUserForEnroll(record);
              setIsEnrollModalOpen(true);
            }}
          >
            Ghi danh
          </Button>

          {/* Nút Sửa */}
          <Button
            type="primary"
            ghost
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenEdit(record)}
          ></Button>

          {/* Nút Xóa */}
          <Popconfirm
            title="Xóa người dùng"
            description={`Bạn có chắc muốn xóa ${record.hoTen}?`}
            onConfirm={() => handleDelete(record.taiKhoan)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button danger size="small" icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Người Dùng</h2>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          size="large"
          onClick={handleOpenAdd}
          style={{ backgroundColor: "#1E90FF", borderColor: "#1E90FF" }}
        >
          Thêm người dùng
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Tìm kiếm tài khoản hoặc họ tên..."
          prefix={<SearchOutlined className="text-gray-400" />}
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="taiKhoan"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />

      {/* Component UserModal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchUsers}
        currentUser={selectedUser}
      />

      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        user={selectedUserForEnroll}
      />
    </div>
  );
};

export default UserManagement;
