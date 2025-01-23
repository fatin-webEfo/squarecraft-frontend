
import { Outlet } from 'react-router'
import './App.css'
import Navbar from './shared/Navbar/Navbar'
import Footer from './shared/Footer/Footer'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, loading, error } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }
  console.log("User", user)
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
