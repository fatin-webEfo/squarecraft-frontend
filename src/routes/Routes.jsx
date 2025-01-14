// Routes.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from "../App"
import Login from "../pages/auth/Login/Login"
import Register from "../pages/auth/Register/Register"
import Pricingplan from "../pages/dashboard/Pricingplan/Pricingplan"

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
      path:"/dashboard/pricing-plan",
      element:<Pricingplan/>
     }
   ]
  },
];

export const router = createBrowserRouter(routes); 
