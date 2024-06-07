import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/MainLayout";
import Login from "../pages/content/Login/Login";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Mainlayout />,
    children: [],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
