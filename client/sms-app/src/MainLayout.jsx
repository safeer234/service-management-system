import React from "react";

import Navbar from "./client/components/common/Navbar";
import Footer from "./client/components/common/Footer";
import { Outlet } from "react-router-dom";
import Chatbot from "./client/components/common/Chatbot";
import { useSelector } from 'react-redux'
function MainLayout() {
   const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  
  return (
    <>
      <Navbar />
      <Outlet />
    
      <Footer />
      {!isAuthenticated ? (
        <h1></h1>
      ):(
          <Chatbot />
      )}
     
    </>
  );
}

export default MainLayout;
