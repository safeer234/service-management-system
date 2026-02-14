import React from 'react'
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
function Navbar() {
      const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
        {/* header */}
      <header>
        <nav className=' flex justify-between  items-center px-10 py-5'>
            {/* logo */}
            <NavLink to="/home" className="text-2xl font-medium ">
                ServiceHub
            </NavLink>
            {/* desktop Menu */}
            <ul className='hidden  lg:items-center lg:flex gap-6 '>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/services">Services</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            {/* desktop login/signup */}
            <ul className='hidden lg:flex'>
                <li>Login</li>
                <li>Signup</li>
            </ul>

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
