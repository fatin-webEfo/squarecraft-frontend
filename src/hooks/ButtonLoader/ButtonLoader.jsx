
const ButtonLoader = ( ) => {
  
    return (
      <div className="flex justify-center items-center ">
        <div
          className={`border-4 h-6 w-6 border-t-orange-700 bg-orange-500 border-orange-500 border-solid rounded-full`}
          style={{
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
    );
  };
  
  export default ButtonLoader;
  