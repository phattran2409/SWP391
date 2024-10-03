// eslint-disable-next-line no-unused-vars
import React from "react";
import AuthenTemplate from "../../components/authen-template/authenTemplate";
import { Form, Input, Button, Divider, Typography, message } from "antd";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { googleProvider } from "../../config/firebase";
import "./index.scss";
import { useNavigate } from "react-router-dom";



function LoginPage() {
  const navigate = useNavigate();

  // function handle form login submission
  const handleLogin = (values) => {
    const userData = {
      UserName: values.username,
      password: values.password,
    };

    fetch("http://localhost:8081/v1/auth/login", {
      // Replace with your actual API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server response:", data);
        // Redirect to home page after successful login
           if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }
        navigate("/"); // Replace with your home page path
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        message.error("Login failed. Please try again.");
      });
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <AuthenTemplate className="auth-template">
      <div className="form-section-child">
        <h1 className="font-medium text-3xl">Sign in</h1>

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
            name="username"
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
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password className="py-2" />
          </Form.Item>

          <div className="footer-links">
            <div className="account-info">
              <label>Do not have an account?</label>
              <Typography.Link
                onClick={handleSignUp}
                style={{ color: "black", textDecoration: "underline" }}
              >
                Sign up
              </Typography.Link>
            </div>
            <Typography.Link
              style={{ color: "black", textDecoration: "underline" }}
            >
              Forgot Password?
            </Typography.Link>
          </div>

          <Button htmlType="submit" color="danger" variant="solid" className="custom-button">
            Sign in
          </Button>
        </Form>
      </div>
    </AuthenTemplate>
  );
}

export default LoginPage;
