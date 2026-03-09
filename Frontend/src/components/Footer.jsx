import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo_libazz} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Libazz is a fashion e-commerce website that offers a wide range of trendy and stylish clothing, accessories
                    Lorem ipsum, dolor sit ametpedit accusantium, accusamus placeat autem velit quos blanditiis ipsam iste perspiciatis iusto quidem ullam? Odit, vel minima! 
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>DELIVERY</li>
                    <li>PRIVACY POLICY</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>CONTACT US</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 89548XXXXX</li>
                    <li>contact@libazz.com</li>
                    
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>
                Copyright © 2026 Libazz. All rights reserved.
            </p>
        </div>
      
    </div>
  )
}

export default Footer
