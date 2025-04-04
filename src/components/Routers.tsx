import { Route, Routes } from 'react-router'
import BannerPage from '../pages/BannerPage'
import CategoriesPage from '../pages/CategoriesPage'
import HomePage from '../pages/Dashboard'
import ProductsPage from '../pages/ProductsPage'
import UsersPage from '../pages/UsersPage'
import OrdersPage from '../pages/OrdersPage'

function Routers() {
  return (
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/users" element={<UsersPage/>}/>
    <Route path="/products" element={<ProductsPage/>}/>
    <Route path="/categories" element={<CategoriesPage/>}/>
    <Route path="/banner" element={<BannerPage/>}/>
    <Route path="/order" element={<OrdersPage/>}/>
    
    
  </Routes>
  )
}

export default Routers