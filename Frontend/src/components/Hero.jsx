import React from 'react'
import { assets } from '../assets/frontend_assets/assets.js'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 overflow-hidden'>
      
      <div 
        className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'
        style={{ animation: 'slideInLeft 0.8s ease-out forwards' }}
      >
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BEST SELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>LATEST ARRIVALS</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-px bg-[#414141]'></p>
          </div>
        </div>
      </div>

      <img 
        className='w-full sm:w-1/2'
        src={assets.hero_img2} 
        alt=""
        style={{ animation: 'slideInRight 1s ease-out forwards' }}
      />

      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

    </div>
  )
}

export default Hero