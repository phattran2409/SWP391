// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./page/login/login";
import RegisterPage from "./page/register/register";
<<<<<<< HEAD
import PostingInterface from "./page/post/post";
import UpdatePass from "./page/security/updatepass";
import SendChangeEmail from "./page/security/sendemail";

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
    },

    {
      path: "/update",
      element: <UpdatePass />,
    },

    {
      path: "/email",
      element: <SendChangeEmail />,
    }
  ]);

=======
import Dashboard from "./components/dashboard/dashboard";
import ManageKoiFish from "./page/admin/manage-koi/manageKoiFish";
// import ManageService from "./page/admin/manage-service/manageService";
import ManageMembers from "./page/admin/manage-member/manageMembers";
import ManagePonds from "./page/admin/manage-pond/managePonds";
import ManageNews from "./page/admin/manage-post/manage-news/manageNews";
import ManageBlogs from "./page/admin/manage-post/manage-blogs/manageBlogs";
import ManageAds from "./page/admin/manage-post/manage-ads/manageAds";

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

>>>>>>> 62e274878aab737080067527491c7915c0644949
  return <RouterProvider router={router} />;
}

export default App;
