import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx';
import ProductItems from './ProductItems.jsx';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
      setLatestProducts(products.slice(0, 10));
    },[products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover fashion’s newest drop—curated looks that blend comfort, trend, and elegance, designed to make every day feel like a runway.
        </p>
      </div>

      {/* render latest products here */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((items,index)=>(
          <ProductItems 
           key={index} 
           id={items._id}
           image={items.image} 
           name={items.name} 
           price={items.price}
           /> )
          )
        } 
          
      </div>
    </div>
  )
}

export default LatestCollection
