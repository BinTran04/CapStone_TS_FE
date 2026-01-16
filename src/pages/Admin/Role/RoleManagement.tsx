import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Tag,
  Space,
  Drawer,
  Form,
  Tree,
  message,
  Typography,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  SafetyCertificateOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  initialRoles,
  permissionTree,
  type Role,
} from "../../../mockData/mockData";

const { Title, Text } = Typography;

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();

  // --- LOGIC HANDLE ---
  const handleEdit = (role: Role) => {
    setEditingRole(role);
    // Nếu là super admin, check hết, ngược lại map đúng key
    if (role.permissions.includes("all")) {
      // Logic giả định check hết
      setCheckedKeys(
        permissionTree.flatMap((p) =>
          p.children ? p.children.map((c) => c.key) : [p.key]
        )
      );
    } else {
      setCheckedKeys(role.permissions);
    }
    form.setFieldsValue(role);
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    setEditingRole(null);
    setCheckedKeys([]);
    form.resetFields();
    setIsDrawerOpen(true);
  };

  const onCheck = (checked: any) => {
    setCheckedKeys(checked);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newPermissions = checkedKeys as string[];

      if (editingRole) {
        // Update logic
        const updatedRoles = roles.map((r) =>
          r.id === editingRole.id
            ? { ...r, ...values, permissions: newPermissions }
            : r
        );
        setRoles(updatedRoles);
        message.success("Cập nhật vai trò thành công!");
      } else {
        // Create logic
        const newRole: Role = {
          id: `ROLE_${Date.now()}`,
          userCount: 0,
          status: "active",
          permissions: newPermissions,
          ...values,
        };
        setRoles([...roles, newRole]);
        message.success("Tạo vai trò mới thành công!");
      }
      setIsDrawerOpen(false);
    });
  };

  const handleDelete = (id: string) => {
    setRoles(roles.filter((r) => r.id !== id));
    message.success("Đã xóa vai trò");
  };

  // COLUMNS
  const columns: ColumnsType<Role> = [
    {
      title: "Tên Vai trò",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span className="font-bold text-indigo-700">{text}</span>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "Số nhân sự",
      dataIndex: "userCount",
      key: "userCount",
      render: (count) => (
        <Tag icon={<UsergroupAddOutlined />} color="blue">
          {count} users
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "default"}>
          {status === "active" ? "Đang hoạt động" : "Vô hiệu hóa"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-600"
            onClick={() => handleEdit(record)}
          />
          {record.id !== "SUPER_ADMIN" && (
            <Popconfirm
              title="Xóa vai trò này?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="text-red-500"
              />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>
            Hệ thống Phân quyền
          </Title>
          <Text type="secondary">
            Quản lý vai trò và giới hạn quyền truy cập
          </Text>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Thêm vai trò
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <Input
          placeholder="Tìm kiếm vai trò..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="mb-4 max-w-md"
          size="large"
        />
        <Table
          columns={columns}
          dataSource={roles}
          rowKey="id"
          pagination={false}
        />
      </div>

      {/* EDIT PERMISSIONS */}
      <Drawer
        title={
          editingRole ? `Chỉnh sửa: ${editingRole.name}` : "Thêm vai trò mới"
        }
        width={600}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        extra={
          <Button type="primary" onClick={handleSave}>
            Lưu cấu hình
          </Button>
        }
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Tên vai trò"
            rules={[{ required: true, message: "Vui lòng nhập tên vai trò" }]}
          >
            <Input placeholder="Ví dụ: Nhân viên Marketing" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea
              rows={2}
              placeholder="Mô tả nhiệm vụ của vai trò này..."
            />
          </Form.Item>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-medium">Phân quyền chi tiết</span>
              <Tooltip title="Chọn các chức năng mà vai trò này được phép truy cập">
                <InfoCircleOutlined className="text-gray-400" />
              </Tooltip>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <Tree
                checkable
                defaultExpandAll
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                treeData={permissionTree}
                fieldNames={{
                  title: "title",
                  key: "key",
                  children: "children",
                }}
              />
            </div>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default RoleManagement;
