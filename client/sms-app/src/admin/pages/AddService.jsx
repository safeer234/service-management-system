import React, { useState, useRef } from 'react'
import axios from "axios";
import { toast } from "react-toastify";

function AddService() {
  const fileInputRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image:"",
    name:"",
    description:"",
    price:"",
    category:"",
    isPopular:"false"
  })

  const handleData = async(e) => {
    e.preventDefault();

    if (!formData.image) {
      setError("Image is required");
      toast.error("Image is required ❌");
      return;
    }

    if (!formData.name || !formData.description || !formData.category || !formData.price) {
      setError("All fields are required");
      toast.error("All fields are required ❌");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const data = new FormData();
      data.append("image", formData.image);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("isPopular", formData.isPopular === "true");

      await axios.post(
        "https://service-management-system-hj06.onrender.com/api/services/create",
        data,
        { withCredentials: true }
      );

      toast.success("Service added successfully 🎉");

      setFormData({
        image: "",
        name: "",
        description: "",
        price: "",
        category: "",
        isPopular: "false"
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {
      const message = err.response?.data?.message || "Adding failed ❌";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='py-10 md:py-16 lg:py-20 px-4 flex justify-center'>

      <form 
        className='
          bg-[#d1d5db] 
          rounded-2xl 
          shadow-[0_25px_60px_rgba(0,0,0,0.3)] 
          w-full max-w-md md:max-w-lg lg:w-100 
          lg:h-135 
          text-center 
          p-6 md:p-8
        ' 
        onSubmit={handleData}
      >

        {/* Upload */}
        <div className='mb-6'>
          <h3 className='mb-5 py-3 text-[#ea580c] text-lg font-medium'>
            Upload Image
          </h3>

          <label htmlFor="image" className="flex justify-center cursor-pointer">
            <svg 
              className='border-2 border-[#ea580c] rounded p-2'
              xmlns="http://www.w3.org/2000/svg" 
              width="74" 
              height="74" 
              fill="#ea580c" 
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v2H4zm8 4-5 6h4v7h2v-7h4z"></path>
            </svg>
          </label>

          <input 
            ref={fileInputRef}
            type="file"
            name="image"
            onChange={(e)=>setFormData({...formData,image:e.target.files[0]})}
            id='image'
            hidden
          />
        </div>

        {/* Name */}
        <div className='mb-6'>
          <input 
            type="text"
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter service name'
            className='w-full border-[#ea580c] border-2 rounded p-2'
          />
        </div>

        {/* Description */}
        <div className='mb-6'>
          <input 
            type="text"
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Description'
            className='border-[#ea580c] border-2 w-full h-20 md:h-24 rounded p-2'
          />
        </div>

        {/* Popular */}
        <div className='flex flex-col md:flex-row gap-4 mb-6 items-center justify-center'>
          <label>Popular Service:</label>
          <select
            className='border-[#ea580c] border-2 rounded p-1'
            value={formData.isPopular}
            onChange={handleChange}
            name="isPopular"
          >
            <option value="">select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Category + Price */}
        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border-[#ea580c] border-2 w-full md:w-1/2 rounded p-1"
          >
            <option value="">Select Category</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Painting">Painting</option>
            <option value="Carpentry">Carpentry</option>
            <option value="AC Repair">AC Repair</option>
            <option value="Other">Other</option>
          </select>

          <input 
            type="number"
            name='price'
            value={formData.price}
            onChange={handleChange}
            className='border-[#ea580c] border-2 w-full md:w-1/2 rounded p-1'
            placeholder='Enter Price'
          />
        </div>

        {/* Button */}
        <div>
          <button 
            disabled={loading} 
            className='bg-[#ea580c] w-24 h-9 text-white rounded hover:opacity-90 transition'
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mt-3">{error}</p>
        )}

      </form>
    </div>
  )
}

export default AddService