import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const { Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Sider width={250} theme="dark">
        <div className="text-white p-4 font-bold text-xl">CyberSoft Amin</div>
      </Sider>
      <Layout>
        <header className="bg-white p-4 shadow mb-4">Admin Header</header>
        <Content className="m-4 bg-white p-4 rounded shadow">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
