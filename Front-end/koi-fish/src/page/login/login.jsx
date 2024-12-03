// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import AuthenTemplate from "../../components/authen-template/authenTemplate";
import { Form, Input, Button, Divider, Typography } from "antd";

import "./index.css";

import { useNavigate , useLocation } from "react-router-dom";
import api from "../../config/axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS của Toastify

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const handleLinktoSignUp = () => {
    navigate("/register");
  };

  const handleLogin = async (values) => {
    try {
      const response = await api.post("v1/auth/login", values);
      console.log(values);
      console.log(response.data);
      const { admin, accessToken, refreshToken } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("refreshToken",refreshToken)
      if (admin) {
        navigate("/dashboard");
      } else {
        navigate("/?status=login_gg_success");
      }
    } catch (err) {
      console.log(err);

      toast.error("Login Failed. Please check your username or password");
    }
  };

  const handleLinktoForgetPass = () => {
    navigate("/forget");
  };

  // Login google
  const handleLoginSuccess = (response) => {
    const token = jwtDecode(response.credential);
    console.log(token);
    sendTokenToAPI(token);
    // Bạn có thể gửi mã token để xác thực ở backend
  };

  const handleLoginError = () => {
    console.log("Login Failed");
    toast.error("Login Failed");
  };

  // show message login success

  useEffect(() => {
      const status = searchParams.get("status");
      console.log(status);
      if (status === "register_success") {
        toast.success("Register success");
      } 

  } , [])

  
  const sendTokenToAPI = async (data) => {
    console.log(import.meta.env.API_SIGNIN);

    try {
      const response = await api.post("v1/Oauth/signin", {
        data: data, // Gửi token trong body của request
      });
      const { accessToken } = response.data;

      console.log("API Response:", response.data);
      if (response.data) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(response.data));
        
        navigate("/?status=login_gg_success", {
          state: { message: JSON.stringify(response.data.message) },
        });
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <AuthenTemplate className="auth-template ">
      <div className="form-section-child ">
        <h1 className="font-medium text-3xl">Sign in</h1>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_ClIENT_ID}>
          <div className="App">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </div>
        </GoogleOAuthProvider>

        <Divider>
          <span className="text-gray-400 font-normal">OR</span>
        </Divider>

        <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
          <Form.Item
            label={<label className="text-gray-500 mb-1 block">Username</label>}
            name="userName" // cho nay dang de phone de test xong se doi lai member
            rules={[
              {
                required: true,
                message: "Please input your username or email!",
              },
            ]}
          >
            <Input className="py-2" />
          </Form.Item>

          <Form.Item
            label={
              <label className="text-gray-500 mb-1 block">Your password</label>
            }
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="py-2" />
          </Form.Item>

          <div className="flex flex-col footer-links ">
            <div className="flex justify-end w-full font-bold ">
              <Typography.Link
                onClick={handleLinktoForgetPass}
                style={{ color: "black", textDecoration: "underline" }}
              >
                Forgot Password?
              </Typography.Link>
            </div>
            <div className="flex flex-row justify-between w-full account-info mt-4">
              <label>Do not have an account?</label>

              <Typography.Link
                onClick={handleLinktoSignUp}
                style={{ color: "black", textDecoration: "underline"  }}
                className="font-bold"
              >
                Sign up
              </Typography.Link>
            </div>
          </div>

          <Button
            className="w-full h-[50px] mt-5 border rounded-[32px]"
            htmlType="submit"
            color="danger"
            variant="solid"
          >
            Sign in
          </Button>
        </Form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </AuthenTemplate>
  );
}

export default LoginPage;
