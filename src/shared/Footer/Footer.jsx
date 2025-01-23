import { useLocation } from 'react-router-dom';
import logo from "../../../public/images/footer/SquareCraft-logo-withText.svg";
import livaChat from "../../../public/images/footer/liveChat.svg";
import Image from '../../hooks/Image/Image';
// import facebook from "../../../public/images/footer/facebook.svg";
import twitter from "../../../public/images/footer/twitter.svg";
import linkedin from "../../../public/images/footer/linkedin.svg";
import instagram from "../../../public/images/footer/insta.svg";

const Footer = () => {
  const location = useLocation();

  const hiddenPaths = [
    '/auth/login',
    '/auth/register',
    '/auth/register-otp',
    '/auth/register-success',
    '/auth/forgot-pass-email-verify',
    '/auth/forgot-pass-email-otp',
    '/auth/forgot-pass-set-new-pass',
    '/auth/forgot-pass-pass-updated',
  ];

  const shouldHideFooter = hiddenPaths.includes(location.pathname);

  if (shouldHideFooter) {
    return null;
  }

  return (
    <>
      <div className="bg-[#FEF6EE]  py-12">
        <div className="px-6 md:px-10">
          <div className="max-w-[95%] mx-auto">
            <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
              <Image src={logo} className="mb-4 md:mb-0"></Image>
              <Image src={livaChat} className="w-36 rounded-md cursor-pointer"></Image>
            </div>
          </div>
        </div>
        <div className="w-full bg-jaffa-400 border-b border-dashed mt-10 opacity-30"></div>

        <div className="w-full px-6 md:px-10 max-w-[95%] mx-auto mt-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 text-center md:text-left">
            <div className="md:col-span-3 w-full flex flex-col items-center md:items-start gap-5">
              <p className="text-xs leading-[1.2rem] xl:pr-8 text-gray-500">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Image src={twitter} className="w-8 cursor-pointer border border-orange-200 h-8 flex items-center justify-center rounded-md p-1"></Image>
                <Image src={linkedin} className="w-8 cursor-pointer border border-orange-200 h-8 flex items-center justify-center rounded-md p-1.5"></Image>
                <Image src={instagram} className="w-8 cursor-pointer border border-orange-200 h-8 flex items-center justify-center rounded-md p-1.5"></Image>
              </div>
            </div>

            {/* Responsive Sections */}
            <div className="md:col-span-1"></div>

            <div className="md:col-span-2 w-full flex flex-col items-center md:items-end gap-5">
              <div>
                <p className="text-sm font-semibold text-gray-700">Products</p>
                <ul className="mt-3 text-xs text-gray-500 leading-[1.2rem] space-y-1">
                  <li className="hover:text-jaffa-400 cursor-pointer">My Website</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Plugin Library</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Pricing</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Documentation</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-2 w-full flex flex-col items-center md:items-end gap-5">
              <div>
                <p className="text-sm font-semibold text-gray-700">Resources</p>
                <ul className="mt-3 text-xs text-gray-500 leading-[1.2rem] space-y-1">
                  <li className="hover:text-jaffa-400 cursor-pointer">Tutorials</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Blogs</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Live Support</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Get Started</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-2 w-full flex flex-col items-center md:items-end gap-5">
              <div>
                <p className="text-sm font-semibold text-gray-700">Company</p>
                <ul className="mt-3 text-xs text-gray-500 leading-[1.2rem] space-y-1">
                  <li className="hover:text-jaffa-400 cursor-pointer">About Us</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Terms and Policy</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Careers</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Contact Support</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-2 w-full flex flex-col items-center md:items-end gap-5">
              <div>
                <p className="text-sm font-semibold text-gray-700">Help Center</p>
                <ul className="text-xs text-gray-500 leading-[1.2rem] mt-3 space-y-1">
                  <li className="hover:text-jaffa-400 cursor-pointer">FAQs</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Support Docs</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Community Forum</li>
                  <li className="hover:text-jaffa-400 cursor-pointer">Submit a Ticket</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--Black-Rock-950,#000230)] py-4">
        <p className="text-center  text-xs text-[#FEF6EE] font-thin">
          © Copyright 2024 SquareCraft | All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
