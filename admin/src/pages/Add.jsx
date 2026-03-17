import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)

  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestSeller)
      formData.append("sizes", JSON.stringify(sizes))
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestSeller(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const ImageUpload = ({ id, image, setImage }) => (
    <label htmlFor={id} className='cursor-pointer group'>
      <div className={`w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-200
        ${image ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-gray-50 hover:border-amber-300 hover:bg-amber-50'}`}
      >
        {image
          ? <img src={URL.createObjectURL(image)} className='w-full h-full object-cover rounded-xl' alt="" />
          : <div className='flex flex-col items-center gap-1'>
              <img src={assets.upload_area} className='w-8 h-8 opacity-30' alt="" />
              <p className='text-[9px] text-gray-300 tracking-widest'>UPLOAD</p>
            </div>
        }
      </div>
      <input onChange={(e) => setImage(e.target.files[0])} type="file" id={id} hidden />
    </label>
  )

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6'>

      {/* Header */}
      <div>
        <h2 className='text-lg font-semibold text-gray-800'>Add New Product</h2>
        <p className='text-xs text-gray-400 tracking-widest mt-0.5'>FILL IN THE DETAILS BELOW</p>
      </div>

      {/* Image Upload */}
      <div className='w-full'>
        <p className='text-sm font-medium text-gray-700 mb-3'>Product Images</p>
        <div className='flex gap-3'>
          <ImageUpload id="image1" image={image1} setImage={setImage1} />
          <ImageUpload id="image2" image={image2} setImage={setImage2} />
          <ImageUpload id="image3" image={image3} setImage={setImage3} />
          <ImageUpload id="image4" image={image4} setImage={setImage4} />
        </div>
        <p className='text-[10px] text-gray-300 mt-2 tracking-wide'>Upload up to 4 images</p>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='text-sm font-medium text-gray-700 mb-2'>Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='w-full max-w-[500px] px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors'
          type="text"
          placeholder='Enter product name'
          required
        />
      </div>

      {/* Description */}
      <div className='w-full'>
        <p className='text-sm font-medium text-gray-700 mb-2'>Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          rows={4}
          className='w-full max-w-[500px] px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors resize-none'
          placeholder='Describe the product...'
        />
      </div>

      {/* Category / SubCategory / Price */}
      <div className='flex flex-col sm:flex-row gap-4 w-full'>
        <div>
          <p className='text-sm font-medium text-gray-700 mb-2'>Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className='px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors'
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='text-sm font-medium text-gray-700 mb-2'>Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className='px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors'
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='text-sm font-medium text-gray-700 mb-2'>Price (₹)</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className='w-[140px] px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors'
            type="number"
            placeholder='0.00'
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className='text-sm font-medium text-gray-700 mb-3'>Available Sizes</p>
        <div className='flex gap-2'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              key={size}
              type='button'
              onClick={() => toggleSize(size)}
              className={`w-12 h-10 rounded-xl text-sm font-semibold border transition-all duration-200
                ${sizes.includes(size)
                  ? 'bg-amber-50 border-amber-400 text-amber-700'
                  : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Best Seller */}
      <div
        onClick={() => setBestSeller(prev => !prev)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 w-fit
          ${bestSeller ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-200 hover:border-gray-300'}`}
      >
        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all
          ${bestSeller ? 'bg-amber-400 border-amber-400' : 'border-gray-300'}`}
        >
          {bestSeller && <span className='text-white text-xs font-bold'>✓</span>}
        </div>
        <label className='text-sm font-medium text-gray-700 cursor-pointer'>
          Mark as Best Seller
        </label>
      </div>

      {/* Submit */}
      <button
        type='submit'
        disabled={loading}
        className='px-8 py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>

    </form>
  )
}

export default Add