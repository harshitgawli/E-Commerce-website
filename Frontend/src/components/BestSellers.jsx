import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'
import ProductItems from './ProductItems.jsx'

const BestSellers = () => {
  const { products } = useContext(ShopContext)
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestSeller)
    setBestSellers(bestProducts.slice(0, 10))
  }, [products])

  const doubled = [...bestSellers, ...bestSellers]

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover the must-haves everyone is talking about—our best sellers combine style, quality, and trust, making them timeless picks you'll never regret.
        </p>
      </div>

      {/* Infinite Sliding Ticker */}
      <div className='overflow-hidden px-2'>
        <div className='flex gap-5 animate-ticker w-max'>
          {doubled.map((item, index) => (
            <div
              key={index}
              className='flex-shrink-0 w-64 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300 bg-white overflow-hidden'
            >
              {/* Badge */}
              <div className='relative'>
                <span className='absolute top-2 left-2 z-10 bg-black text-white text-[9px] tracking-widest px-2 py-0.5 rounded-full'>
                  BEST SELLER
                </span>
                <div className='border-b border-gray-100'>
                  <ProductItems
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 20s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

export default BestSellers