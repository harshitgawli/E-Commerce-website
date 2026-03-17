import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { fetchList() }, [])

  return (
    <div className='p-2'>

      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-lg font-semibold text-gray-800'>Product List</h2>
          <p className='text-xs text-gray-400 tracking-widest mt-0.5'>{list.length} PRODUCTS TOTAL</p>
        </div>
        <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className='flex items-center justify-center py-20 text-gray-300 text-sm tracking-widest'>
          LOADING...
        </div>
      ) : (
        <div className='flex flex-col gap-2'>

          {/* Table Header */}
          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 bg-gray-50 border border-gray-100 rounded-xl text-[10px] tracking-widest text-gray-400 font-semibold'>
            <span>IMAGE</span>
            <span>NAME</span>
            <span>CATEGORY</span>
            <span>PRICE</span>
            <span className='text-center'>ACTION</span>
          </div>

          {/* Product Rows */}
          {list.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-3 px-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all duration-200'
            >
              <img
                className='w-12 h-12 object-cover rounded-lg border border-gray-100'
                src={item.image[0]}
                alt={item.name}
              />
              <p className='text-sm font-medium text-gray-700'>{item.name}</p>
              <span className='inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-gray-100 text-gray-500 w-fit'>
                {item.category}
              </span>
              <p className='text-sm font-semibold text-gray-800'>{currency}{item.price}</p>
              <div className='flex justify-center'>
                <button
                  onClick={() => removeProduct(item._id)}
                  className='w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all duration-200 text-sm font-bold'
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {list.length === 0 && (
            <div className='flex flex-col items-center justify-center py-20 text-gray-300'>
              <p className='text-4xl mb-3'>📦</p>
              <p className='text-sm tracking-widest'>NO PRODUCTS FOUND</p>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default List