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
import LearningPage from "../pages/Client/LearningPage/LearningPage";
import CartPage from "../pages/Client/CartPage/CartPage";

// Admin Pages
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";
import CourseManagement from "../pages/Admin/CourseManagement/CourseManagement";
import AdminGuard from "./AdminGuard";
import TransactionManagement from "../pages/Admin/Transaction/TransactionManagement";
import ReportAnalytics from "../pages/Admin/Report/ReportAnalytics";
import SystemSettings from "../pages/Admin/Settings/SystemSettings";
import InstructorManagement from "../pages/Admin/Instructor/InstructorManagement";
import RoleManagement from "../pages/Admin/Role/RoleManagement";

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
          path: "detail/:id",
          element: <CourseDetails />,
        },
        {
          path: "search",
          element: <SearchPage />,
        },
        {
          path: "profile",
          element: <UserProfile />,
        },
        {
          path: "/learning/:id",
          element: <LearningPage />,
        },
        { path: "cart", element: <CartPage /> },
      ],
    },

    // Route cho Admin (Có bảo vệ bằng AdminGuard)
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
              path: "users",
              element: <UserManagement />,
            },
            {
              path: "courses",
              element: <CourseManagement />,
            },
            {
              path: "transactions",
              element: <TransactionManagement />,
            },
            {
              path: "analytics",
              element: <ReportAnalytics />,
            },
            {
              path: "settings",
              element: <SystemSettings />,
            },
            {
              path: "instructors",
              element: <InstructorManagement />,
            },
            {
              path: "roles",
              element: <RoleManagement />,
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
      element: (
        <div className="p-10 text-center">404 - Trang không tồn tại</div>
      ),
    },
  ]);

  return routeElements;
};

export default useRouteElements;
