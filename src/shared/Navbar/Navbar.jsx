import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../../public/images/auth/login/SquareCraft-logo-withText.svg";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className='w-full fixed top-7'>
      <div className='xl:max-w-[95%] w-full mx-auto flex items-center justify-between border-[#EDEDED] bg-white shadow-gray-100 shadow-sm px-4 py-[18px] rounded-[10px]'>
        {/* Logo */}
        <img src={logo} loading='lazy' alt="Logo" />

        {/* Conditionally render buttons if on /dashboard/pricing-plan */}
        {location.pathname === '/dashboard/pricing-plan' && (
          <div className="flex items-center gap-4">
            <button className=" px-4 py-2 rounded-md ">
              My Website
            </button>
            <button className=" px-4 py-2 rounded-md ">
              PLugin Library
            </button>
            <button className=" px-4 py-2 rounded-md text-jaffa-400">
              Pricing Plan
            </button>
          </div>
        )}

        {/* Default navigation links */}
        {location.pathname === '/auth/register' ? (
          <Link to="/auth/login" className='bg-jaffa-400 px-6 py-1.5 rounded-md font-semibold'>
            Sign In
          </Link>
        ) : (
          <Link to="/auth/register" className='bg-jaffa-400 px-6 py-1.5 rounded-md font-semibold'>
            Join <span className='xl:inline hidden'>With Us</span>
          </Link>
        )
        }
      </div>
    </div>
  );
};

export default Navbar;
