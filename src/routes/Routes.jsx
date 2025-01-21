import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from '../App';
import MyWebsite from '../pages/dashboard/MyWebsite/MyWebsite';
import LazyWrapper from '../hooks/PageWrapper/LazyWrapper';
import PreloadCriticalRoutes from '../hooks/PreloadRoutes/PreloadCriticalRoutes';
import UpdateProfile from '../pages/dashboard/Profile/UpdateProfile/UpdateProfile';

const Login = lazy(() => import(/* webpackPrefetch: true */ '../pages/auth/Login/Login'));
const Register = lazy(() => import(/* webpackPrefetch: true */ '../pages/auth/Register/Register'));
const RegisterOtp = lazy(() => import(/* webpackPrefetch: true */ '../pages/auth/Register/RegisterOtp/RegisterOtp'));
const RegisterSuccess = lazy(() => import(/* webpackPrefetch: true */ '../pages/auth/Register/RegisterSuccess/RegisterSuccess'));
const ForgotPassEmailVerify = lazy(() => import(/* webpackPrefetch: true */ '../pages/auth/ForgotPassword/ForgotPassEmailVerify/ForgotPassEmailVerify'));
const ForgotPassOtp = lazy(() => import(/* webpackPrefetch: true */ '../pages/auth/ForgotPassword/ForgotPassOtp/ForgotPassOtp'));
const ForgotPassEnterNewPass = lazy(() => import(/* webpackPrefetch: true */ '../pages/auth/ForgotPassword/ForgotPassEnterNewPass/ForgotPassEnterNewPass'));
const ForgotPassSuccess = lazy(() => import(/* webpackPrefetch: true */ '../pages/auth/ForgotPassword/ForgotPassSuccess/ForgotPassSuccess'));
import LoadTest from '../components/LoadTest/LoadTest';



const routes = [
  {
    path: '/',
    element: (
      <>
        <PreloadCriticalRoutes />
        <App />
      </>
    ),
    children: [
      {
        path:"/loadTest" , element:<LoadTest/>
   
      },
      // auth routes starts
      {
        path: '/auth/login',
        element: <LazyWrapper><Login /></LazyWrapper>,
      },
      {
        path: '/auth/register',
        element: <LazyWrapper><Register /></LazyWrapper>,
      },
      {
        path: '/auth/register-otp',
        element: <LazyWrapper><RegisterOtp /></LazyWrapper>,
      },
      {
        path: '/auth/register-success',
        element: <LazyWrapper><RegisterSuccess /></LazyWrapper>,
      },
      {
        path: '/auth/Forgot-pass-email-verify',
        element: <LazyWrapper><ForgotPassEmailVerify /></LazyWrapper>,
      },
      {
        path: '/auth/Forgot-pass-email-otp',
        element: <LazyWrapper><ForgotPassOtp /></LazyWrapper>,
      },
      {
        path: '/auth/forgot-pass-set-new-pass',
        element: <LazyWrapper><ForgotPassEnterNewPass /></LazyWrapper>,
      },
      {
        path: '/auth/forgot-pass-pass-updated',
        element: <LazyWrapper><ForgotPassSuccess /></LazyWrapper>,
      },
      // auth routes ends




      // dashboard routes starts
      {
        path: "/dashboard/myWebsites",
        element: <LazyWrapper><MyWebsite /></LazyWrapper>,
      },
      {
        path: "/dashboard/pluginLibraries",

      },
      {
        path: "/dashboard/pricingPlan",

      },

      // dashboard routes ends


      // Profile routes starts
      {
        path: "/profile/editProfile",
        element: <LazyWrapper> <UpdateProfile /> </LazyWrapper>,
      },


    ],
  },
];

export const router = createBrowserRouter(routes);
