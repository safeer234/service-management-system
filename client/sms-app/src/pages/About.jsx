import React from 'react'
import aboutimg1 from "../assets/images/about images/under-constructions.png"
import aboutimg2 from "../assets/images/about images/architect-and-assistant-discussing-about-plan-with-blueprint.png"

function About() {
  return (
    <div className='mb-20'>
      <header className='bg-[#ea580c]'>
        {/* main div */}
        <div className='flex items-center justify-around gap-150'>
          {/* about div */}
          <div>
            <h1 className='text-5xl text-white'>About Us</h1>
            <p className='text-white'>Learn more about our mission and values</p>
          


          </div>
          {/* img div */}
          <div>
            <img className='w-60 h-40' src={aboutimg1}alt="" />


          </div>
        </div>
      </header>
      <main>
        {/* main div */}
        {/* main div */}
        <div className='flex py-10 items-center justify-around'>
          {/* content div */}
          <div>
            <h2 className='text-5xl'><u>Our Mission</u></h2><br />
            <p>At ServiceHub, our mission is to connect<br /> clients with trusted service providers seamlessly.<br />We strive to provide a reliable, easy-to-use platform<br /> where clients can find skilled proffesionals for their<br /> home service needs. </p>


          </div>
          {/* img div */}
          <div>
            <img src={aboutimg2} alt="" />

          </div>

        </div>

        {/* banner contents */}

        {/* main div */}
        <div className='flex items-center px-35 gap-70 '>
          {/* first div */}
          <div className='flex flex-col items-center text-center'>
            
               <svg className='hover:scale-105 transition duration-300' xmlns="http://www.w3.org/2000/svg" width={54} height={54} fill={"#ea580c"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m20.42 6.11-7.97-4c-.28-.14-.62-.14-.9 0l-7.97 4c-.31.15-.51.45-.55.79-.01.11-.96 10.76 8.55 15.01a.98.98 0 0 0 .82 0C21.91 17.66 20.97 7 20.95 6.9a.98.98 0 0 0-.55-.79ZM12 19.9C5.26 16.63 4.94 9.64 5 7.64l7-3.51 7 3.51c.04 1.99-.33 9.02-7 12.26"></path><path d="m11 12.59-1.29-1.3-1.42 1.42 2.71 2.7 4.71-4.7-1.42-1.42z"></path></svg>
           

           
              <h2 className='text-center text-xl font-semibold'>Trusted Professionals</h2>
              <p>All service providers are verified<br/> and approved by our team</p>

          </div>

           {/* second div */}
          <div className='flex flex-col items-center text-center'>
            
              <svg  xmlns="http://www.w3.org/2000/svg" width="54" height="54"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M12 2C6.58 2 2 6.58 2 12s4.58 10 10 10 10-4.58 10-10S17.42 2 12 2m0 18c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8-3.66 8-8 8"></path><path d="M13 7h-2v6h6v-2h-4z"></path>
</svg>

           
              <h2 className='text-center text-xl font-semibold'>Quick & Reliable</h2>
              <p>All services are delivered on time<br/> with speed and efficiency. </p>

          </div>


           {/* third div */}
          <div className='flex flex-col items-center text-center'>
            
             <svg  xmlns="http://www.w3.org/2000/svg" width="54" height="54"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M19.17 9h-4.02c-.32 0-.61-.14-.8-.4a.99.99 0 0 1-.16-.88l.54-1.9c.26-.91.08-1.87-.49-2.63S12.8 2 11.84 2h-1.35c-.45 0-.84.3-.96.73L8.38 6.74a3.99 3.99 0 0 1-3.13 2.84l-2.44.44c-.48.09-.82.5-.82.98v9c0 .55.45 1 1 1h2.42c.94 0 1.87.15 2.77.45 1.1.37 2.24.55 3.4.55h5.59c1.56 0 2.83-1.27 2.83-2.83 0-.46-.11-.9-.31-1.28a2.83 2.83 0 0 0 1-3.67c.79-.5 1.31-1.39 1.31-2.39C22 10.27 20.73 9 19.17 9m0 3.67H18c-.55 0-1 .45-1 1s.45 1 1 1h.17c.46 0 .83.37.83.83s-.37.83-.83.83H17c-.55 0-1 .45-1 1s.45 1 1 1h.17c.46 0 .83.37.83.83s-.37.83-.83.83h-5.59c-.94 0-1.87-.15-2.77-.45-1.1-.37-2.24-.55-3.4-.55H3.99v-7.17l1.62-.29a5.98 5.98 0 0 0 4.7-4.25l.94-3.29h.59c.32 0 .61.14.8.4.19.25.25.57.16.88l-.54 1.9c-.26.91-.08 1.87.49 2.63s1.44 1.19 2.4 1.19h4.02c.46 0 .83.37.83.83s-.37.83-.83.83Z"></path>
</svg>
           

           
              <h2 className='text-center text-xl font-semibold'>Customer Satisfaction</h2>
              <p>We prioritize your happiness <br/>with quality service every time. </p>

          </div>






        </div>


        <div className='py-20 text-3xl font-semibold'> 
          <h3 className='text-center'>Why Choose Us?</h3>

        </div>

       














           {/* banner contents */}

        {/* main div */}
        <div className='flex items-center px-35 gap-70 py-0'>
        
          {/* first div */}
          <div className='flex flex-col items-center text-center'>
            
               <svg className='hover:scale-105 transition duration-300' xmlns="http://www.w3.org/2000/svg" width={54} height={54} fill={"#ea580c"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m20.42 6.11-7.97-4c-.28-.14-.62-.14-.9 0l-7.97 4c-.31.15-.51.45-.55.79-.01.11-.96 10.76 8.55 15.01a.98.98 0 0 0 .82 0C21.91 17.66 20.97 7 20.95 6.9a.98.98 0 0 0-.55-.79ZM12 19.9C5.26 16.63 4.94 9.64 5 7.64l7-3.51 7 3.51c.04 1.99-.33 9.02-7 12.26"></path><path d="m11 12.59-1.29-1.3-1.42 1.42 2.71 2.7 4.71-4.7-1.42-1.42z"></path></svg>
           

           
              <h2 className='text-center text-xl font-semibold'>Trusted Professionals</h2>
              <p>All service providers are verified<br/> and approved by our team</p>

          </div>

           {/* second div */}
          <div className='flex flex-col items-center text-center'>
            
             <svg  xmlns="http://www.w3.org/2000/svg" width="54" height="54"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M7 10h10v2H7zm0 4h7v2H7z"></path><path d="M19 3h-2c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 17H5V5h2v2h10V5h2z"></path>
</svg>

           
              <h2 className='text-center text-xl font-semibold'>Easy Booking Process</h2>
              <p>Book your required service quickly
<br/>in just a few simple steps. </p>

          </div>


           {/* third div */}
          <div className='flex flex-col items-center text-center'>
            
           <svg  xmlns="http://www.w3.org/2000/svg" width="54" height="54"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M18.07 22h.35c.47-.02.9-.26 1.17-.64l2.14-3.09c.23-.33.32-.74.24-1.14s-.31-.74-.64-.97l-4.64-3.09a1.47 1.47 0 0 0-.83-.25c-.41 0-.81.16-1.1.48l-1.47 1.59c-.69-.43-1.61-1.07-2.36-1.82-.72-.72-1.37-1.64-1.82-2.36l1.59-1.47c.54-.5.64-1.32.23-1.93L7.84 2.67c-.22-.33-.57-.57-.97-.64a1.46 1.46 0 0 0-1.13.24L2.65 4.41c-.39.27-.62.7-.64 1.17-.03.69-.16 6.9 4.68 11.74 4.35 4.35 9.81 4.69 11.38 4.69ZM6.88 10.05c-.16.15-.21.39-.11.59.05.09 1.15 2.24 2.74 3.84 1.6 1.6 3.75 2.7 3.84 2.75.2.1.44.06.59-.11l1.99-2.15 3.86 2.57-1.7 2.46c-1.16 0-6.13-.24-9.99-4.1S4 7.06 4 5.91l2.46-1.7 2.57 3.86-2.15 1.99Z"></path>
</svg>
           

           
              <h2 className='text-center text-xl font-semibold'> Support Team</h2>
              <p>Our support team is  
 <br/> ready to assist on time.</p>

          </div>






        </div>

      </main>
    </div>
  )
}

export default About
