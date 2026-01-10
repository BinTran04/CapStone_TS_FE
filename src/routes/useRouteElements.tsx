// Tất cả logic điều hướng wireframe.
import { useRoutes } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout/MainLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";

// Auth
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

// Client Pages
import HomePage from "../pages/Client/HomePage/HomePage";
import CourseDetails from "../pages/Client/CourseDetails/CourseDetails";
import SearchPage from "../pages/Client/SearchPage/SearchPage";
import UserProfile from "../pages/Client/UserProfile/UserProfile";

// Admin Pages
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";
import CourseManagement from "../pages/Admin/CourseManagement/CourseManagement";
import AdminGuard from "./AdminGuard";

const useRouteElements = () => {
  const routeElements = useRoutes([
    // Route cho Client
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "danhmuc/:maDanhMuc",
          element: <HomePage />,
        },
        {
          path: "chitiet/:maKhoahoc",
          element: <CourseDetails />,
        },
        {
          path: "tim-kiem",
          element: <SearchPage />,
        },
        {
          path: "thong-tin-ca-nhan",
          element: <UserProfile />,
        },
      ],
    },

    // 2. Route Admin (Được bảo vệ bởi AdminGuard)
    {
      path: "/admin",
      element: <AdminGuard />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "quan-ly-nguoi-dung",
              element: <UserManagement />,
            },
            {
              path: "quan-ly-khoa-hoc",
              element: <CourseManagement />,
            },
          ],
        },
      ],
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
      path: "*",
      element: <div className="p-10 text-center">404 - Not Found</div>,
    },
  ]);
  return routeElements;
};

export default useRouteElements;
