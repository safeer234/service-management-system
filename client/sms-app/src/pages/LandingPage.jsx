import React from 'react'
import heroimg from "../assets/images/heroimage/renovation-and-decoration-of-room.png"
function LandingPage() {
  return (
    <div>
   <section className='h-screen  mx-auto px-4 py-10 lg:py-20'>
    {/* main div */}
    <div className='flex flex-col lg:flex-row items-center gap-10 px-20 py-10 lg:gap-16'>
      {/* content div */}
      <div>
        <h1 className='text-7xl'>Find and Hire <br />Service Professionals

        </h1><br />

        <p className='font-medium text-xl'>Connect with trusted experts for all your home and business needs. <br />
Book reliable services quickly, securely, and with confidence.</p>
<div className='flex gap-3  py-10'>
        <button className='bg-[#ea580c] rounded-3xl text-white w-30 h-10 flex items-center justify-center text-lg hover:bg-white hover:border-2 hover:border-[#ea580c] hover:text-[#ea580c]'>Contact</button>
        <button className='border-2 border-[#ea580c] rounded-3xl text-[#ea580c] w-30 h-10 flex items-center justify-center text-lg hover:bg-[#ea580c]  hover:text-white'>Book Service</button>
      </div>

      </div>

      
      {/* image div */}

      <div>
        <img src={heroimg} alt="" />

      </div>

      

    </div>

    



   </section>

   <section className=' mx-auto px-4 py-10 lg:py-5'>
    <div className='px-20'>
      <h2 className='text-3xl font-medium'>Popular Services</h2>

    </div>

   </section>
   
    </div>
  )
}

export default LandingPage
