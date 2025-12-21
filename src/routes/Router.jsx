import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddLessons from "../pages/Home/Home/dashboard/AddLessons";

import AboutUs from "../pages/Home/Home/AboutUs";
import Services from "../pages/Home/Home/dashboard/Services";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import PublicLessons from "../pages/Home/Home/PublicLessons";
import Register from "../pages/Auth/Register/Register";
import LessonDetails from "../pages/Home/Home/LessonDetails";
import Profile from "../components/Profile";
import UpgradeToPremium from "../components/UpgradeToPremium";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentCancelled from "../pages/payment/PaymentCancelled";
import PrivateRoute from "./PrivateRoute";
import MyLessons from "../pages/Home/Home/dashboard/MyLesson";
import ManageUsers from "../pages/Home/Home/dashboard/ManageUsers";
import ManageLessons from "../pages/Home/Home/dashboard/ManageLessons";
import ReportedLessons from "../pages/Home/Home/dashboard/ReportedLessons";


import MyFavorites from "../pages/Home/Home/dashboard/MyFavorites";
import NotFound from "../components/NotFound";
import UpdateLesson from "../pages/Home/Home/dashboard/UpdateLesson";




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
      },
      {
        path: 'lessons/:id',
        element: <PrivateRoute> <LessonDetails> </LessonDetails> </PrivateRoute> 
      },
      {
        
        path: "add-lesson",
         element: <PrivateRoute> <AddLessons> </AddLessons> </PrivateRoute> 
       
      
      }, {
        path: "my-lessons",
         element: <PrivateRoute> <MyLessons> </MyLessons>  </PrivateRoute> 
      
      },
      {
        path: 'upgrade',
        element: <PrivateRoute> <UpgradeToPremium> </UpgradeToPremium></PrivateRoute>
      },
      
      {
        path: 'favorites',
        element: <PrivateRoute> <MyFavorites> </MyFavorites></PrivateRoute>
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
        path: 'profile',
        Component: Profile
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'manage-users',
       element: <PrivateRoute> <ManageUsers> </ManageUsers></PrivateRoute>
      },
      {
        path: 'manage-lessons',
        element: <PrivateRoute> <ManageLessons> </ManageLessons></PrivateRoute>
      },
      {
        path: 'reported-lessons',
         element: <PrivateRoute> <ReportedLessons> </ReportedLessons></PrivateRoute>
        
      },
      
      {
        path: 'update-lesson/:id',
        element: <PrivateRoute> <UpdateLesson> </UpdateLesson></PrivateRoute>
      }
      
     
    ],
  },
  {
    path: "*",
    element: <NotFound> </NotFound>
  }
]);
