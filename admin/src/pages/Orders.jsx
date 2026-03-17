import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/admin_assets/assets'

const statusColors = {
  'OrderPlaced':     'bg-blue-50 text-blue-500 border-blue-100',
  'Packing':         'bg-yellow-50 text-yellow-500 border-yellow-100',
  'Shipped':         'bg-purple-50 text-purple-500 border-purple-100',
  'Out for delivery':'bg-orange-50 text-orange-500 border-orange-100',
  'Delivered':       'bg-green-50 text-green-500 border-green-100',
}

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    if (!token) return
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { fetchAllOrders() }, [token])

  return (
    <div className='p-2'>

      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-lg font-semibold text-gray-800'>Orders</h2>
          <p className='text-xs text-gray-400 tracking-widest mt-0.5'>{orders.length} ORDERS TOTAL</p>
        </div>
        <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className='flex items-center justify-center py-20 text-gray-300 text-sm tracking-widest'>
          LOADING...
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          {orders.map((order, index) => (
            <div
              key={index}
              className='bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-200'
            >
              <div className='grid grid-cols-1 sm:grid-cols-[auto_2fr_1fr] lg:grid-cols-[auto_2fr_1fr_1fr_1fr] gap-5 items-start'>

                {/* Parcel Icon */}
                <div className='w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center'>
                  <img src={assets.parcel_icon} className='w-6' alt="parcel" />
                </div>

                {/* Items + Address */}
                <div>
                  <div className='flex flex-wrap gap-1 mb-3'>
                    {order.items.map((item, i) => (
                      <span
                        key={i}
                        className='inline-flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1 text-xs text-gray-600'
                      >
                        {item.name}
                        <span className='text-gray-400'>×{item.quantity}</span>
                        <span className='text-gray-300'>|</span>
                        <span className='text-gray-400'>{item.size}</span>
                      </span>
                    ))}
                  </div>

                  <p className='text-sm font-semibold text-gray-800 mb-1'>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className='text-xs text-gray-400'>
                    {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} — {order.address.pinCode}
                  </p>
                  <p className='text-xs text-gray-400 mt-0.5'>📞 {order.address.phone}</p>
                </div>

                {/* Order Meta */}
                <div className='flex flex-col gap-1.5'>
                  <div className='flex items-center gap-2'>
                    <span className='text-[10px] tracking-widest text-gray-400'>ITEMS</span>
                    <span className='text-xs font-semibold text-gray-700'>{order.items.length}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-[10px] tracking-widest text-gray-400'>METHOD</span>
                    <span className='text-xs font-semibold text-gray-700'>{order.paymentMethod}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-[10px] tracking-widest text-gray-400'>PAYMENT</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${order.payment ? 'bg-green-50 text-green-500 border-green-100' : 'bg-red-50 text-red-400 border-red-100'}`}>
                      {order.payment ? 'Done' : 'Pending'}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-[10px] tracking-widest text-gray-400'>DATE</span>
                    <span className='text-xs text-gray-500'>{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className='flex flex-col justify-center'>
                  <p className='text-[10px] tracking-widest text-gray-400 mb-1'>AMOUNT</p>
                  <p className='text-lg font-bold text-gray-800'>{currency}{order.amount}</p>
                </div>

                {/* Status Dropdown */}
                <div className='flex flex-col justify-center'>
                  <p className='text-[10px] tracking-widest text-gray-400 mb-1'>STATUS</p>
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className={`text-xs font-semibold px-3 py-2 rounded-xl border outline-none cursor-pointer transition-all ${statusColors[order.status] || 'bg-gray-50 text-gray-500 border-gray-100'}`}
                  >
                    <option value="OrderPlaced">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

              </div>
            </div>
          ))}

          {/* Empty State */}
          {orders.length === 0 && (
            <div className='flex flex-col items-center justify-center py-20 text-gray-300'>
              <p className='text-4xl mb-3'>🧾</p>
              <p className='text-sm tracking-widest'>NO ORDERS YET</p>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default Orders