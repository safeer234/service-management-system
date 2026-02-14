import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import Store from "./app/Store";
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Root from "./routing/root";
import LandingPage from "./pages/LandingPage";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";



const router = createBrowserRouter([
  {
    path: "/",
    element:<Root />,
    errorElement:<ErrorPage />,
    children:[
      {index:true,element:<LandingPage />},
      {path:"/home", element:<LandingPage />},
      {path:"/services", element:<Services />},
       {path:"/about", element:<About />},
        {path:"/contact", element:<Contact />}
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>
);
