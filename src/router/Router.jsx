import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  { path: "", element: <Mainlayout />, children: [] },
]);
