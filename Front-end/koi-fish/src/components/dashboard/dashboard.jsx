import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FileOutlined,
  UserOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Modal, Image } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
import { FaFileInvoiceDollar } from "react-icons/fa";
import { GiCirclingFish } from "react-icons/gi";
import { SiSpond } from "react-icons/si";
import { BiSolidPackage } from "react-icons/bi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import DashboardContainer from "../admin-dashboard/DashboardContainer";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: key ? <Link to={`/dashboard/${key}`}>{label}</Link> : label,
  };
}
const items = [
  getItem("Home", "home", <HomeOutlined />),
  getItem("Statistical Chart", "", <AreaChartOutlined />),
  getItem("Manage Member", "member", <UserOutlined />),
  getItem("Manage Pond", "pond", <SiSpond />),
  getItem("Manage Koi", "koi", <GiCirclingFish />),
  getItem("Manage Orders", "order", <FaFileInvoiceDollar />),
  getItem("Manage Package", "package", <BiSolidPackage/> ),
  getItem("Manage Post", null, <FileOutlined />, [
    getItem("Manage News", "post/news"),
    getItem("Manage Blog", "post/blog"),
    getItem("Manage Ads", "post/ads"),
  ]),
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({});
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [avatarImage, setavatarImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const showDashboard = location.pathname === "/dashboard"; // Thay đổi đường dẫn này nếu cần
  // USE Effect
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token"); // Get token from storage
      const user = JSON.parse(localStorage.getItem("user"));
      const userRole = user ? user.admin : false;
      if (!token) {
        // No token found, redirect to login
        console.log("No token found");
        toast.error("No token found!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);

        return;
      }

      if (userRole === false) {
        toast.error("You don't have permission to access this page");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        return;
      }
      console.log(jwtDecode(token));
      console.log(Date.now() / 1000);

      const tokenDecode = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log(tokenDecode.exp);
      if (tokenDecode.exp > currentTime) {
        console.log("token con han");
      } else {
        toast.error("Expired token! Please login again");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };
    checkTokenValidity();
    // Call the function when the component mounts
  }, [navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(user);
    setavatarImage(user.avatar);
  }, []);

  const handleNavigateProfile = () => {
    console.log("navigate profile");

    navigate("/profile");
  };
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const handleLogOut = () => {
    setShowModal(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");

    navigate("/login");
  };

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
        <div
          className="demo-logo-vertical"
          style={{ padding: "16px", textAlign: "center" }}
        >
          <Image
            src="https://res.cloudinary.com/ddqgjy50x/image/upload/v1729487633/di410srj2wapvp8ldyg8.jpg"
            alt="Logo"
            style={{
              borderRadius: "50%",
              width: collapsed ? "40px" : "60px",
              transition: "width 0.2s",
            }}
          />
          {!collapsed && (
            <h2 style={{ color: "white", marginTop: "8px" }}>
              <strong>Feng Shui Koi Consultant</strong>
            </h2>
          )}
        </div>
        <div className="mt-7">
          <Menu
            theme="dark "
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items.map((item) => {
              if (item.key === "home") {
                return {
                  ...item,
                  label: <Link to="/">Home</Link>, // Define the link separately
                };
              }
              if (item.key === "") {
                return {
                  ...item,
                  label: <Link to="/dashboard">Statistical Chart</Link>, // Define the link separately
                };
              }
              return item;
            })}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex w-full h-full justify-end">
            <div className="flex ">
              <Menu>
                <Menu.SubMenu
                  title={
                    <div className="container flex items-center gap-3 ">
                      {/* Neu  co avatar trong user thi co hình còn không sẽ xuất hiện một icons  */}
                      {avatarImage ? (
                        <img
                          className="w-5 h-5 mr-5"
                          src={user.avatar}
                          alt=""
                        />
                      ) : (
                        <p>
                          {" "}
                          <UserOutlined />
                        </p>
                      )}

                      <span className="username ">
                        {user ? user.userName : ""}
                      </span>
                    </div>
                  }
                >
                  <Menu.Item key="about-us" onClick={handleNavigateProfile}>
                    <UserOutlined className="pr-2" /> Profile
                  </Menu.Item>
                  <Menu.Item key="log-out" onClick={handleShowModal}>
                    <LogoutOutlined className="pr-2" /> Logout
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          </div>
        </Header>
        {/* modal logout  */}
        <Modal
          title="Confirm Logout"
          open={showModal}
          onOk={handleLogOut}
          onCancel={handleShowModal}
          okText="Yes"
          cancelText="Cancel"
          icon={<ExclamationCircleOutlined />}
        >
          <p>Are you sure you want to log out?</p>
        </Modal>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {showDashboard && <DashboardContainer />}
          <div
            style={{
              padding: 1,
              minHeight: 3,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="light"
            />

            <Outlet />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Dashboard ©2024 Created by Feng Shui Koi Consulting
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
