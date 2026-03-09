import express from 'express'
import { addToCart, getCart, updateCart } from '../controllers/cartController'
import authUser from '../middleware/auth'

const cartRouter = express.Router()

cartRouter.post('/get',authUser,getCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter