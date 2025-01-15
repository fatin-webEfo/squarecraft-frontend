// Routes.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from "../App"
import Login from "../pages/auth/Login/Login"
import Register from "../pages/auth/Register/Register"
import Pricingplan from "../pages/dashboard/Pricingplan/Pricingplan"
import RegisterOtp from "../pages/auth/Register/RegisterOtp/RegisterOtp"

const routes = [
  {
    path: '/',
   element:<App/>,
   children:[
    
     {
       path: '/auth/login',
       element: <Login/>,
     },
     {
      path:"/auth/register",
      element:<Register/>
     },
     {
      path:"/auth/register-otp",
      element:<RegisterOtp/>
     },

     {
      path:"/dashboard/pricing-plan",
      element:<Pricingplan/>
     }
   ]
  },
];

export const router = createBrowserRouter(routes); 
