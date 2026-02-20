import React from 'react'
import loginimg from "../assets/images/login image/repair-services-for-equipment-vehicles-and-home-maintenance.png" 
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

const [formData, setFormData] = useState({
  username: "",
  phone: "",
  email: "",
  password: "",
  role: "client",
});

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSignup = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    await axios.post(
      "http://localhost:5000/api/auth/signup",
      formData,
      { withCredentials: true }
    );

    // After successful signup redirect to login
    navigate("/login");

  } catch (err) {
    setError(
      err.response?.data?.message || "Signup failed"
    );
  } finally {
    setLoading(false);
  }
};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


  return (
    <div className='flex justify-center h-screen items-center'>
      <div className=' flex  w-200 h-110  shadow-[0_25px_60px_rgba(0,0,0,0.3)]'>
{/* img div */}
        <div>
            <img className='h-100 ' src={loginimg} alt="" />

        </div>
        {/* content div */}


        <div>
            
              <div className='px-35 py-10 font-medium text-2xl'>
                <h1 className=''>Sign <span className='text-[#ea580c]'>Up</span></h1>
              </div>

              {/* email and pass div */}
              <div className=' px-10'>
                
              <form className='mb-6' onSubmit={handleSignup} action="">
                {/* username div */}
                <div className='flex mb-4 gap-2 border-b-2 border-[#a3a3a3]'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"></path>
</svg>

                    <input className='w-70'
                     type="text"
                     name="username"
                     value={formData.username}
                     onChange={handleChange}
                      placeholder='Username' />
                </div>


                  {/* phone number div */}
                <div className='flex gap-2 mb-4 border-b-2 border-[#a3a3a3]'>
     <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M7 22h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2M7 4h10v16H7z"></path><path d="M12 17a1 1 0 1 0 0 2 1 1 0 1 0 0-2"></path>
</svg>

                    <input 
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                     placeholder='Phone Number' />
                </div>


                   {/* email div */}
                <div className='flex gap-2 mb-4 border-b-2 border-[#a3a3a3]'>
                  <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 2v.51l-8 6.22-8-6.22V6zM4 18V9.04l7.39 5.74c.18.14.4.21.61.21s.43-.07.61-.21L20 9.03v8.96H4Z"></path>
</svg>

                    <input
                     type="text"
                     name='email'
                     value={formData.email}
                     onChange={handleChange}
                      placeholder='Email' />
                </div>





                   {/* password div */}
                <div className='flex gap-2 mb-2 border-b-2 border-[#a3a3a3]'>
                   <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M6 22h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5S7 4.24 7 7v2H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2M9 7c0-1.65 1.35-3 3-3s3 1.35 3 3v2H9zm-3 4h12v9H6z"></path>
</svg>

                    <input
                     type="text"
                     name='password'
                     value={formData.password}
                     onChange={handleChange}
                      placeholder='Password' />
                </div>


                <select className='mb-2' value={formData.role} onChange={handleChange} name="role" id="">
                
                  <option value="client">Client</option>
                  <option value="provider">provider</option>
                </select>









                {/* remember and forget pass div */}

                <div className='flex'>
                    {/* remember */}

                    <div className='flex gap-2 mb-6'>
                       <input type="checkbox" />

                       <div className='flex gap-22'>
                        <div>
                          <p className='text-sm text-[#ea580c]'>I agree to terms and conditions</p>

                       </div>
                   



                       </div>

                       
                     
                      
                    </div>
                  
                </div>

                <div className='flex justify-center h-9 rounded   bg-[#ea580c]  '>
                    <button className='text-white'> {loading ? "Signing up..." : "Sign Up"}</button>
                </div>

                {error && (
  <p className="text-red-500 text-center mt-2">{error}</p>
)}

            

                
              </form>
              <div className='text-center'>
                <p className='text-[#ea580c] '>Already have an account? <Link to="/login"><span className='font-semibold'>Log In</span></Link> </p>
              </div>
          



              </div>



        </div>

      </div>
    </div>
  )
}

export default Signup
