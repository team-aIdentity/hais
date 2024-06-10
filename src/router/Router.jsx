import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/MainLayout";
import Login from "../pages/content/Login/Login";
import UserLayout from "../layouts/UserLayout";
import LoginLayout from "../layouts/LoginLayout";
import UserAdmin from "../pages/content/User/UserAdmin/UserAdmin";
import UserMember from "../pages/content/User/UserMember/UserMember";
import UserPost from "../pages/content/User/UserPost/UserPost";
import UserHigh from "../pages/content/User/UserHigh/UserHigh";
import UserUniv from "../pages/content/User/UserUniv/UserUniv";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Mainlayout />,
    children: [],
  },
  {
    path: "login",
    element: <LoginLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "user",
    element: <UserLayout />,
    children: [
      {
        path: "admin",
        element: <UserAdmin />,
      },
      {
        path: "member",
        element: <UserMember />,
      },
      {
        path: "post",
        element: <UserPost />,
      },
      {
        path: "high",
        element: <UserHigh />,
      },
      {
        path: "univ",
        element: <UserUniv />,
      },
    ],
  },
]);
