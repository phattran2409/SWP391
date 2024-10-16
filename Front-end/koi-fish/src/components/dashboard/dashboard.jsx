import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet , useLocation } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: key ? <Link to={`/dashboard/${key}`}>{label}</Link> : label,
  };
}
const items = [
  getItem("Manage Member", "member", <UserOutlined/>),
  getItem("Manage Pond", "pond", <PieChartOutlined />),
  getItem("Manage Koi", "koi", <PieChartOutlined />),
  getItem("Manage Post", null, <FileOutlined/> , [
    getItem("Manage News", "post/news"),
    getItem("Manage Blog", "post/blog"),
    getItem("Manage Ads", "post/ads"),
  ]),
];

 // path

 const pathSnippets = location.pathname.split("/").filter((i) => i);
  

const Dashboard = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    console.log(location.pathname);
    
  } , [location.pathname])

  
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            
            
             {
              pathSnippets.map((_, index) => (
                <Breadcrumb.Item>
                    {pathSnippets[index]}
                </Breadcrumb.Item>
              ))
             }
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Hello
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
