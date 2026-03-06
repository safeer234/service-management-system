import { Link } from "react-router-dom"
import { useState } from "react"

function Sidebar() {

  const [open, setOpen] = useState(false)

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-[#ea580c] text-white p-2 rounded-md shadow-md"
        >
          ☰
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-40
          bg-[#ea580c] 
          w-64 lg:w-58
          h-screen
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        <ul className='px-8 py-8 space-y-6 overflow-y-auto h-full'>

          {/* Dashboard */}
          <div className='flex gap-2 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M20 11h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1m-1 8h-4v-6h4zm-9-4H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1m-1 4H5v-2h4zM20 3h-6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 4h-4V5h4zm-9-4H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 8H5V5h4z"></path>
            </svg>
            <li>
              <Link to="/provider/dashboard" className="text-white font-medium text-[17px] hover:text-black hover:bg-white px-2 py-1 rounded transition">
                Dashboard
              </Link>
            </li>
          </div>

      
        

          {/* service requests */}
          <div className='flex gap-2 items-center'>
             <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="white" viewBox="0 0 24 24" >

<path d="M18.5 2h-12C4.57 2 3 3.57 3 5.5V21c0 .35.18.67.47.85s.66.2.97.04l5.55-2.78 5.55 2.78a.997.997 0 0 0 1.45-.89v-8h4c.55 0 1-.45 1-1V5.5c0-1.93-1.57-3.5-3.5-3.5ZM15 19.38l-4.55-2.28a1 1 0 0 0-.89 0l-4.55 2.28V5.5c0-.83.67-1.5 1.5-1.5h8.85c-.22.46-.35.96-.35 1.5v13.88ZM20 11h-3V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path>
</svg>

            <li><Link to="/provider/requests" className="text-white font-medium text-[17px] hover:text-black hover:bg-white px-2 py-1 rounded transition">Service Requests</Link></li>
          </div>

        </ul>
      </div>

      {/* BACKDROP FOR MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Sidebar