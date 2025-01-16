
import { Outlet } from 'react-router'
import './App.css'
import Navbar from './shared/Navbar/Navbar'
import Footer from './shared/Footer/Footer'

function App() {

  return (
    <>
      <Navbar/>
      <div className='mt-28'>
      <Outlet/>
      </div>
      <Footer/>
    </>
  )
}

export default App
