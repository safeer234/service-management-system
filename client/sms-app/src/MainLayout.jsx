import React from "react";

import Navbar from "./client/components/common/Navbar";
import Footer from "./client/components/common/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    
      <Footer />
    </>
  );
}

export default MainLayout;
