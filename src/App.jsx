
import { Outlet } from 'react-router'
import './App.css'
import Navbar from './shared/Navbar/Navbar'

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
