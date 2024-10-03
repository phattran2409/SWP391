// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./page/login/login";
import RegisterPage from "./page/register/register";
import PostingInterface from "./page/post/post";

function App() {
  const router = createBrowserRouter([

    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },

    {
      path: "/",
      element: <PostingInterface />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
