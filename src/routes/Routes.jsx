// Routes.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from "../App"
import Login from "../pages/auth/Login/Login"
import Register from "../pages/auth/Register/Register"

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
     }
   ]
  },
];

export const router = createBrowserRouter(routes); 
