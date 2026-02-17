import React from 'react'
import loginimg from "../assets/images/login image/repair-services-for-equipment-vehicles-and-home-maintenance.png" 
import { Link } from 'react-router-dom'
function Login() {
  return (
    <div className='flex justify-center h-screen items-center'>
      <div className=' flex  w-200 h-100  shadow-[0_25px_60px_rgba(0,0,0,0.3)]'>
{/* img div */}
        <div>
            <img className='h-100 ' src={loginimg} alt="" />

        </div>
        {/* content div */}


        <div>
            
              <div className='px-35 py-10 font-medium text-2xl'>
                <h1 className=''>Log <span className='text-[#ea580c]'>in</span></h1>
              </div>

              {/* email and pass div */}
              <div className=' px-10'>
                
              <form className='mb-6' action="">
                {/* email div */}
                <div className='flex mb-6 gap-2 border-b-2 border-[#a3a3a3]'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-8.61 10.79c.18.14.4.21.61.21s.43-.07.61-.21l1.55-1.21L18.58 18H5.41l4.42-4.42 1.55 1.21ZM20 6v.51l-8 6.22-8-6.22V6zm0 3.04v7.54l-4.24-4.24zm-11.76 3.3L4 16.58V9.04zM20 18"></path>
</svg>

                    <input className='w-70' type="text" placeholder='Email' />
                </div>


                  {/* password div */}
                <div className='flex gap-2 mb-4 border-b-2 border-[#a3a3a3]'>
                   <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M6 22h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5S7 4.24 7 7v2H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2M9 7c0-1.65 1.35-3 3-3s3 1.35 3 3v2H9zm-3 4h12v9H6z"></path>
</svg>

                    <input type="text" placeholder='Password' />
                </div>
                {/* remember and forget pass div */}

                <div className='flex'>
                    {/* remember */}

                    <div className='flex gap-2 mb-10'>
                       <input type="checkbox" />

                       <div className='flex gap-22'>
                        <div>
                          <p className='text-sm text-[#ea580c]'>Remember me</p>

                       </div>
                       <div>
                         <p className='text-sm text-[#ea580c]'>Forgot Password?</p>


                       </div>




                       </div>

                       
                     
                      
                    </div>
                  
                </div>

                <div className='flex justify-center h-9 rounded   bg-[#ea580c]  '>
                    <button className='text-white'>Log In</button>
                </div>

                

            

                
              </form>
              <div className='text-center'>
                <p className='text-[#ea580c] '>Don't have an account? <Link to="/signup"><span className='font-semibold'>Sign Up</span></Link> </p>
              </div>
          



              </div>



        </div>

      </div>
    </div>
  )
}

export default Login
