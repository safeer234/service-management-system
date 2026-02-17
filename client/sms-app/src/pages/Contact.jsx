import React from 'react'
import contactimg1 from "../assets/images/contact images/customer-service-executive.png"
function Contact() {
  return (
    <div className='mb-20'>
     <header className='bg-[#ea580c]'>
      {/* main div */}
      <div className='flex items-center justify-around gap-150'>
        {/* contact div */}
        <div >
          <h1 className='text-5xl text-white '>Contact Us</h1>
          <p className='py-5 text-white'>Get in touch with us for any questions<br/> or support </p>

        </div>
        {/* img div */}
        <div>
          <img className='h-50' src={contactimg1} alt="" />

        </div>
      </div>

     </header>
     <main>
      <div className='py-10'>
        <h2 className=' px-30 text-2xl font-medium'>Get In Touch</h2>
      </div>

      <div className='flex gap-0'>
<div className='px-30 '>

   

      {/* first div */}
      <div className=' mb-5 border-3 text-lg font-medium border-[#ea580c] rounded-3xl h-20 w-65 px-7  flex items-center gap-3'>
        {/* svg */}
        <div>
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M18.07 22h.35c.47-.02.9-.26 1.17-.64l2.14-3.09c.23-.33.32-.74.24-1.14s-.31-.74-.64-.97l-4.64-3.09a1.47 1.47 0 0 0-.83-.25c-.41 0-.81.16-1.1.48l-1.47 1.59c-.69-.43-1.61-1.07-2.36-1.82-.72-.72-1.37-1.64-1.82-2.36l1.59-1.47c.54-.5.64-1.32.23-1.93L7.84 2.67c-.22-.33-.57-.57-.97-.64a1.46 1.46 0 0 0-1.13.24L2.65 4.41c-.39.27-.62.7-.64 1.17-.03.69-.16 6.9 4.68 11.74 4.35 4.35 9.81 4.69 11.38 4.69ZM6.88 10.05c-.16.15-.21.39-.11.59.05.09 1.15 2.24 2.74 3.84 1.6 1.6 3.75 2.7 3.84 2.75.2.1.44.06.59-.11l1.99-2.15 3.86 2.57-1.7 2.46c-1.16 0-6.13-.24-9.99-4.1S4 7.06 4 5.91l2.46-1.7 2.57 3.86-2.15 1.99Z"></path>
</svg>

        </div>
        {/* cont */}
        <div>
          <p>Call Us</p>
          <p>+ 124 456 789</p>

        </div>

      </div>

      {/* second div */}
      <div className=' mb-5 border-3 text-lg font-medium border-[#ea580c] rounded-3xl h-20 w-65 justify-center flex items-center gap-3'>
         {/* svg */}
        <div>
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-8.61 10.79c.18.14.4.21.61.21s.43-.07.61-.21l1.55-1.21L18.58 18H5.41l4.42-4.42 1.55 1.21ZM20 6v.51l-8 6.22-8-6.22V6zm0 3.04v7.54l-4.24-4.24zm-11.76 3.3L4 16.58V9.04zM20 18"></path>
</svg>

        </div>
        {/* cont */}
        <div>
          <p>Email Us</p>
          <p>info@servicehub.com</p>

        </div>

        
      </div>


      {/* third div */}
      <div className=' border-3 text-lg font-medium border-[#ea580c] rounded-3xl h-20 w-65 justify-center flex items-center gap-3'>
         {/* svg */}
        <div>
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M16 10c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4m-6 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2"></path><path d="M11.42 21.81c.17.12.38.19.58.19s.41-.06.58-.19c.3-.22 7.45-5.37 7.42-11.82 0-4.41-3.59-8-8-8s-8 3.59-8 8c-.03 6.44 7.12 11.6 7.42 11.82M12 4c3.31 0 6 2.69 6 6 .02 4.44-4.39 8.43-6 9.74-1.61-1.31-6.02-5.29-6-9.74 0-3.31 2.69-6 6-6"></path>
</svg>

        </div>
        {/* cont */}
        <div>
          <p> Visit Us</p>
          <p>123 Main street,kerala</p>

        </div>
        
      </div>
         </div>


{/* second div */}
        <div className=' rounded-2xl w-120 h-90   shadow-[0_25px_60px_rgba(0,0,0,0.3)]'>
          

          <form action="">
            <div className='px-10 py-5'>
              <h3 className='text-center text-2xl mb-4 font-medium'>Message <span className='text-[#ea580c]'>Us</span></h3>
               <input className='border-b border-[#a3a3a3] w-100 mb-8' type="text" placeholder=' Your Name' />
               <input className='border-b border-[#a3a3a3] w-100 mb-8' type="text"placeholder=' Your Email' />
               <input className='border-b border-[#a3a3a3] w-100 mb-8' type="text"placeholder=' Subject' />
                <input className='border-b border-[#a3a3a3] w-100 mb-8' type="text"placeholder='Message' />
                <div className='flex justify-center'>
                  <button className='flex justify-center w-35 hover:scale-105 transition duration-300 h-9 text-white items-center rounded-3xl bg-[#ea580c]'>Send Message</button>
                </div>
                

            </div>

           


            
          </form>

        </div>




      </div>




      

     </main>
    </div>
  )
}

export default Contact
