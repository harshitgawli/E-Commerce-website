import React from 'react'
import {Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collections from './pages/Collections'
import About from './pages/About'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/collections' element = {<Collections/>}/>
        <Route path='/about' element ={<About/>}/>
        <Route path='/cart' element = {<Cart/>} />
        <Route path='/contact' element = {<Contact/>} />
        <Route path='/product/:productId' element = {<Product/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element = {<PlaceOrder/>} />
        <Route path='/orders' element = {<Orders/>} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
