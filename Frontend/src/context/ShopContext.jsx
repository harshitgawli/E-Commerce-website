import { createContext, useEffect } from "react";
// import { products } from "../assets/frontend_assets/assets.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { use } from "react";


export const ShopContext = createContext();

const ShopContextProvider =(props) =>{

    const currency = '₹';
    const shippingCost = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products,setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

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

    const updateCartQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };

    const getCartAmout = () =>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((products)=> products._id === items)
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += cartItems[items][item] * itemInfo.price;
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async ()=>{
        try {
            const response = await axios.get(backendUrl+'/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }

    const value ={
        products,currency,shippingCost,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount,updateCartQuantity,
        getCartAmout,navigate,
        backendUrl,token,
        setToken,setCartItems
    };

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[])
    
    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems]);

    return(
         <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;