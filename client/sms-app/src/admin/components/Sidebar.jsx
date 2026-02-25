
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
    to="/admin/dashboard"
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
             <li><NavLink className="text-[17px] px-1 font-medium" to="/admin/bookings">Bookings</NavLink></li>

        </div>
       
        <div className='flex gap-1 mb-5'>
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="white" viewBox="0 0 24 24" >

<path d="M10 13H8c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5m-5 5c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3zm7.73-11.49c-.08-.22-.19-.42-.3-.62v-.01c-.69-1.14-1.93-1.89-3.42-1.89-2.28 0-4 1.72-4 4s1.72 4 4 4c1.49 0 2.73-.74 3.42-1.89v-.01c.12-.2.22-.4.3-.62.02-.06.03-.12.05-.18.06-.17.11-.34.15-.52.05-.25.07-.51.07-.78s-.03-.53-.07-.78c-.03-.18-.09-.35-.15-.52-.02-.06-.03-.12-.05-.18M9 10c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2m6 0q-.165 0-.33-.03c-.22.66-.56 1.27-.98 1.81.41.13.84.22 1.31.22 2.28 0 4-1.72 4-4s-1.72-4-4-4c-.47 0-.9.09-1.31.22.43.53.76 1.14.98 1.81.11-.01.21-.03.33-.03 1.18 0 2 .82 2 2s-.82 2-2 2m1 3h-1.11c.6.58 1.08 1.27 1.44 2.03C17.83 15.2 19 16.46 19 18h-2v1c0 .35-.07.69-.18 1H20c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5"></path>
</svg>
             <li><NavLink className="text-[17px] px-1 font-medium" to="/admin/users">Users</NavLink></li>

        </div>
       
        <div className='flex gap-1 mb-5'> 
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="white" viewBox="0 0 24 24" >

<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path>
</svg>
            <li><NavLink className="text-[17px] px-1 font-medium" to="/admin/addService">Add Service</NavLink></li>

        </div>
       
        <div className='flex gap-1'> 
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="white" viewBox="0 0 24 24" >

<path d="M4 11h16v2H4zm0-5h16v2H4zm0 10h16v2H4z"></path>
</svg>
             <li><NavLink className="text-[17px] px-1 font-medium" to="/admin/allServices">All Services</NavLink></li>

        </div>
      
    </ul>

      
    </div>
  )
}

export default Sidebar
