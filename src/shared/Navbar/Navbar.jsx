import { Link, useLocation } from 'react-router-dom';
import logo from "../../../public/images/auth/login/SquareCraft-logo-withText.svg";
import Image from '../../hooks/Image/Image';
import qs from "../../../public/images/navbar/question.svg"
import notification from "../../../public/images/navbar/notification.svg"
import downArrow from "../../../public/images/navbar/downArrow.svg"
import { useState } from 'react';
import ProfileDropDown from '../ProfileDropDown/ProfileDropDown';

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [profileDropdown, setProfileDropdown] = useState(false);
  const toogleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  }

  const isDashboardPricingPlan = ['/dashboard/pricingPlan', '/dashboard/myWebsites', '/dashboard/pluginLibraries','/profile/editProfile', "/"].includes(pathname);
  const isAuthRegister = ['/auth/register'].includes(pathname);

  return (
    <div className="w-full bg-[#F7F5F7] flex items-center justify-center fixed p-6 z-[9999] top-0">
      <div className="xl:max-w-[95%] w-full mx-auto flex items-center justify-between border-[#EDEDED] bg-white shadow-gray-100 shadow-sm px-4 py-[18px] rounded-[10px]">
        <Link to="/"><Image src={logo}></Image></Link>
        {isDashboardPricingPlan && (
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard/myWebsites"
              className={`px-4 py-2 rounded-md ${pathname === '/dashboard/myWebsites' ? 'text-jaffa-400 font-bold' : ''}`}
            >
              My Website
            </Link>
            <Link
              to="/dashboard/pluginLibraries"
              className={`px-4 py-2 rounded-md ${pathname === '/dashboard/pluginLibraries' ? 'text-jaffa-400 font-bold' : ''}`}
            >
              Plugin Library
            </Link>
            <Link
              to="/dashboard/pricingPlan"
              className={`px-4 py-2 rounded-md ${pathname === '/dashboard/pricingPlan' ? 'text-jaffa-400 font-bold' : ''}`}
            >
              Pricing Plan
            </Link>
          </div>
        )}
        {isDashboardPricingPlan ? (
          <div className="flex items-center gap-5">
            <div className="bg-jaffa-400 group hover:border hover:border-jaffa-400 transition-all cursor-pointer border border-jaffa-400 duration-300 hover:bg-white text-sm flex  h-[2.6rem] w-[8.5rem]   justify-center rounded items-center gap-2.5">
              <Image src={qs}></Image>
              <p className="transition-all duration-300 group-hover:text-jaffa-400">Need Help?</p>
            </div>
            <div className='relative w-10 h-10 '>
              <Image src={notification} className='bg-gray-100 px-3 py-2.5 w-full h-full flex items-center cursor-pointer justify-center rounded-full'></Image>
              <p className='absolute top-0 right-0 bg-jaffa-400 h-4 w-4 rounded-full flex items-center justify-center text-xs'>5</p>
            </div>
            <div className='border relative cursor-pointer rounded-md px-2 py-1 flex items-center gap-2' onClick={() => toogleProfileDropdown()}>
              {
                profileDropdown && (
                  <ProfileDropDown/>
                )
              }
              <Image src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg" className="rounded-full object-cover object-top h-9 w-9"></Image>

              <div className='flex flex-col items-start'>
                <p className='font-semibold'>Sakibul Alam</p>
                <p className='text-gray-400 text-xs -mt-1'>sakib@gmail.com</p>
              </div>
              <Image src={downArrow} className='w-3 opacity-60'></Image>
            </div>
          </div>
        ) : isAuthRegister ? (
          <Link
            to="/auth/login"
            className="bg-jaffa-400 px-6 py-1.5 rounded-md font-semibold"
          >
            Sign In
          </Link>
        ) : (
          <Link
            to="/auth/register"
            className="bg-jaffa-400 px-6 py-1.5 rounded-md font-semibold"
          >
            Join <span className="xl:inline hidden">With Us</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
