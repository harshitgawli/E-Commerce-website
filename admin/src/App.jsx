import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import { Routes, Route, Link } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const BG   = '#f5e6c8'
const CARD = '#fffdf7'
const BORDER = '#e8c97a'

const actions = [
  { label: 'Add New Product', desc: 'Upload and list a new item',  icon: '➕', path: '/add'   },
  { label: 'View Products',   desc: 'Browse your product catalog', icon: '📋', path: '/list'  },
  { label: 'Manage Orders',   desc: 'Track and update orders',     icon: '🚚', path: '/order' },
]

const Dashboard = ({ token }) => {              // ✅ token comes from prop
  const [counts, setCounts] = useState({ products: 0, orders: 0, revenue: 0 })
  const [loading, setLoading] = useState(true)
  // ✅ REMOVED: const token = localStorage.getItem('token')  ← this was the bug

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsRes = await axios.get(backendUrl + '/api/product/list')
        const ordersRes = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
        const products = productsRes.data.success ? productsRes.data.products : []
        const orders   = ordersRes.data.success   ? ordersRes.data.orders    : []
        const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)
        setCounts({ products: products.length, orders: orders.length, revenue: totalRevenue })
      } catch (err) {
        console.error('Dashboard fetch error:', err)
        toast.error('Failed to load dashboard stats')
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchStats()   // ✅ only fetch when token exists

  }, [token])                 // ✅ refetch when token changes

  const stats = [
    { label: 'Total Products', value: loading ? '...' : counts.products,                                 icon: '📦', bg: '#eef4ff', border: '#c7d9f8' },
    { label: 'Total Orders',   value: loading ? '...' : counts.orders,                                   icon: '🧾', bg: '#edfaf3', border: '#b8edd0' },
    { label: 'Revenue',        value: loading ? '...' : `${currency}${counts.revenue.toLocaleString()}`, icon: '₹',  bg: '#fef9ec', border: '#f5dfa0' },
  ]

  return (
    <div style={{ padding: '8px' }}>

      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(to right, #1a1a1a, #3a3a3a)', borderRadius: '16px', padding: '28px 32px', marginBottom: '32px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, fontSize: '200px', opacity: 0.04, lineHeight: 1, userSelect: 'none' }}>🛍</div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block' }}></span>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', fontWeight: 500 }}>ADMIN PANEL</p>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>Welcome Back 👋</h1>
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>Here's what's happening in your store today.</p>
        </div>
      </div>

      {/* Stats */}
      <p style={{ fontSize: '10px', letterSpacing: '3px', color: '#9ca3af', fontWeight: 600, marginBottom: '12px' }}>OVERVIEW</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ backgroundColor: stat.bg, border: `1px solid ${stat.border}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', backgroundColor: CARD, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: `1px solid ${BORDER}` }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '2px', fontWeight: 600 }}>{stat.label.toUpperCase()}</p>
              <p style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginTop: '2px' }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <p style={{ fontSize: '10px', letterSpacing: '3px', color: '#9ca3af', fontWeight: 600, marginBottom: '12px' }}>QUICK ACTIONS</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            style={{ display: 'block', backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '20px', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fef3d0'; e.currentTarget.style.borderColor = '#b8860b'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(184,134,11,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = CARD; e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ width: '40px', height: '40px', backgroundColor: BG, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '16px', border: `1px solid ${BORDER}` }}>
              {action.icon}
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>{action.label}</p>
            <p style={{ fontSize: '12px', color: '#9ca3af' }}>{action.desc}</p>
            <p style={{ fontSize: '12px', color: '#d1b87a', marginTop: '12px' }}>Go →</p>
          </Link>
        ))}
      </div>

    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ?? '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh' }}>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <NavBar setToken={setToken} />

          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #e8d9b8, transparent)' }} />

          <div style={{ display: 'flex', width: '100%', minHeight: 'calc(100vh - 64px)' }}>
            <SideBar />

            <main style={{ flex: 1, marginLeft: 'max(5vw, 25px)', padding: '32px 16px' }}>
              <div style={{ backgroundColor: CARD, borderRadius: '20px', minHeight: '80vh', padding: '24px', border: `1px solid ${BORDER}` }}>
                <Routes>
                  <Route path='/'      element={<Dashboard token={token} />} />  {/* ✅ token passed here */}
                  <Route path='/add'   element={<Add token={token} />} />
                  <Route path='/list'  element={<List token={token} />} />
                  <Route path='/order' element={<Orders token={token} />} />
                </Routes>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  )
}

export default App