import PropTypes from 'prop-types';

const InstallationDrawer = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-[9999] h-screen bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose} // Close the drawer when the overlay is clicked
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 z-[9999] right-0 h-screen w-full md:w-1/3 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Installation</h2>
          <button onClick={onClose} className="text-xl font-bold">
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

InstallationDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default InstallationDrawer;
