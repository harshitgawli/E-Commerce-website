import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from './Title.jsx';
import ProductItems from './ProductItems.jsx';

const BestSellers = () => {

    const { products } = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const bestProducts = products.filter((item) => item.bestSeller);
        setBestSellers(bestProducts.slice(0, 5));
    }, [products])
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Discover the must-haves everyone is talking about—our best sellers combine style, quality, and trust, making them timeless picks you’ll never regret.
                </p>
            </div>

            {/* render Best sellers products here */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          bestSellers.map((items,index)=>(
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

export default BestSellers
