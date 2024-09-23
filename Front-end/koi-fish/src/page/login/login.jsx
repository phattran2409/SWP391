// eslint-disable-next-line no-unused-vars
import React from "react";
import AuthenTemplate from "../../components/authen-template/authenTemplate";
import { Form, Input, Button, Divider } from "antd";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../../config/firebase";

function LoginPage() {
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
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log(error);
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

  return (
    <AuthenTemplate>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

        <Button onClick={handleLoginGoogle}>Continue with Google</Button>

        <Divider orientation="center">
          <span className="text-gray-500">OR</span>
        </Divider>

        <Form className="w-full max-w-xs">
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
            <Input className="border border-gray-300 rounded-xl" />
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
            <Input.Password className="border border-gray-300 rounded-xl" />
          </Form.Item>

          <Button
            type="submit"
            className="bg-gray-400 hover:bg-red-500 text-white font-semibold rounded-3xl py-3 w-full"
          >
            Sign in
          </Button>
        </Form>
      </div>
    </AuthenTemplate>
  );
}

export default LoginPage;
