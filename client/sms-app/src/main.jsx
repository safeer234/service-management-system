import * as React from "react";
import * as ReactDOM from "react-dom/client";


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
import MainLayout from "./MainLayout";



const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout />,
    errorElement:<ErrorPage />,
    children:[
      {index:true,element:<LandingPage />},
      {path:"home", element:<LandingPage />},
      {path:"services", element:<Services />},
       {path:"about", element:<About />},
        {path:"contact", element:<Contact />},
          
    ]
  },
  {
    path:"/",
    element:<AuthLayout />,
    children:[
      {path:"login", element:<Login />},
            {path:"signup", element:<Signup />},


    ],

  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <RouterProvider router={router} />
   
    
  </React.StrictMode>
);
