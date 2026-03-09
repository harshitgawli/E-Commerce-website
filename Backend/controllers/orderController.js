import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing order using cash on delivery

const placeOrder = async (req,res)=>{
    try {

        const {userId , items, amount, address }= req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "COD",
            payment:false,
            date:Date.now()
        }
        
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({
            success:true,
            message:'Order Placed Successfully'

        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
    }
}


//all order data for admin

const allOrders = async (req,res)=>{

}


//User order data for frontend

const userOrders = async (req,res)=>{

}


//update order status

const updateStatus = async (req,res)=>{

}

export {placeOrder , allOrders ,userOrders ,updateStatus}