import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {

    const { currency ,getCartAmout, shippingCost } = useContext(ShopContext);

  return (
    <div className='w-full '>
        <div className='text-2xl'>
            <Title text1="CART " text2="TOTAL" />   
        </div>
      
      <div className='flex flex-col gap-2 mt-2 text-sm '>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency} {getCartAmout()}.00</p>

        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Cost</p>
            <p>{currency} {shippingCost}.00</p>
        </div>
        <hr />
        <div className='flex justify-between font-medium text-base'>
            <p>Total Amount</p>
            <p>{currency} {getCartAmout() === 0 ? 0 : getCartAmout() + shippingCost}.00</p>
        </div>
       

      </div>
    </div>
  )
}

export default CartTotal
