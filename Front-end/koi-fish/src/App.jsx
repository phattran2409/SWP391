// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./page/login/login";
import RegisterPage from "./page/register/register";
import PostingInterface from "./page/post/post";
import UpdatePass from "./page/security/updatepass";
import SendChangeEmail from "./page/security/sendemail";




import Dashboard from "./components/dashboard/dashboard";
import ManageKoiFish from "./page/admin/manage-koi/manageKoiFish";
// import ManageService from "./page/admin/manage-service/manageService";
import ManageMembers from "./page/admin/manage-member/manageMembers";
import ManagePonds from "./page/admin/manage-pond/managePonds";
import ManageNews from "./page/admin/manage-post/manage-news/manageNews";
import ManageBlogs from "./page/admin/manage-post/manage-blogs/manageBlogs";
import ManageAds from "./page/admin/manage-post/manage-ads/manageAds";



import ContactUs from "./page/contactus/contactus";
import ShowFish from "./page/showdetails/Showfish.jsx";
import ShowPond from "./page/showdetails/ShowPond";

import Home from "./page/Home/Home.jsx";

import RecoverPage from "./page/forget/forget";
import ResetPasswordPage from "./page/forget/reset";

import KoiDetails from "./page/testpage/consulting-detail/koidetail.jsx";
import PondDetails from "./page/testpage/consulting-detail/ponddetail.jsx";
import MemberPackage from "./page/MemberPackage/package.jsx";
import ThankYou from "./page/thankYou/thankYou.jsx";
import ManageOrder from "./page/admin/manage-orders/manageOrders.jsx";
import Consulting from "./page/consulting/consulting.jsx";
import NotFoundPage from "./page/NotFound/404.jsx";
import { ChangeEmail } from "./components/update-profile/EditProfile/ChangeEmail.jsx"
import ProfileUser from "./page/ProfileUser/ProfileUser.jsx";
import NewsPage from "./page/Category/news/news.jsx";
import BlogPage from "./page/Category/blogs/blog.jsx";
import DetailsPage from "./page/Category/details/details.jsx";
import Package from "./page/admin/manage-package/manage-Package.jsx";
import ElementPage from "./page/element/element.jsx";
import WishList from "./page/wishlist/wishlist.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/showfish",
      element: <ShowFish />,
    },
    {
      path: "/showpond",
      element: <ShowPond />,
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
          path: "package",
          element: <Package />
        },
        {
          path: "order",
          element: <ManageOrder />,
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
      path: "/contactus",
      element: <ContactUs />,
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
      element: <NewsPage />,
    },
    {
      path: "/blog",
      element: <BlogPage />,
    },
    {
      path: "/details/:id",
      element: <DetailsPage />,
    },


    {
      path: "/koidetail/:id",
      element: <KoiDetails />,
    },
    {
      path: "/ponddetail/:id",
      element: <PondDetails />,
    },
    {
      path: "/memberPackage",
      element: <MemberPackage />,
      children: [{ path: "thankyou", element: <ThankYou /> }],
    },
    {
      path: "/consulting",
      element: <Consulting />,
    },
    {
      path: "/profile",
      element: <ProfileUser />,
    },
    {
      path: "/changeEmail",
      element: <ChangeEmail />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/element",
      element: <ElementPage />,
    },
    {
      path: "/wishList",
      element: <WishList />,
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App
