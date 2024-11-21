import { Button, Card, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import {
  CarryOutOutlined,
  AuditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import api from "../../config/axios";
import {
  MdWater,
  MdLandscape,
  MdGrass,
  MdLocalFireDepartment,
} from "react-icons/md";
import { GiMetalBar } from "react-icons/gi";
import { toast } from "react-toastify";


const userElement = JSON.parse(localStorage.getItem("elementUser"));

const fitWithElements = [
  { name: "Metal", color: "#696969", icon: GiMetalBar },
  { name: "Wood", color: "#008000", icon: MdGrass },
  { name: "Water", color: "#0000FF", icon: MdWater },
  { name: "Fire", color: "#FF4500", icon: MdLocalFireDepartment },
  { name: "Earth", color: "#8B4513", icon: MdLandscape },
];

function WishList() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistType, setWishlistType] = useState("fishkois"); // State for wishlist type
  const [showAll, setShowAll] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
 
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      getUser(user._id); 
    }
  }, []);

  const getUser = async (id) => {
    try {
      const response = await api.get(`v1/user/id=${id}`);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch user: ", error);
    }
  }

  const getWishlistItems = async () => {
    try {
      const response = await api.get(
        `v1/user/getWishList?wishlistType=${wishlistType}`
      );
      setWishlist(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch wishlist: ", error);
    }
  };

  useEffect(() => {
    getWishlistItems();
  }, [wishlistType]); // Refetch data when wishlist type changes

  const handleDelete = async (itemId, wishListType) => {
    try {
      await api.delete(
        `v1/user/removeWishList?itemId=${itemId}&wishlistType=${wishListType}`
      );
      toast.success("Item deleted successfully");
      getWishlistItems();
    } catch (error) {
      console.log("Failed to delete item: ", error);
      toast.error("Failed to delete item");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:block w-64 bg-white p-6 border-r">
          <div className="flex flex-col items-center mb-6">
          {users?.avatar ? (
            <img
              src={users.avatar}
              className="w-20 h-20 rounded-full bg-gray-400 mb-2"
              alt="User Avatar"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-400 mb-2"></div>
          )}
          {users?.name ? (
            <h2 className="font-semibold">{users.name}</h2>
          ) : (
            <h2 className="font-semibold">User</h2>
          )}
            <p className="text-sm text-gray-600">
              {new Date(users?.birthDate).toLocaleDateString()}
            </p>
            <div className="bg-gray-50 text-black-700 px-3 py-1 rounded-full text-sm mt-2">
              { userElement?.elementID ? (
              <div className="text-sm flex items-center">
                      <span>Element:</span>
                      {fitWithElements[userElement.elementID - 1]?.icon && (
                        <div className="flex items-center ml-2">
                          {React.createElement(
                            fitWithElements[userElement.elementID - 1].icon,
                            {
                              size: 20,
                              style: {
                                color:
                                  fitWithElements[userElement.elementID - 1]
                                    .color,
                              },
                            }
                          )}
                          <span
                            style={{
                              color:
                                fitWithElements[userElement.elementID - 1].color,
                              marginLeft: "8px",
                              fontSize: "1rem",
                            }}
                          >
                            {fitWithElements[userElement.elementID - 1].name}
                          </span>
                        </div>
                      )}
                    </div>
              ) : (
                <span>Element: Not set</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Button href="/showfish" className="w-full justify-start">
              Evaluate
            </Button>
            <Button href="/consulting" className="w-full justify-start">
              Consulting
            </Button>
            <Button href="/profile" className="w-full justify-start">
              Profile Settings
            </Button>
          </div>
        </div>


        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
          {/* Two buttons to toggle between koi fish and koi pond */}
          <div className="flex space-x-4 mb-6">
            <Button
              danger
              type={wishlistType === "fishkois" ? "primary" : "default"}
              onClick={() => setWishlistType("fishkois")}
            >
              
              Koi Fish
            </Button>
            <Button
              type={wishlistType === "ponds" ? "primary" : "default"}
              onClick={() => setWishlistType("ponds")}
              danger
            >
              Koi Pond
            </Button>
          </div>
          <div className="space-y-4">
            {wishlist.slice(0, showAll ? wishlist.length : 3).map((item) => (
              <Card
                key={item.id}
                className="mb-4 border-b-slate-700 rounded-none"
                bodyStyle={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px",
                }}
              >
                <img
                  src={item.item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">
                    {wishlistType === "fishkois" ? "Koi Fish" : "Koi Pond"}
                    </h3>
                  <div className="items-center mt-1">
                    <span className="text-lg font-bold">
                      {wishlistType === "fishkois" ? item.item.koiName : item.item.shape}
                  
                    </span>
                    <div className="text-sm flex items-center">
                      <span>Element:</span>
                      {fitWithElements[item.item.elementID - 1]?.icon && (
                        <div className="flex items-center ml-2">
                          {React.createElement(
                            fitWithElements[item.item.elementID - 1].icon,
                            {
                              size: 20,
                              style: {
                                color:
                                  fitWithElements[item.item.elementID - 1]
                                    .color,
                              },
                            }
                          )}
                          <span
                            style={{
                              color:
                                fitWithElements[item.item.elementID - 1].color,
                              marginLeft: "8px",
                              fontSize: "1rem",
                            }}
                          >
                            {fitWithElements[item.item.elementID - 1].name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
    className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4"
  >
    <Button
      onClick={() =>
        navigate(
          wishlistType === "fishkois"
            ? `/koidetail/${item.item._id}`
            : `/ponddetail/${item.item._id}`
        )
      }
      className="w-full lg:w-auto"
    >
      View Details
    </Button>
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      okText="Yes"
      cancelText="No"
      onConfirm={() => handleDelete(item.item._id, wishlistType)}
    >
      <Button danger className="w-full lg:w-auto">
        Remove
      </Button>
    </Popconfirm>
  </div>
              </Card>
            ))}
          </div>
          {!showAll && wishlist.length > 3 && (
            <div className="flex justify-end">
              <Button
                onClick={() => setShowAll(true)}
                color="danger"
                variant="solid"
                className="mt-4"
              >
                Show All
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WishList;