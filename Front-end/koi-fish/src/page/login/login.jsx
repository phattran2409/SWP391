// eslint-disable-next-line no-unused-vars
import React from "react";
import AuthenTemplate from "../../components/authen-template/authenTemplate";
import { Form, Input, Button, Divider, Typography, message } from "antd";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  //function handle when user click sign up with google
  const handleLoginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = googleProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User info:", user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.error("Login error:", error);
        message.error("Login failed. Please try again.");
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <AuthenTemplate className="auth-template">
      <div className="form-section-child">
        <h1>Sign in</h1>

        <Button className="google-button" onClick={handleLoginGoogle}>
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
        </Button>

        <Divider>
          <span>OR</span>
        </Divider>

        <Form labelCol={{ span: 24 }}>
          <Form.Item
            label="User name or email address"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username or email!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Your password"
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
            <Input.Password />
          </Form.Item>

          <div className="footer-links">
            <div className="account-info">
              <label>Do not have an account?</label>
              <Typography.Link onClick={handleSignUp}>Sign up</Typography.Link>
            </div>
            <Typography.Link>Forgot Password?</Typography.Link>
          </div>

          <Button color="danger" variant="solid" className="custom-button">
            Sign in
          </Button>
        </Form>
      </div>
    </AuthenTemplate>
  );
}

export default LoginPage;
