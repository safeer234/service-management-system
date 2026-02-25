import React from 'react'
import { useState } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';

function Navbar() {
    const dispatch = useDispatch();
      const [isOpen, setIsOpen] = useState(false);
      const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  return (
    <div >
        {/* header */}
      <header>
        <nav className='flex justify-between  items-center px-10 py-5'>
            {/* logo */}
            <NavLink to="/home" className="text-2xl font-medium ">
                Service<span className='text-[#ea580c]'>Hub</span>
            </NavLink>
            {/* desktop Menu */}
            {!isAuthenticated ?(
                <ul className='hidden  lg:items-center lg:flex gap-6 '>
                <li className='font-medium hover:text-[#ea580c]'><NavLink to="/home">Home</NavLink></li>
                <li className='font-medium hover:text-[#ea580c]'><NavLink to="/auth/login">Services</NavLink></li>
                <li className='font-medium hover:text-[#ea580c]'><NavLink to="/auth/login">About</NavLink></li>
                <li className='font-medium hover:text-[#ea580c]'><NavLink to="/auth/login">Contact</NavLink></li>
            </ul>

            ):(
                <ul className='hidden  lg:items-center lg:flex gap-6 '>
                <li className='font-medium hover:text-[#ea580c]'><NavLink to="/home">Home</NavLink></li>
                <li className='font-medium hover:text-[#ea580c]'><NavLink to="/services">Services</NavLink></li>
                                <li className='font-medium hover:text-[#ea580c]'><NavLink to="/bookings">My Bookings</NavLink></li>
                <li className='font-medium hover:text-[#ea580c]'><NavLink to="/about">About</NavLink></li>
                <li className='font-medium hover:text-[#ea580c]'><NavLink to="/contact">Contact</NavLink></li>
            </ul>

            )}
            
            {/* desktop login/signup */}
            {!isAuthenticated ? (
 <ul className='hidden lg:flex gap-3'>
              <Link to="/auth/login"> <li className='font-medium border-2 border-[#ea580c] rounded-3xl flex justify-center items-center w-20 h-8 text-[#ea580c] cursor-pointer hover:scale-104 transition duration-300'>Login</li></Link>
               <Link to="/auth/signup"> <li className='font-medium bg-[#ea580c] rounded-3xl flex justify-center items-center w-20 h-8 text-white hover:scale-104 transition duration-300  cursor-pointer'>SignUp</li></Link>
                      
               
            </ul>

            ):(
                <ul className='flex gap-3 items-center'>
                   <div><Link to="/cart"></Link><svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M21 6H7.05L5.94 2.68A1 1 0 0 0 4.99 2h-3v2h2.28l3.54 10.63A2 2 0 0 0 9.71 16h7.59a2 2 0 0 0 1.87-1.3l2.76-7.35c.11-.31.07-.65-.11-.92A1 1 0 0 0 21 6m-3.69 8H9.72l-2-6h11.84zM10 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"></path>
</svg></div>
                   <Link to="/auth/login"> <li onClick={()=>{dispatch(logout())}} className='font-medium border-2 border-[#ea580c] rounded-3xl flex justify-center items-center w-20 h-8 text-[#ea580c] cursor-pointer hover:scale-104 transition duration-300'>Logout</li></Link>
                </ul>

            )}
            
           

            {/* mobile hamburger button */}
            <button className='lg:hidden px-3' onClick={()=> setIsOpen(!isOpen)}>
                {isOpen ?<X size={28} /> : <Menu size={28} />}

            </button>

        </nav>

        {/*----------------------- mobile menu------------------ */}
        {isOpen && (
            <ul className='lg:hidden flex flex-col gap-4 bg-white p-4'>
                <li>Home</li>
                <li>Services</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        )}


      </header>
    </div>
  )
}

export default Navbar
