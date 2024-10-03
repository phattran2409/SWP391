// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./page/login/login";
import RegisterPage from "./page/register/register";
import Dashboard from "./components/dashboard/dashboard";
import ManageKoi from "./page/admin/manage-koi/manageKoi";
import ManageService from "./page/admin/manage-service/manageService";
import ManageMembers from "./page/admin/manage-member/manageMembers";
import ManagePonds from "./page/admin/manage-pond/managePonds";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
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
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "member",
          element: <ManageMembers />,
        },
        {
          path: "pond",
          element: <ManagePonds />,
        },
        {
          path: "koi",
          element: <ManageKoi />,
        },
        {
          path: "service",
          element: <ManageService />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
