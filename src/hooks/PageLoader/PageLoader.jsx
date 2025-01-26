
import "./PageLoader.css"; // Import the CSS file for the loader animation

// eslint-disable-next-line react/prop-types
const PageLoader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 z-[9999999]">
          <div className="bg-jaffa-400 h-full loader-animation"></div>
        </div>
      )}
    </>
  );
};

export default PageLoader;
