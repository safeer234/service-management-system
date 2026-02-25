import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./AuthLayout";
import MainLayout from ".//MainLayout";
import AdminLayout from "./AdminLayout";
import AdminHome from "./admin/pages/AdminHome";
import MyBookings from "./pages/MyBookings";
import Cart from "./pages/Cart";
import Bookings from "./admin/pages/Bookings";
import Users from "./admin/pages/Users";
import AddService from "./admin/pages/AddService";
import AllServices from "./admin/pages/AllServices";
import ProviderHome from "./provider/pages/ProviderHome";
import ServiceRequests from "./provider/pages/ServiceRequests";
import ProviderLayout from "./ProviderLayout";

export const router = createBrowserRouter([

  // client route
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "home", element: <LandingPage /> },
      { path: "services", element: <Services /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "bookings", element: <MyBookings /> },
      { path: "cart", element: <Cart /> },
    ],
  },

  // auth routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },

  // admin routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "dashboard", element: <AdminHome /> },
      { path: "bookings", element: <Bookings /> },
       { path: "users", element: <Users /> },
         { path: "addService", element: <AddService /> },
          { path: "allServices", element: <AllServices /> },
    ],
  },

  // provider routes


{
    path: "/provider",
    element: <ProviderLayout />,
    children: [
      { index: true, element: <ProviderHome /> },
      { path: "dashboard", element: <ProviderHome /> },
      { path: "requests", element: <ServiceRequests /> },
       { path: "users", element: <Users /> },
         { path: "addService", element: <AddService /> },
          { path: "allServices", element: <AllServices /> },
    ],
  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Provider store={store}>
<RouterProvider router={router} />
  </Provider>
  </React.StrictMode>
);