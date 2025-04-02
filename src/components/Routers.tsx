import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'
import UsersPage from '../pages/UsersPage'
import ProductsPage from '../pages/ProductsPage'
import CategoriesPage from '../pages/CategoriesPage'
import BannerPage from '../pages/BannerPage'

function Routers() {
  return (
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/users" element={<UsersPage/>}/>
    <Route path="/products" element={<ProductsPage/>}/>
    <Route path="/categories" element={<CategoriesPage/>}/>
    <Route path="/banner" element={<BannerPage/>}/>
    
    
  </Routes>
  )
}

export default Routers