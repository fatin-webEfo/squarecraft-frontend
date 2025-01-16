import { useLocation } from 'react-router-dom';
import logo from "../../../public/images/footer/SquareCraft-logo-withText.svg";
import livaChat from "../../../public/images/footer/liveChat.svg";
import Image from '../../hooks/Image/Image';

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

  return <div className="bg-[#FEF6EE] mt-20 px-10 py-12">
    <div className='max-w-[95%] mx-auto'>
      <div className='flex items-center w-full justify-between'>
        <Image src={logo} className=''></Image>
        <Image src={livaChat} className='w-36 rounded-md cursor-pointer'></Image>
      </div>
    </div>
  </div>;
};

export default Footer;
