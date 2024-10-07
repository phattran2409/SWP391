// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./page/login/login";
import RegisterPage from "./page/register/register";
import Dashboard from "./components/dashboard/dashboard";
import ManageKoiFish from "./page/admin/manage-koi/manageKoiFish";
// import ManageService from "./page/admin/manage-service/manageService";
import ManageMembers from "./page/admin/manage-member/manageMembers";
import ManagePonds from "./page/admin/manage-pond/managePonds";
import ManageNews from "./page/admin/manage-post/manage-news/manageNews";
import ManageBlogs from "./page/admin/manage-post/manage-blogs/manageBlogs";
import ManageAds from "./page/admin/manage-post/manage-ads/manageAds";

import Home from "./page/Home/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home/>,
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
          element: <ManageKoiFish />,
        },
        {
          path: "post",
          children: [
            {
              path: "news",
              element: <ManageNews />,
            },
            {
              path: "blog",
              element: <ManageBlogs />,
            },
            {
              path: "ads",
              element: <ManageAds />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
