import './App.css'
import Login from './pages/LoginPage'
import Navbar from './components/Navbar'
import useGlobalStore from './store/store'
import Sidebar from './components/Sidebar'
import Routers from './components/Routers'
function App() {
  const auth = useGlobalStore()
  return (
    <>
     {auth.user?<>
      <Navbar/>

      <div className='flex h-full '>
        <Sidebar/>
        <Routers/>
      </div>
     </>:<Login/>}
    </>
  )
}

export default App
