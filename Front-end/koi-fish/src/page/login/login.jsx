// eslint-disable-next-line no-unused-vars
import React from "react";
import AuthenTemplate from "../../components/authen-template/authenTemplate";
import { Form, Input, Button, Divider, Typography, } from "antd";

import "./index.scss";

import {  useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


function LoginPage() {
  const navigate = useNavigate();



  const handleLinktoSignUp = () => {
    navigate("/register");
  };


  const handleLogin = async (values) => {
    try {
      const response = await api.post("/v1/auth/login", values);
      console.log(values);
      console.log(response.data);
      const { admin, accessToken } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user" ,JSON.stringify(response.data))
      if (admin) {
        navigate("/dashboard");
      } else {
        navigate("");
      }
    } catch (err) {

     
     toast.error(err.code);
     
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
    };

    const sendTokenToAPI = async (data) => {
      console.log(import.meta.env.API_SIGNIN);

      try {
        const response = await api.post("http://localhost:8081/v1/Oauth/signin",{
          data: data, // Gửi token trong body của request
        });
        const { accessToken } = response.data;  

        console.log("API Response:", response.data); 
       if (response.data) { 
          localStorage.setItem("token", accessToken)
          localStorage.setItem("user" , JSON.stringify(response.data))
        
          
          navigate("/?status=login_gg_success" , {state : {message : JSON.stringify(response.data.message)}})
       } 
  
      } catch (error) {
        toast.error(error.response.data);

      }
    };


  return (
    <AuthenTemplate className="auth-template ">
      <div className="form-section-child ">
        <h1 className="font-medium text-3xl">Sign in</h1>

        {/* <Button className="google-button" onClick={handleLoginGoogle}>
          <svg width="24" height="24" viewBox="0 0 18 18">
            <path
              fill="#4285F4"
              d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18"
            />
            <path
              fill="#34A853"
              d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17"
            />
            <path
              fill="#FBBC05"
              d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z"
            />
            <path
              fill="#EA4335"
              d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.8 4.8 0 0 1 4.48-3.3"
            />
          </svg>
          <h2>Continue with Google</h2>
        </Button> */}
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
            label={
              <label className="text-gray-500 mb-1 block">
                User name or email address
              </label>
            }
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

          <div className="footer-links">
            <div className="account-info">
              <label>Do not have an account?</label>


              <Typography.Link onClick={handleLinktoSignUp} style={{ color: 'black', textDecoration: 'underline' }}>
                Sign up</Typography.Link>
            </div>
            <Typography.Link onClick={handleLinktoForgetPass} style={{ color: 'black', textDecoration: 'underline' }}>Forgot Password?</Typography.Link>

          </div>

          <Button
            color="danger"
            variant="solid"
            className="custom-button"
            type="primary"
            htmlType="submit"
          >
            Sign in
          </Button>
        </Form>
      </div>
    </AuthenTemplate>
  );
}

export default LoginPage;