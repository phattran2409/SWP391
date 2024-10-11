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

import Home from "./page/Home/Home.jsx";

import RecoverPage from "./page/forget/forget";
import ResetPasswordPage from "./page/forget/reset";
import NewsPage from "./page/new/news";
import BlogPage from "./page/new/blog";
import DetailsPage from "./page/new/details";


function App() {
  const router = createBrowserRouter([
    {
      path:   "/",
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
    {
      path: "/forget",
      element: <RecoverPage />,
    },
    {
      path: "/reset",
      element: <ResetPasswordPage />,
    },
    {
      path: "/news",
      element: < NewsPage />,
    },
    {
      path: "/blog",
      element: <BlogPage />,
    },
    {
      path: "/details",
      element: <DetailsPage />,
    },
  
  ]);

  return <RouterProvider router={router} />;
}

export default App;
