import React from 'react'
import Sidebar from './admin/components/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from "../src/admin/components/Navbar"
function AdminLayout() {
  return (
    <>
    <div>
      <Navbar />
    </div>
   <div className="flex min-h-screen">
  <Sidebar />
  <div className="flex-1 p-6 overflow-y-auto">
    <Outlet />
  </div>
</div>
    </>
  )
}

export default AdminLayout
