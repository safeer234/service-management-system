import React from 'react'
import headerimg from "../assets/images/services/header img/serviceimg.png"
import headerimg2 from "../assets/images/services/header img/serviceimg2.png"
function Services() {
  return (
    <div>
     {/* header */}
     <header className='flex items-center gap-80 px-10 py-5 bg-[#ea580c]'>
      {/* img div */}
      <div>
        <img className='w-60' src={headerimg} alt="" />
      </div>
      {/* content div */}
      <div>
        <h1 className='text-5xl text-white'>Our Services</h1>
        <p className='text-white'>Explore top-rated services that we offer</p>
      </div>

      {/* img div */}
      <div className='px-20'>
        <img className='w-30' src={headerimg2} alt="" />
      </div>
     </header>

    </div>
  )
}

export default Services
