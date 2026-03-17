import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r border-gray-100' style={{backgroundColor: '#f8f9fb'}}>
      
      <div className='flex flex-col gap-2 pt-6 px-3'>
        
        <NavLink
          to='/add'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
            ${isActive
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm border border-transparent'
            }`
          }
        >
          <img className='w-4 h-4 opacity-70' src={assets.add_icon} alt="" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink
          to='/list'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
            ${isActive
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm border border-transparent'
            }`
          }
        >
          <img className='w-4 h-4 opacity-70' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink
          to='/order'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
            ${isActive
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm border border-transparent'
            }`
          }
        >
          <img className='w-4 h-4 opacity-70' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>Order Items</p>
        </NavLink>

      </div>
    </div>
  )
}

export default SideBar