import { useState, useEffect } from 'react';
import { Search, Menu as Menu1, X, User } from 'lucide-react';
import { json, Link, useNavigate } from "react-router-dom";
import { Menu, Avatar, Button, Modal } from "antd";
import {
  UserOutlined,
  CodeOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalLogOut, setIsModalLogOut] = useState(false);
  const navigate = useNavigate();

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

  // Get user from local storage
  useEffect(() => {
    const storeUser = localStorage.getItem("user");
    if (storeUser) {
      setUser(JSON.parse(storeUser));
    }
  }, []); // Only run once when the component mounts

  // Show modal
  const showModal = () => {
    setIsModalLogOut(true);
  };
  
  // Handle logout
  const handleLogOut = async () => {
    setIsModalLogOut(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");

    navigate("/?status=logout_success");
  };

  // When canceling
  const handleCancel = () => {
    setIsModalLogOut(false);
  };

  return (
    <nav className="sticky top-0 z-50 h-[60px] bg-black flex items-center justify-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <span className="text-white text-lg font-semibold">Feng Shui Koi</span>

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

        {/* Main Nav for Large Screens */}
        <div className="hidden lg:flex items-center space-x-6">
          <ul className="flex space-x-8">
            {["Home", "About", "Consulting", "Contact Us", "News"].map((item) => (
              <li key={item}>
                <Link to={"/"} onClick={handleLinkClick}>
                  <p className="text-white hover:text-neutral-500 transition duration-300 cursor-pointer">
                    {item}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-6 border-l border-neutral-500 mx-4"></div>

          <button className="text-white hover:text-neutral-500 focus:outline-none">
            <Search className="w-5 h-5" />
          </button>
          {!user ? (
            <>
              <Link
                to="/login"
                className="ml-4 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition duration-300"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <a
                href="/register"
                className="ml-4 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition duration-300"
                onClick={handleLinkClick}
              >
                Signup
              </a>
            </>
          ) : (
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
                <Menu.Item key="project" onClick={handleLinkClick}>
                  <UserOutlined className="pr-2" />
                  <Link to={"/profile"}>Profile</Link>
                </Menu.Item>

                <Menu.Item key="log-out" onClick={showModal}>
                  <LogoutOutlined className="pr-2" /> Logout
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          )}

          <Modal
            title="Confirm Logout"
            visible={isModalLogOut}
            onOk={handleLogOut}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="Cancel"
            icon={<ExclamationCircleOutlined />}
          >
            <p>Are you sure you want to log out?</p>
          </Modal>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black z-40 p-4">
          <ul className="flex flex-col space-y-4">
            {["Home", "About", "Consulting", "Contact Us", "News"].map((item) => (
              <li key={item}>
                <Link to={"/"} onClick={handleLinkClick} className="text-white hover:text-neutral-500">
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" onClick={handleLinkClick} className="text-white hover:text-neutral-500">
                Login
              </Link>
            </li>
            <li>
              <a href="/register" onClick={handleLinkClick} className="text-white hover:text-neutral-500">
                Signup
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
