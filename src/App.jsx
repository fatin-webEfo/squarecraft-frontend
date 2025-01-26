import { Outlet, useLocation } from "react-router";
import "./App.css";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import PageLoader from "./hooks/PageLoader/PageLoader";

function App() {
  const { user, loading, error } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Detects route changes

  // Show loader initially and when the route changes
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timeout); // Cleanup timeout on route change
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  console.log("User:", user);

  return (
    <>
      {/* Show the page loader while loading */}
      <PageLoader isLoading={isLoading} />
      <Navbar />
      <div className="mt-28">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
