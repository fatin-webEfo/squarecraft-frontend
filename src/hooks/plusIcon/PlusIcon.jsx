import PropTypes from 'prop-types';

const PlusIcon = ({ className = '' }) => {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="currentColor" // Use currentColor to inherit text color
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M14 8.5H8V14.5H6V8.5H0V6.5H6V0.5H8V6.5H14V8.5Z" />
    </svg>
  );
};

PlusIcon.propTypes = {
  className: PropTypes.string,
};

export default PlusIcon;
