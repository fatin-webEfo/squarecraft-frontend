import React, { useEffect, useCallback } from 'react';

const PreloadCriticalRoutes = React.memo(() => {
  const preloadPages = useCallback(() => {
    // Preload all authentication-related pages
    const authPages = [
      '../../pages/auth/Login/Login',
      '../../pages/auth/Register/Register',
      '../../pages/auth/Register/RegisterOtp/RegisterOtp',
      '../../pages/auth/Register/RegisterSuccess/RegisterSuccess',
      '../../pages/auth/ForgotPassword/ForgotPassEmailVerify/ForgotPassEmailVerify',
      '../../pages/auth/ForgotPassword/ForgotPassOtp/ForgotPassOtp',
      '../../pages/auth/ForgotPassword/ForgotPassEnterNewPass/ForgotPassEnterNewPass',
      '../../pages/auth/ForgotPassword/ForgotPassSuccess/ForgotPassSuccess',
    ];

    const preloadPromises = authPages?.map(page =>
      import(/* webpackPrefetch: true */ `${page}`)
    );

    Promise.all(preloadPromises)
      .then(() => {
        console.log('All authentication pages preloaded');
      })
      .catch(err => {
        console.error('Error preloading authentication pages:', err);
      });
  }, []);

  useEffect(() => {
    preloadPages();
  }, [preloadPages]);

  return null;
});

PreloadCriticalRoutes.displayName = 'PreloadCriticalRoutes';

export default PreloadCriticalRoutes;
