import React from "react";

import Navbar from "./client/components/common/Navbar";
import Footer from "./client/components/common/Footer";
import { Outlet } from "react-router-dom";
import Chatbot from "./client/components/common/Chatbot";
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    
      <Footer />
       <Chatbot />
    </>
  );
}

export default MainLayout;
