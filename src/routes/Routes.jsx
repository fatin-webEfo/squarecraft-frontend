// Routes.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from "../App"
import Login from "../pages/auth/Login/Login"

const routes = [
  {
    path: '/',
   element:<App/>,
   children:[
    
     {
       path: '/auth/login',
       element: <Login/>,
     },
   ]
  },
];

export const router = createBrowserRouter(routes); 
