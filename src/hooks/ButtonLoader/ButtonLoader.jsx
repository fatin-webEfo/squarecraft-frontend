
const ButtonLoader = ( ) => {
  
    return (
      <div className="flex justify-center items-center ">
        <div
          className={`border-4 h-6 w-6 border-t-gray-900 bg-transparent border-gray-700 border-solid rounded-full`}
          style={{
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
    );
  };
  
  export default ButtonLoader;
  