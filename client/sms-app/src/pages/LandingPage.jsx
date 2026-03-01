import React, { useEffect, useState } from 'react'
import heroimg from "../assets/images/heroimage/renovation-and-decoration-of-room.png"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from "axios"
import { toast } from "react-toastify"

function LandingPage() {

  const navigate = useNavigate()
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

  const [popularServices, setPopularServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [loading, setLoading] = useState(false)

  const [bookingData, setBookingData] = useState({
    serviceType: "",
    serviceAddress: "",
    preferredDate: "",
    estimatedPrice: "",
    description: ""
  })

  const today = new Date().toISOString().split("T")[0]

  // ⭐ Random Rating Generator
  const generateRating = () => (Math.random() * 2 + 3).toFixed(1)

  // Fetch Popular Services
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get(
          "https://service-management-system-hj06.onrender.com/api/services/popular"
        )
        setPopularServices(
          res.data.data.map(service => ({
            ...service,
            rating: generateRating()
          }))
        )
      } catch (err) {
        console.log(err)
      }
    }

    fetchPopular()
  }, [])

  // Booking Function
  const handleBooking = async () => {
    try {
      setLoading(true)

      const res = await axios.post(
        "https://service-management-system-hj06.onrender.com/api/client/request",
        {
          ...bookingData,
          serviceId: selectedService._id
        },
        { withCredentials: true }
      )

      toast.success("Service booked successfully 🎉")

      setSelectedService(null)

      setBookingData({
        serviceType: "",
        serviceAddress: "",
        preferredDate: "",
        estimatedPrice: "",
        description: ""
      })

      // 💳 Redirect to payment page
      navigate(`/payment/${res.data.data._id}`)

    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

   {/* HERO SECTION (UNCHANGED DESIGN) */}

   <section className='h-screen mx-auto px-4 py-10 lg:py-20'>
    <div className='flex flex-col lg:flex-row items-center gap-10 px-20 py-10 lg:gap-16'>

      <div>
        <h1 className='text-7xl'>Find and Hire <br />Service Professionals</h1><br />
        <p className='font-medium text-xl'>
          Connect with trusted experts for all your home and business needs. <br />
          Book reliable services quickly, securely, and with confidence.
        </p>

        {!isAuthenticated ?(
          <div className='flex gap-3 py-10'>
            <Link to="/auth/login" className='bg-[#ea580c] rounded-3xl text-white w-30 h-10 flex items-center justify-center text-lg hover:bg-white hover:border-2 hover:border-[#ea580c] hover:text-[#ea580c]'>Contact</Link>
            <Link to="/auth/login" className='border-2 border-[#ea580c] rounded-3xl text-[#ea580c] w-30 h-10 flex items-center justify-center text-lg hover:bg-[#ea580c] hover:text-white'>Book Service</Link>
          </div>
        ):(
          <div className='flex gap-3 py-10'>
            <Link to="/contact" className='bg-[#ea580c] rounded-3xl text-white w-30 h-10 flex items-center justify-center text-lg hover:bg-white hover:border-2 hover:border-[#ea580c] hover:text-[#ea580c]'>Contact</Link>
            <Link to="/services" className='border-2 border-[#ea580c] rounded-3xl text-[#ea580c] w-30 h-10 flex items-center justify-center text-lg hover:bg-[#ea580c] hover:text-white'>Book Service</Link>
          </div>
        )}
      </div>

      <div>
        <img src={heroimg} alt="" />
      </div>

    </div>
   </section>

   {/* POPULAR SERVICES */}

   <section className='mx-auto px-20 py-10'>
      <h2 className='text-3xl font-medium mb-8'>Popular Services</h2>

      <div className='grid grid-cols-3 gap-6'>
        {popularServices.map((service)=>(
          <div key={service._id} className='bg-white shadow-lg rounded-xl p-4 hover:scale-105 duration-300'>

            <img
              src={service.image}
              alt={service.name}
              className='h-40 w-full object-cover rounded-md mb-3'
            />

            <h3 className='text-lg font-semibold'>{service.name}</h3>
            <p className='text-sm text-gray-600 mb-2'>{service.description}</p>

            {/* ⭐ Rating */}
            <div className="flex items-center gap-1 mb-2">
              {"★★★★★".split("").map((_, i)=>(
                <span key={i} className={i < Math.round(service.rating) ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
              <span className="text-sm text-gray-500 ml-1">
                ({service.rating})
              </span>
            </div>

            <p className='font-bold text-[#ea580c]'>₹ {service.price}</p>

            <button
              onClick={()=> setSelectedService(service)}
              className='mt-3 w-full bg-[#ea580c] text-white py-2 rounded hover:bg-orange-600'
            >
              Book Service
            </button>

          </div>
        ))}
      </div>
   </section>

   {/* BOOKING MODAL WITH ANIMATION */}

   {selectedService && (
     <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn'>

       <div className='bg-white p-8 rounded-xl w-125 transform transition-all duration-300 scale-100 animate-slideUp'>

         <h2 className='text-xl font-semibold mb-4'>
           Book {selectedService.name}
         </h2>

         <input
           type="text"
           placeholder="Service Type"
           value={bookingData.serviceType}
           onChange={(e)=>setBookingData({...bookingData, serviceType:e.target.value})}
           className='w-full border p-2 mb-3 rounded'
         />

         <input
           type="text"
           placeholder="Service Address"
           value={bookingData.serviceAddress}
           onChange={(e)=>setBookingData({...bookingData, serviceAddress:e.target.value})}
           className='w-full border p-2 mb-3 rounded'
         />

         <input
           type="date"
           min={today}  // 📅 Disable past dates
           value={bookingData.preferredDate}
           onChange={(e)=>setBookingData({...bookingData, preferredDate:e.target.value})}
           className='w-full border p-2 mb-3 rounded'
         />

         <input
           type="number"
           placeholder="Estimated Price"
           value={bookingData.estimatedPrice}
           onChange={(e)=>setBookingData({...bookingData, estimatedPrice:e.target.value})}
           className='w-full border p-2 mb-3 rounded'
         />

         <textarea
           placeholder="Description"
           value={bookingData.description}
           onChange={(e)=>setBookingData({...bookingData, description:e.target.value})}
           className='w-full border p-2 mb-3 rounded'
         />

         <div className='flex justify-between'>
           <button
             onClick={()=>setSelectedService(null)}
             className='px-4 py-2 bg-gray-400 text-white rounded'
           >
             Cancel
           </button>

           <button
             onClick={handleBooking}
             disabled={loading}
             className='px-4 py-2 bg-[#ea580c] text-white rounded'
           >
             {loading ? "Booking..." : "Confirm Booking"}
           </button>
         </div>
       </div>
     </div>
   )}

    </div>
  )
}

export default LandingPage