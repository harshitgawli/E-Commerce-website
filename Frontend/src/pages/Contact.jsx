import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/frontend_assets/assets'
const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8  border-t'>
        <Title text1={"Contact "} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
      <img className='w-full md:max-w-[480px] ' src={assets.contact_img} alt="" />
      <div className='flex flex-col justify-center gap-6 items-start'>
        <p className='font-semibold text-xl text-gray-600'>Our Store</p>
        <p>28,Ram kkishan nagar <br /> Delhi, India 460001</p>
        <p className='font-semibold text-xl text-gray-600'>Contact Us</p>
        <p>Phone: +91 11 12345678</p>
        <p>Email: info@ourstore.com</p>
        <p className='font-semibold text-xl text-gray-600'>Visiting Hours</p>
        <p>9:00 AM - 9:00 PM</p>
      </div>
      </div>
    </div>
  )
}

export default Contact
