import { useState } from "react";

import "./ProfileUser.css";

import { EditProfile } from "/src/components/update-profile/EditProfile/EditProfile";
import { Notifications } from "/src/components/update-profile/notification";
import { PostMember } from "../../components/update-profile/PostMember";

// import { VscDebugBreakpointUnsupported } from "react-icons/vsc";
// import { IoMdAdd } from "react-icons/io";
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

function ProfileUser() {
  //  state value for tab
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = JSON.parse(localStorage.getItem("user"));

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
                    sx={{ color: "white", fontWeight: "bold" }}
                  />
                  <Tab
                    label="Change Email"
                    value="2"
                    sx={{ color: "white", fontWeight: "bold" }}
                  />
                  <Tab
                    label="Change Password"
                    value="3"
                    sx={{ color: "white", fontWeight: "bold" }}
                  />
                  <Tab
                    label="Notification"
                    value="4"
                    sx={{ color: "white", fontWeight: "bold" }}
                  />
                  {/* lay thuoc tinh memberStatus de set */}
                  {!user?.memberStatus ? (
                    <Tab label="MemberShip" value="5" disabled />
                  ) : (
                    <Tab
                      label="MemberShip"
                      value="5"
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
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ProfileUser;
