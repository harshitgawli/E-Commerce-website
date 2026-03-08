import React, { useState  } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'

const PlaceOrder = () => {

  const [method, setMethod] =useState('cod');
  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-top'>
      {/* left side information of delivery */}
      <div className='flex flex-col gap-4 w-full sm:max-w-120'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1="DELIVERY " text2="INFORMATION" />
        </div>
        <div className='flex  gap-3 '>  
          <input className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name'/>
          <input className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Second Name'/>

        </div>
         <input className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Email Address'/>
         <input className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
      <div className='flex  gap-3 '>  
          <input className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
          <input className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>

        </div>
        <div className='flex  gap-3 '>  
          <input className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="number" placeholder='PIN CODE'/>
          <input className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>

        </div>
       <input className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Mobile Number'/>

      </div>  

      {/* right side order summary     */}

      <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal />
          </div>

          <div className='mt-12'>
            <Title text1="PAYMENT " text2="SECTION" />
            <div className='flex gap-3 flex-col lg:flex-row'>
                <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod'? 'bg-green-600 ': ''}`}></p>
                  <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                </div>
            </div>
            <div className='w-full text-end mt-8'>
                <button onClick={()=>navigate('/orders')} className='bg-black text-white text-sm  px-16 py-3'>PLACE ORDER</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default PlaceOrder
