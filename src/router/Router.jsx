import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/MainLayout";
import LoginLayout from "../layouts/LoginLayout";
import Admin from "../pages/content/DashBoard/Admin/Admin";
import Member from "../pages/content/DashBoard/Member/Member";
import Subject from "../pages/content/DashBoard/Subject/Subject";
import High from "../pages/content/DashBoard/High/High";
import SignUp from "../pages/content/Login/SignUp";
import Login from "../pages/content/Login/Login";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Mainlayout />,
    children: [
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "member",
        element: <Member />,
      },
      {
        path: "subject",
        element: <Subject />,
      },
      {
        path: "high",
        element: <High />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
