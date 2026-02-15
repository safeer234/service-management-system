import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/common/Navbar';
function Root() {
  return (
    <div>
<Navbar  />
    <Outlet /> 
    </div>
  )
}

export default Root
