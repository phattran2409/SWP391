// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./page/login/login";
import RegisterPage from "./page/register/register";
import RecoverPage from "./page/forget/forget";
import ResetPasswordPage from "./page/forget/reset";
import NewsPage from "./page/new/news/news";
import BlogPage from "./page/new/blogs/blog";
import DetailsPage from "./page/new/details/details";
import Search from "./page/new/search";
// import Search from "./page/new/search";

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
      path: "/details/:id",
      element: <DetailsPage />,
    },
    {
      path: "/search",
      element: <Search />,
    }

  ]);

  return <RouterProvider router={router} />;
}

export default App;
