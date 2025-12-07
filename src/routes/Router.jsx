import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddLessons from "../pages/Home/Home/dashboard/AddLessons";
import MyLesson from "../pages/Home/Home/dashboard/MyLesson";
import AboutUs from "../pages/Home/Home/AboutUs";
import Services from "../pages/Home/Home/dashboard/Services";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import PublicLessons from "../pages/Home/Home/PublicLessons";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "about",
        Component: AboutUs,
      },
      {
        path: "services",
        Component: Services,
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
        {
            path: 'login',
            Component: Login
        },
        {
          path: 'register',
          Component: Register
        }
    ]

  },
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "add-lesson",
        Component: AddLessons,
      },
      {
        path: "my-lessons",
        Component: MyLesson,
      },
    ],
  },
]);
