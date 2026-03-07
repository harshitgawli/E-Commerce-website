import { createContext, useEffect } from "react";
import { products } from "../assets/frontend_assets/assets.js";
import { useState } from "react";
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider =(props) =>{

    const currency = '₹';
    const shippingCost = 50;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {
        if(!size){
            toast.error('Please select a size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }

        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let Totalcount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
               try{
                 Totalcount += cartItems[itemId][size];
               }
               catch(err){  
               }
            }
        }
        return Totalcount;
    };

    const value ={
        products,currency,shippingCost,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount
    };

    useEffect(() => {
        console.log(cartItems);
    }
    , [cartItems]);

    return(
         <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;