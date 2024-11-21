import { useState, useEffect } from "react";
import { Search, Menu as Menu1, X, User } from "lucide-react";
import { json, Link, useNavigate } from "react-router-dom";
import { Menu, Avatar, Button, Modal, Image } from "antd";
import api from "../../config/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS của Toastify
import {
  UserOutlined,
  CodeOutlined,
  LogoutOutlined,
  StockOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import SuitableHistory from "./SuitableHistory/suitableHistory";  
import SearchBar from "../searchbar/SearchBar";

const Navbar = () => {
  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalLogOut, setIsModalLogOut] = useState(null); 
  const [showHistory, setShowHistory] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when pressing the "Esc" key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  // lấy user từ local Storage
  useEffect(() => {
    const storeUser = JSON.parse(localStorage.getItem("user"));
    if (storeUser) {
     fetchUserData(storeUser._id);
    setUser(storeUser); 
    
    }
    else {
      setUser(null);
     }
  }, []); 

  const fetchUserData = async (id) => {
    try {
      const response = await api.get(`v1/user/id=${id}`);
      const user = response.data;
      setUser(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    
    }
  }


  // show modal
  const showModal = () => {
    setIsModalLogOut(true);
  };
  // handleLogout
  const handleLogOut = async () => {
    setIsModalLogOut(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("elementUser");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("listSuitable");
    setUser(null);
    navigate("/home?status=logout_success");
     
    // toast.success("Logged out successfully");
  };
  // khi an cancle
  const handleCancel = () => {
    setIsModalLogOut(false);
  };

  // console.log("local  storage"+user.name);

  return (
    <nav className="sticky h-[84px] top-0 z-50 py-3 bg-black">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}

        <Link to={"/"} className="flex items-center space-x-5">
          <img
            src="https://res.cloudinary.com/ddqgjy50x/image/upload/v1729487633/di410srj2wapvp8ldyg8.jpg"
            alt="logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          />
          <span className="text-white text-lg font-semibold">
            Feng Shui Koi Consultant
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            aria-label="Toggle menu"
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu1 className="w-6 h-6" />}
          </button>
        </div>
        {/*  Cân thêm path */}
        {/* Main Nav for Large Screens */}
        <div className="hidden lg:flex items-center space-x-6">
          <ul className="flex space-x-8">
            <li>
              <Link to={"/"}>
                <p className="text-white hover:text-neutral-500 transition duration-300 cursor-pointer">
                  Home{" "}
                </p>
              </Link>
            </li>
            {!user?.memberStatus && (
              <li>
                <Link to={"/memberPackage"}>
                  <p className="text-white hover:text-neutral-500 transition duration-300 cursor-pointer">
                    Membership
                  </p>
                </Link>
              </li>
            )}
            <li>
              <Link to={"/consulting"}>
                <p className="text-white hover:text-neutral-500 transition duration-300 cursor-pointer">
                  Consulting
                </p>
              </Link>
            </li>

            <li className="relative group">
              <p className="text-white hover:text-neutral-500 transition duration-300 cursor-pointer">
                Categories
              </p>
              <ul className="absolute left-0 hidden group-hover:block bg-black ">
                <li>
                  <Link to="/news">
                    <p className="py-2 px-5 text-white hover:bg-neutral-800 hover:text-neutral-300 transition duration-300 cursor-pointer hover:border-white hover:border-2">
                      News
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/blog">
                    <p className="py-2 px-5 text-white hover:bg-neutral-800 hover:text-neutral-300 transition duration-300 cursor-pointer hover:border-white hover:border-2">
                      Blog
                    </p>
                  </Link>
                </li>
              
              
              </ul>
            </li>

            <li className="relative group">
              <p className="text-white hover:text-neutral-500 transition duration-300 cursor-pointer">
                Evaluate
              </p>
              <ul className="absolute left-0 hidden group-hover:block bg-black ">
               
                <li>
                  <Link to="/showfish">
                    <p className="py-2 px-5 text-white hover:bg-neutral-800 hover:text-neutral-300 transition duration-300 cursor-pointer hover:border-white hover:border-2">
                      Koi
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/showpond">
                    <p className="py-2 px-5 text-white hover:bg-neutral-800 hover:text-neutral-300 transition duration-300 cursor-pointer hover:border-white hover:border-2">
                      Pond
                    </p>
                  </Link>
                </li>
              </ul>
            </li>


            <li>
              <Link to={"/contactus"}>
                <p className="text-white hover:text-neutral-500 transition duration-300 cursor-pointer">
                  Contact Us
                </p>
              </Link>
            </li>

          </ul>

          <div className="h-6 border-l border-neutral-500 mx-4"></div>

          <div className="hidden lg:flex items-center space-x-6">

            <SearchBar />
          </div>
          {!user ? (
            <>
              <Link
                to="/login"
                className="ml-4 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition duration-300"
              >
                Login
              </Link>
              <a
                href="/register"
                className="ml-4 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition duration-300"
              >
                Signup
              </a>
            </>
          ) : (
            // MENU USER 
            <>
              <Menu>
                <Menu.SubMenu
                  title={
                    <>
                      {user.avatar ? (
                        <img
                          className="w-5 h-5 mr-5"
                          src={user.avatar}
                          alt=""
                        />
                      ) : (
                        <Avatar icon={<UserOutlined />} />
                      )}
                      <span className="username">{user.name}</span>
                    </>
                  }
                >
                  {user.admin && (
                    <Menu.Item key="dashboard">
                      <StockOutlined className="pr-2" />
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </Menu.Item>
                  )}

                  <Menu.Item key="project">
                    <UserOutlined className="pr-2" />
                    <Link to={"/profile"}>Profile</Link>
                  </Menu.Item>

                  <Menu.Item key="log-out" onClick={showModal}>
                    <LogoutOutlined className="pr-2" /> Logout
                  </Menu.Item>

                  <Menu.Item key="list-suitable">
                    <HistoryOutlined className="pr-2" />
                    <button onClick={() => setShowHistory(true)}>Suitable History</button>  
                     <SuitableHistory user={user} showModal={showHistory} setShowModal={setShowHistory} />  
                  </Menu.Item>
               
                </Menu.SubMenu>
              </Menu>
            </>
          )}

          <Modal
            title="Confirm Logout"
            visible={isModalLogOut}
            onOk={handleLogOut}
            onCancel={handleCancel}
            okText="Yes"
            okButtonProps={{
              style: { backgroundColor: "#d9534f" },
            }}
            cancelText="Cancel"
            icon={<ExclamationCircleOutlined />}
          >
            <p>Are you sure you want to log out?</p>
          </Modal>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={` lg:hidden fixed top-0 right-0 w-64 h-full bg-black z-50 p-6 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="relative w-full h-full">
          <button
            aria-label="Close menu"
            onClick={toggleMenu}
            className="text-white mb-4"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="mb-4">
            <SearchBar />
          </div>
          <ul className="space-y-4">
            <li>
              <a
                href="/"
                className="text-white hover:text-neutral-500 transition duration-300"
                onClick={handleLinkClick}
              >
                Home
              </a>
            </li>
            {!user?.memberStatus && (
              <li>
                <a
                  href="/memberPackage"
                  className="text-white hover:text-neutral-500 transition duration-300"
                  onClick={handleLinkClick}
                >
                  Membership
                </a>
              </li>
            )}
            <li>
              <a
                href="/consulting"
                className="text-white hover:text-neutral-500 transition duration-300"
                onClick={handleLinkClick}
              >
                Consulting
              </a>
            </li>
            <li className="relative group">
              <p className="text-white hover:text-neutral-500 transition duration-300 cursor-pointer">
                Categories
              </p>

              <ul className=" left-0 hidden group-hover:flex bg-black ">
                <li>
                  <Link to="/news">

                    <p className="py-2 px-5 text-white hover:bg-neutral-800 hover:text-neutral-300 transition duration-300 cursor-pointer hover:border-white hover:border-2">
                      News
                    </p>
                  </Link>
                </li>
                <li>

                  <Link to="/blog">

                    <p className="py-2 px-5 text-white hover:bg-neutral-800 hover:text-neutral-300 transition duration-300 cursor-pointer hover:border-white hover:border-2">
                      Blog
                    </p>
                  </Link>
                </li>

              </ul>
            </li>

            <li className="relative group">
              <p className="text-white hover:text-neutral-500 transition duration-300 cursor-pointer">
                Evaluate
              </p>
              <ul className=" left-0 hidden group-hover:flex bg-black ">
              
               
                <li>
                  <Link to="/showfish">
                    <p className="py-2 px-5 text-white hover:bg-neutral-800 hover:text-neutral-300 transition duration-300 cursor-pointer hover:border-white hover:border-2">
                      Koi 
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/showpond">
                    <p className="py-2 px-5 text-white hover:bg-neutral-800 hover:text-neutral-300 transition duration-300 cursor-pointer hover:border-white hover:border-2">
                      Pond
                    </p>
                  </Link>
                </li>

              </ul>
            </li>

            <li>
              <a
                href="#"
                className="text-white hover:text-neutral-500 transition duration-300"
                onClick={handleLinkClick}
              >
                Contact Us
              </a>
            </li>

          </ul>

          {/* Login and Signup in Mobile Menu */}
          {!user ? (
            <div className="mt-6">
              <a
                href="/login"
                className="block px-4 py-2 text-white rounded hover:bg-white hover:text-black transition duration-300 mb-4 text-center"
              >
                Login
              </a>
              <a
                href="/register"
                className="block px-4 py-2 text-white hover:bg-white hover:text-black transition duration-300 text-center"
              >
                Signup
              </a>
            </div>
          ) : (
            <>
              <div className="absolute bottom-0 w-40">
                <Menu>
                  <Menu.SubMenu
                    title={
                      <>
                        {/* Neu  co avatar trong user thi co hình còn không sẽ xuất hiện một icons  */}
                        {user.avatar ? (
                          <img
                            className="w-5 h-5 mr-5"
                            src={user.avatar}
                            alt=""
                          />
                        ) : (
                          <Avatar icon={<UserOutlined />} />
                        )}

                        <span className="username">{user.name}</span>
                      </>
                    }
                  >
                    {user.admin && (
                      <Menu.Item key="dashboard">
                        <StockOutlined className="pr-2" />
                        <Link to={"/dashboard"}>Dashboard</Link>
                      </Menu.Item>
                    )}
                    <Menu.Item key="about-us">
                      <a href="/profile">
                        <UserOutlined className="pr-2" /> Profile
                      </a>
                    </Menu.Item>
                    <Menu.Item key="log-out" onClick={showModal}>
                      <LogoutOutlined className="pr-2" /> Logout
                    </Menu.Item>
                  </Menu.SubMenu>
                </Menu>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </nav>
  );
};

export default Navbar;