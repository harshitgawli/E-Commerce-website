import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/frontend_assets/assets'
const About = () => {
  return (
    <div >
      <div className='text-2xl text-center pt-8  border-t'>
        <Title text1={"About "} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 '>
        <img className='w-full md:max-w-[450px] ' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Libazz Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam recusandae libero, asperiores iusto voluptate blanditiis. Vitae cumque aut praesentium nobis cupiditate eligendi, neque ipsum quod obcaecati rerum consectetur illo iure sit molestiae quia, sint placeat quis nisi sapiente! Fuga vel, sit libero quas molestias dignissimos neque quae sequi exercitationem eligendi!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis adipisci numquam itaque modi consequatur impedit, tempora ex reiciendis magnam eaque sint mollitia atque quidem voluptatum cupiditate facere minus at! Quia iusto voluptatum aliquam maiores nobis aperiam sapiente laborum. Consequuntur ducimus iure, molestias excepturi saepe nesciunt similique id ipsum natus rerum voluptates asperiores illo quibusdam doloribus sint molestiae tenetur suscipit? Exercitationem.</p>
        <b>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis adipisci numquam itaque modi consequatur impedit, tempora ex reiciendis magnam eaque sint mollitia atque quidem voluptatum cupiditate facere minus at! Quia iusto voluptatum aliquam maiores nobis aperiam sapiente laborum. Consequuntur ducimus iure, molestias excepturi saepe nesciunt similique id ipsum natus rerum voluptates asperiores illo quibusdam doloribus sint molestiae tenetur suscipit? Exercitationem.</p>
      </div>
      </div>
    </div>
  )
}

export default About
