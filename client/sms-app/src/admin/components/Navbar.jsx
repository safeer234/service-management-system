import React from 'react'
import { useState } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { Menu, X } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import Sidebar from '../../admin/components/Sidebar';

function Navbar() {
    const dispatch = useDispatch();
      const [isOpen, setIsOpen] = useState(false);
      const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  return (
    <div >
        {/* header */}
      <div className='shadow-[0_25px_60px_rgba(0,0,0,0.3)]'>
        <div className='flex justify-between  items-center px-10 py-5'>
            {/* logo */}
            <NavLink to="/home" className="text-2xl font-medium ">
                Service<span className='text-[#ea580c]'>Hub</span>
            </NavLink>
            {/* desktop Menu */}
            {!isAuthenticated ?(
                <ul className='hidden  lg:items-center lg:flex gap-6 '>
              
            </ul>

            ):(
                <ul className='hidden  lg:items-center lg:flex gap-6 '>
               
            </ul>

            )}
            
            {/* desktop login/signup */}
            {!isAuthenticated ? (
 <ul className='hidden lg:flex gap-3'>
           
                      
               
            </ul>

            ):(
                <ul>
                   <Link to="/auth/login"> <li onClick={()=>{dispatch(logout())}} className='font-medium border-2 border-[#ea580c] rounded-3xl flex justify-center items-center w-20 h-8 text-[#ea580c] cursor-pointer hover:scale-104 transition duration-300'>Logout</li></Link>
                </ul>

            )}
            
           

            {/* mobile hamburger button */}
            <button className='lg:hidden px-3' onClick={()=> setIsOpen(!isOpen)}>
                {isOpen ?<X size={28} /> : <Menu size={28} />}

            </button>

        </div>
        

        {/*----------------------- mobile menu------------------ */}
        {isOpen && (
            <ul className='lg:hidden flex flex-col gap-4 bg-white p-4'>
                <li>Home</li>
                <li>Services</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        )}


      </div>
      
      <main>
        <div className='z-10 absolute px-90    '>
             <Outlet />
        </div>
       <div>
        
       </div>
      <Sidebar />
        
       
       
      </main>
        
    </div>
  )
}

export default Navbar
