import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileUser.css";
import { toast } from "react-toastify";
import { EditProfile } from "/src/components/update-profile/EditProfile/EditProfile";
import { Notifications } from "/src/components/update-profile/notification";
import { PostMember } from "../../components/update-profile/PostMember";
import { OrderHistory } from "../../components/update-profile/OrderHistory";
import { PostHistory } from "../../components/update-profile/PostHistory";
import Footer from "../../components/footer/Footer";
import { ChangeEmail } from "/src/components/update-profile/EditProfile/ChangeEmail";
import { ChangePassword } from "/src/components/update-profile/EditProfile/ChangePassword";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import { patch } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import api from "../../config/axios.js";

function ProfileUser() {
  const navigate = useNavigate();
 const [user,setUser] = useState(null);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token"); // Get token from storage
   
      if (!token) {
        // No token found, redirect to login
        console.log("No token found");
        toast.error("No token found!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);

        return;
      }
    };
    checkTokenValidity();
    // Call the function when the component mounts
  }, [navigate]);

 

  useEffect(() => {
 
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetchNotifications(user._id); 
    }
  }, []);

  // Function to fetch notifications with status: true
  const fetchNotifications = async (id) => {
    try {
      const response = await api.get(`v1/user/id=${id}`);
      if (response.status === 200) {
        setUser(response.data)
      } else {
        toast.error("Failed to fetch notifications");
      }
    } catch (error) {
    
      console.error(error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="flex min-h-screen  bg-gray-100">
        {/* Sidebar */}
        {/* Nav Link */}
        {/* Main Content */}
        <div className="w-full flex-row profile-background justify-center  p-10">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="scrollable"
                  textColor="inherit"
                  scrollButtons
                  allowScrollButtonsMobile
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#d9534f", // Change to your desired color
                      height: "3px", // Change thickness of the underline
                    },
                  }}
                >
                  <Tab
                    label="Profile"
                    value="1"
                    className="tab-label"
                    sx={{ color: "white", fontWeight: "bold" }}
                  />
                  <Tab
                    label="Change Email"
                    value="2"
                     className="tab-label"
                    sx={{ color: "white", fontWeight: "bold" }}
                  />
                  <Tab
                    label="Change Password"
                    value="3"
                     className="tab-label"
                    sx={{ color: "white", fontWeight: "bold" }}
                  />
                  <Tab
                    label="Notification"
                    value="4"
                     className="tab-label"
                    sx={{ color: "white", fontWeight: "bold" }}
                  />               
                    <Tab
                      label="Order History"
                      value="6"
                       className="tab-label"
                      sx={{ color: "white", fontWeight: "bold" }}
                    />
           
                  {/* lay thuoc tinh memberStatus de set */}
                  {!user?.memberStatus ? (
                    <Tab label="MemberShip" value="5" disabled />
                  ) : (
                    <Tab
                      label="MemberShip"  
                      value="5"
                       className="tab-label"
                      sx={{ color: "white", fontWeight: "bold" }}
                    />
                  )}
                
                     {!user?.memberStatus ? (
                    <Tab label="Post History" value="7" disabled />
                  ) : (
                    <Tab
                      label="Post History"
                      value="7"
                       className="tab-label"
                      sx={{ color: "white", fontWeight: "bold" }}
                    />
                  )}
                </Tabs>
              </Box>
              <TabPanel value="1">
                <EditProfile />
              </TabPanel>
              <TabPanel value="2">
                <ChangeEmail></ChangeEmail>
              </TabPanel>
              <TabPanel value="3">
                <ChangePassword />
              </TabPanel>
              <TabPanel value="4">
                <Notifications />
              </TabPanel>
              <TabPanel value="5">
                <PostMember />
              </TabPanel>
              <TabPanel value="6">
                <OrderHistory />
              </TabPanel>
              <TabPanel value="7">
                <PostHistory/>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfileUser;
