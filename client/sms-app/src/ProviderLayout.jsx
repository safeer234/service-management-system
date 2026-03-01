import React from 'react'
import Navbar from './provider/components/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './provider/components/Sidebar'

function ProviderLayout() {
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

export default ProviderLayout
