import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Icon, Layout } from "antd";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./style.css";
const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    ref: "/dashboard",
  },
];

const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const selectedMenuItem = menuItems.filter(
    ({ label }) => location.pathname.search(label.toLowerCase()) > 0
  );

  const userData = JSON.parse(localStorage.getItem("userData"));

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="1">
        <a
          onClick={(e) => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[
            selectedMenuItem.length > 0 ? selectedMenuItem[0].key : "1",
          ]}
        >
          {menuItems.map(({ key, icon, label, ref }) => (
            <Menu.Item key={key} icon={icon}>
              <Link to={ref} />
              {label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="header-menu">
            <a href="#">Home</a>

            <Dropdown overlay={dropdownMenu} trigger={["click"]}>
              <a className="ant-dropdown-link" href="#">
                {userData.email}
                <CaretDownOutlined />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          className="content-bg"
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100%",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
