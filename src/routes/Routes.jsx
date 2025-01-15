// Routes.jsx

import { createBrowserRouter } from 'react-router-dom';
import App from "../App"
import Login from "../pages/auth/Login/Login"
import Register from "../pages/auth/Register/Register"
import Pricingplan from "../pages/dashboard/Pricingplan/Pricingplan"
import RegisterOtp from "../pages/auth/Register/RegisterOtp/RegisterOtp"
import RegisterSuccess from "../pages/auth/Register/RegisterSuccess/RegisterSuccess"
import ForgotPassEmailVerify from './../pages/auth/ForgotPassword/ForgotPassEmailVerify/ForgotPassEmailVerify';
import ForgotPassOtp from '../pages/auth/ForgotPassword/ForgotPassOtp/ForgotPassOtp';
import ForgotPassEnterNewPass from '../pages/auth/ForgotPassword/ForgotPassEnterNewPass/ForgotPassEnterNewPass';
import ForgotPassSuccess from '../pages/auth/ForgotPassword/ForgotPassSuccess/ForgotPassSuccess';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [

      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />
      },
      {
        path: "/auth/register-otp",
        element: <RegisterOtp />
      },
      {
        path: "/auth/register-success",
        element: <RegisterSuccess />
      },
      {
        path: "/auth/Forgot-pass-email-verify",
        element: <ForgotPassEmailVerify />
      },
      {
        path: "/auth/Forgot-pass-email-otp",
        element: <ForgotPassOtp />
      },
      {
        path:"/auth/forgot-pass-set-new-pass",
        element:<ForgotPassEnterNewPass/>
      },
      {
        path:"/auth/forgot-pass-pass-updated",
        element:<ForgotPassSuccess/>
      }

    ]
  },
];

export const router = createBrowserRouter(routes); 
