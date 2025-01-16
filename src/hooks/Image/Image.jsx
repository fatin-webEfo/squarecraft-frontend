import  { useState } from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt = '', className = '', ...props }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className=" flex items-center justify-center bg-gray-200 animate-pulse">
          <div className="bg-gray-300 rounded-md w-full h-full"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        className={`transition-opacity w-full duration-500 ease-in-out ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
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
