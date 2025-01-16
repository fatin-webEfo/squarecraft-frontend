import { useState } from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt = '', className = '', ...props }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`relative ${loading ? 'flex items-center justify-center bg-gray-200 animate-pulse' : ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        className={`transition-opacity duration-500 ease-in-out ${
          loading ? 'opacity-0' : 'opacity-100'
        } ${className}`} // Apply custom className here
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
