import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dotenv from "dotenv";
function App() {
  const [count, setCount] = useState(0);
  const handleLoginSuccess = (response) => {
    const token = jwtDecode(response.credential);
    console.log(token);
    sendTokenToAPI(token);
    // Bạn có thể gửi mã token để xác thực ở backend
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };  
  
  const sendTokenToAPI = async (token) => {
    console.log(import.meta.env.API_SIGNIN);
    
    try {
      const response = await axios.post(import.meta.env.VITE_SIGNIN, {
        token: token, // Gửi token trong body của request
      });

      console.log("API Response:", response.data);
      
    } catch (error) {
      console.error("Error sending token to API:", error);
    }
  };

 
  
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_ClIENT_ID}>
        <div className="App">
          <h1>Google Login in React</h1>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>
      </GoogleOAuthProvider>

      <div>
        <h1>{import.meta.env.VITE_CLIENT_ID}</h1>
      </div>
    </>
  );
}

export default App;
