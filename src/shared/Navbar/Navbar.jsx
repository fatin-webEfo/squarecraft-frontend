import React from 'react'
import logo from "../../../public/images/auth/login/SquareCraft-logo-withText.svg"
const Navbar = () => {
  return (
    <div className='w-full  fixed top-7   '>
     <div className='xl:max-w-[95%] w-full mx-auto flex items-center justify-between bg-white shadow-gray-100 shadow-sm px-4 py-[18px] rounded-[10px]'>
     <img src={logo} loading='lazy' alt="" />
     <button className='bg-jaffa-400 px-6 py-1.5 rounded-md'>Join With Us</button>
     </div>
    </div>
  )
}

export default Navbar
