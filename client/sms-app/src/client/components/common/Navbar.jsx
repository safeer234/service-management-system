import React from 'react'
import { useState } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { Menu, X, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import axios from 'axios';

function Navbar() {

const dispatch = useDispatch();
const [isOpen, setIsOpen] = useState(false);
const [profileOpen,setProfileOpen] = useState(false)

const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
const user = useSelector((state)=>state.auth.user)

const [image,setImage] = useState(localStorage.getItem("profileImage") || "")

const handleImageChange = (e)=>{
const file = e.target.files[0]

if(file){
const reader = new FileReader()

reader.onloadend = ()=>{
setImage(reader.result)
localStorage.setItem("profileImage",reader.result)
}

reader.readAsDataURL(file)
}
}

const handleLogout = async () => {
  try {

    await axios.post(
      "https://service-management-system-hj06.onrender.com/api/auth/logout",
      {},
      { withCredentials: true }
    );

    dispatch(logout());
    setProfileOpen(false);

  } catch (error) {
    console.log(error);
  }
};

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

              <Link to="/auth/login"> 
              <li className='font-medium border-2 border-[#ea580c] rounded-3xl flex justify-center items-center w-20 h-8 text-[#ea580c] cursor-pointer hover:scale-104 transition duration-300'>Login</li>
              </Link>

               <Link to="/auth/signup"> 
               <li className='font-medium bg-[#ea580c] rounded-3xl flex justify-center items-center w-20 h-8 text-white hover:scale-104 transition duration-300  cursor-pointer'>SignUp</li>
               </Link>

            </ul>

            ):(

                <ul className='hidden lg:flex items-center gap-4'>

                   {/* USER ICON */}
                   <button
                   onClick={()=>setProfileOpen(true)}
                   className='cursor-pointer'
                   >

                   {image ? (
                    <img
                    src={image}
                    alt="profile"
                    className='w-9 h-9 rounded-full object-cover border'
                    />
                   ):(
                    <User size={26}/>
                   )}

                   </button>

                </ul>

            )}
            

            {/* mobile hamburger button */}
            <button className='lg:hidden px-3' onClick={()=> setIsOpen(!isOpen)}>
                {isOpen ?<X size={28} /> : <Menu size={28} />}
            </button>

        </nav>


        {/* mobile menu */}

    {isOpen && (
  !isAuthenticated ? (
    <ul className='lg:hidden flex flex-col gap-4 bg-white p-4'>
      <Link to="/auth/login"><li>Home</li></Link>
      <Link to="/auth/login"><li>Services</li></Link>
      <Link to="/auth/login"><li>About</li></Link>
      <Link to="/auth/login"><li>Contact</li></Link>
    </ul>
  ) : (
    <ul className='lg:hidden flex flex-col gap-4 bg-white p-4'>

      <Link to="/home"><li>Home</li></Link>
      <Link to="/services"><li>Services</li></Link>
      <Link to="/bookings"><li>My Bookings</li></Link>
      <Link to="/about"><li>About</li></Link>
      <Link to="/contact"><li>Contact</li></Link>

      <li onClick={()=>setProfileOpen(true)} className='cursor-pointer flex items-center gap-2'>
        <User size={20}/> Profile
      </li>

    </ul>
  )
)}

      </header>


{/* ================= PROFILE SIDEBAR ================= */}

{profileOpen && (

<div className='fixed inset-0 z-50 flex'>

{/* overlay */}
<div
className='flex-1 bg-black/40'
onClick={()=>setProfileOpen(false)}
></div>

{/* sidebar */}
<div className='w-80 bg-white shadow-xl p-6 flex flex-col gap-6'>

<h2 className='text-xl font-semibold'>Profile</h2>


{/* PROFILE IMAGE */}
<div className='flex flex-col items-center gap-3'>

{image ? (
<img
src={image}
alt="profile"
className='w-24 h-24 rounded-full object-cover border'
/>
):(
<div className='w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center'>
<User size={40}/>
</div>
)}

<input
type="file"
accept="image/*"
onChange={handleImageChange}
className='text-sm'
/>

</div>


{/* USER INFO */}

<div className='text-sm space-y-2'>

<p>
<span className='font-medium'>Email:</span>
<br/>
{user?.email || "user@email.com"}
</p>

<p>
<span className='font-medium'>Phone:</span>
<br/>
{user?.phone || "Not available"}
</p>

</div>


{/* LOGOUT */}

<button
onClick={handleLogout}
className='bg-[#ea580c] text-white py-2 rounded hover:bg-orange-600'
>
Logout
</button>

</div>

</div>

)}

    </div>
  )
}

export default Navbar