import { Route, Routes } from 'react-router'
import BannerPage from '../pages/BannerPage'
import CategoriesPage from '../pages/CategoriesPage'
import HomePage from '../pages/Dashboard'
import ProductsPage from '../pages/ProductsPage'
import UsersPage from '../pages/UsersPage'
import OrdersPage from '../pages/OrdersPage'
import Contexthook from './Contexthook'
import { StatisticsPage } from '../pages/StatisticsPage'

function Routers() {
  return (
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/users" element={<UsersPage/>}/>
    <Route path="/products" element={<ProductsPage/>}/>
    <Route path="/categories" element={<CategoriesPage/>}/>
    <Route path="/banner" element={<BannerPage/>}/>
    <Route path="/order" element={<OrdersPage/>}/>
    <Route path="/con" element={<Contexthook/>}/>
    <Route path="/statistic" element={<StatisticsPage/>}/>
    
    
  </Routes>
  )
}

export default Routers