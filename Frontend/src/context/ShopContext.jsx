import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets.js";
export const ShopContext = createContext();

const ShopContextProvider =(props) =>{

    const currency = '₹';
    const shippingCost = 50;
    const value ={
        products,currency,shippingCost
    };

    return(
         <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;