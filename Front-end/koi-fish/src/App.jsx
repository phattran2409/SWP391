// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./page/login/login";
import RegisterPage from "./page/register/register";
import RecoverPage from "./page/forget/forget";
import ResetPasswordPage from "./page/forget/reset";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/forget",
      element: <RecoverPage />,
    },
    {
      path: "/reset",
      element: <ResetPasswordPage />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
