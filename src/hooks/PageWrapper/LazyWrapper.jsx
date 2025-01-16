import { Suspense, useCallback, memo } from 'react';

// eslint-disable-next-line react/prop-types
const LazyWrapper = memo(({ children }) => {
  const fallback = useCallback(
    () => (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-jaffa-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
    []
  );

  return <Suspense fallback={fallback()}>{children}</Suspense>;
});

LazyWrapper.displayName = 'LazyWrapper';

export default LazyWrapper;
