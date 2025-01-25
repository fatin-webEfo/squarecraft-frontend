// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes/Routes';
import AuthProvider from './context/AuthContext';
import AuthenticateWrapper from './hooks/AutenticateWrapper/AutenticateWrapper';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AuthenticateWrapper>   
        <RouterProvider router={router} />
      </AuthenticateWrapper>   
      </AuthProvider>
  </React.StrictMode>
);
