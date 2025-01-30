// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes/Routes';
import AuthProvider from './context/AuthContext';
import AuthenticateWrapper from './hooks/AutenticateWrapper/AutenticateWrapper';
import { DomSanitize } from './hooks/DomSanitize/DomSanitize';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DomSanitize>
    <AuthProvider>
      <AuthenticateWrapper>   
        <RouterProvider router={router} />
      </AuthenticateWrapper>   
      </AuthProvider>
    </DomSanitize>
  </React.StrictMode>
);
