import React from 'react'

function AddService() {
  return (
    <div className='bg-[]  py-5'>
      <form action="">

        {/* upload div */}
        <div>
            <h3>Upload Image</h3>
             <label htmlFor="image">
                      <svg className='border-2' xmlns="http://www.w3.org/2000/svg" width="74" height="74"  
fill="currentColor" viewBox="0 0 24 24" >

<path d="M4 4h16v2H4zm8 4-5 6h4v7h2v-7h4z"></path>
</svg>
            </label>
            <input type="file" id='image'hidden required />
    
             
        </div>

        

      </form>
    </div>
  )
}

export default AddService
