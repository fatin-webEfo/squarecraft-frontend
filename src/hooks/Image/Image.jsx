import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const imageCache = new Set(); 

const Image = ({ src, alt = '', className = '', ...props }) => {
  const isCached = useMemo(() => imageCache.has(src), [src]);
  const [loading, setLoading] = useState(!isCached);

  useEffect(() => {
    if (isCached) {
      setLoading(false); 
    }
  }, [isCached]);

  const handleLoad = useCallback(() => {
    setLoading(false);
    imageCache.add(src); 
  }, [src]);

  return (
    <div className={`relative ${loading ? 'flex items-center justify-center bg-gray-200 animate-pulse' : ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        className={`transition-opacity duration-500 ease-in-out ${
          loading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        {...props}
      />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default Image;
