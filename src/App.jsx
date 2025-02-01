import { Outlet, useLocation } from "react-router";
import "./App.css";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import PageLoader from "./hooks/PageLoader/PageLoader";
import logo from "../public/images/auth/login/SquareCraft-logo-withText.svg"
import Image from "./hooks/Image/Image";

function App() {
  const { loading, error } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Detects route changes

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timeout); // Cleanup timeout on route change
  }, [location]);



  return (
    <>
    {
      error && <div className="bg-red-500 fixed top-5 shadow-sm shadow-red-100  text-white px-6 py-1.5 rounded-md">
        {error.message}
      </div>  // Error message when authentication fails or encounters an issue while loading the page.
    }
      <PageLoader isLoading={isLoading} />
      <Navbar />
     {
      loading ? (
      <> 
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 space-y-6 p-6 z-50">
      <Image className="animate-pulse" src={logo}></Image>
      </div>
      </>) :
      (<> <div className="mt-28">
        <Outlet />
      </div></>)
     }
      <Footer />
    </>
  );
}

export default App;
