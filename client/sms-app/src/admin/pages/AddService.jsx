import React, { useState } from 'react'
import axios from "axios";
function AddService() {
  
  const [error, setError] = useState("");
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
    return;
  }

  if (!formData.name || !formData.description || !formData.category || !formData.price) {
    setError("All fields are required");
    return;
  }

   try {
    const data = new FormData();

    data.append("image", formData.image);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("isPopular", formData.isPopular === "true");

console.log(formData.image);
    await axios.post(
      "https://service-management-system-hj06.onrender.com/api/services/create",
      data,
    
        {withCredentials: true,}
      
    );

  } catch (err) {
    setError(err.response?.data?.message || "adding failed");
  }
  }

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  return (
    <div className='bg-[]  py-20'>
      <form className='bg-[#d1d5db] rounded-2xl  shadow-[0_25px_60px_rgba(0,0,0,0.3)] w-100 h-135 text-center' onSubmit={handleData}  action="">

        {/* upload div */}
        <div className='mb-6 '>
            <h3 className='mb-5 py-3 text-[#ea580c] text-lg font-medium'>Upload Image</h3>
             <label htmlFor="image">
                      <svg className='border-2 border-[#ea580c] rounded ml-40' xmlns="http://www.w3.org/2000/svg" width="74" height="74"  
fill="#ea580c" viewBox="0 0 24 24" >

<path d="M4 4h16v2H4zm8 4-5 6h4v7h2v-7h4z"></path>
</svg>
            </label>
            <input 
            type="file"
            name="image"
           
            onChange={(e)=>setFormData({...formData,image:e.target.files[0]})}
             id='image'
             hidden
               />
    
             
        </div>

        {/* name div */}

        <div className='mb-7'>

          <input 
          type="text"
          name='name'
          value={formData.name}
          onChange={handleChange}
           placeholder='Enter service name'
            className=' w-80 border-[#ea580c]  border-2 rounded' />

        </div>

        {/* description div */}
        <div className='mb-7'>
           <input 
           type="text"
           name='description'
           value={formData.description}
           onChange={handleChange}
            placeholder='Description'
             className='border-[#ea580c]  border-2 w-80 h-30 rounded' />

        </div>

        {/* popular div */}
        <div className='flex gap-4 mb-8 px-10'>
          <label htmlFor="radio">
            Popular Service:
          </label>
          <select className='border-[#ea580c]   border-2 rounded' value={formData.isPopular} onChange={handleChange} name="isPopular" id="">
            <option value="">select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>

          </select>

        </div>

        {/* category and price div */}

        <div className='flex gap-4 mb-7 px-8'>

          {/* category div */}

         <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="border-[#ea580c] border-2 w-40 rounded"
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
           className='border-[#ea580c]  border-2 w-40 rounded'
           placeholder='Enter Price' />


        </div>

        <div>
          <button className='bg-[#ea580c] w-20 h-8 text-white rounded'>Add</button>
        </div>

                        {error && (
  <p className="text-red-500 text-center mt-2">{error}</p>
)}

        

      </form>
    </div>
  )
}

export default AddService
