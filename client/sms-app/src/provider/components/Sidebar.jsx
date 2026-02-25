
import { NavLink } from 'react-router-dom'

function Sidebar() {
   
  return (
    <div className='flex flex-col bg-[#ea580c] w-58 h-screen'>
    <nav>

    </nav>
    <ul className=' px-10 py-5'>
        <div className='flex gap-1 mb-5'>  
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="white" viewBox="0 0 24 24" >

<path d="M20 11h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1m-1 8h-4v-6h4zm-9-4H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1m-1 4H5v-2h4zM20 3h-6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 4h-4V5h4zm-9-4H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 8H5V5h4z"></path>
</svg>
           <li>
  <NavLink
    to="/provider/dashboard"
    className={({ isActive }) =>
      `text-[17px] font-medium px-1 py-2 rounded ${
        isActive
          ? "bg-white text-black"
          :" text-white"
      }`
    }
  >
    Dashboard
  </NavLink>
</li>

        </div>
      
        <div className='flex gap-1 mb-5'>
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="white" viewBox="0 0 24 24" >

<path d="M18.5 2h-12C4.57 2 3 3.57 3 5.5V21c0 .35.18.67.47.85s.66.2.97.04l5.55-2.78 5.55 2.78a.997.997 0 0 0 1.45-.89v-8h4c.55 0 1-.45 1-1V5.5c0-1.93-1.57-3.5-3.5-3.5ZM15 19.38l-4.55-2.28a1 1 0 0 0-.89 0l-4.55 2.28V5.5c0-.83.67-1.5 1.5-1.5h8.85c-.22.46-.35.96-.35 1.5v13.88ZM20 11h-3V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path>
</svg>
             <li><NavLink className="text-[17px] px-1 font-medium" to="/provider/requests">Service Requests</NavLink></li>

        </div>
       
        
      
    </ul>

      
    </div>
  )
}

export default Sidebar
