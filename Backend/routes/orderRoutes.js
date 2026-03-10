import express from 'express'
import { placeOrder,allOrders,updateStatus,userOrders } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// admin related
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment related
orderRouter.post('/place',authUser,placeOrder)


//User related
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter