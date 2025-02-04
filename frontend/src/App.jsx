import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AllPosts from './pages/AllPosts'
import Login from './pages/Login'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import Contact from './pages/Contact'
import About from './pages/About'

const App = () => {
  return (
    <div >
      <ToastContainer />
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<AllPosts />} />
        <Route path='/posts/:category' element={<AllPosts />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App