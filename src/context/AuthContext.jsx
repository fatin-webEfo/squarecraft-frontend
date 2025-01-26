import axios from "axios";
import { useState, createContext, useEffect, useMemo, useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const setUser = useCallback((userData) => {
    if (userData) {
      localStorage.setItem("squarCraft_user", JSON.stringify(userData));
      
      // Send user data to the plugin using postMessage
      window.parent.postMessage(
        { type: "squarCraft_user", payload: userData },
        "https://steady-cobbler-fd4750.netlify.app" // Replace with your plugin domain
      );
    } else {
      localStorage.removeItem("squarCraft_user");
      
      // Notify plugin of logout
      window.parent.postMessage(
        { type: "squarCraft_user", payload: null },
        "https://steady-cobbler-fd4750.netlify.app" // Replace with your plugin domain
      );
    }
    setUserState(userData);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("squarCraft_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserState(parsedUser);

      // Send stored user data to the plugin on initialization
      window.parent.postMessage(
        { type: "squarCraft_user", payload: parsedUser },
        "https://steady-cobbler-fd4750.netlify.app"
      );
    }
  }, [setUser]);  

  useEffect(() => {
    const storedUser = localStorage.getItem("squarCraft_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserState(parsedUser);
      // Post existing user data to vanilla JS on initialization
      window.parent.postMessage(
        {
          type: "squarCraft_user",
          payload: parsedUser,
        },
        "*"
      );
    }
  }, [setUser]);

  const registerUser = useCallback(
    async (userData) => {
      setLoading(true);
      try {
        if (
          !userData ||
          !userData.name ||
          !userData.email ||
          !userData.squarCraft_auth_token
        ) {
          throw new Error("Invalid user data provided.");
        }
        setUser(userData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setUser]
  );

  const loginUser = useCallback(
    async (userData) => {
      setLoading(true);
      try {
        if (
          !userData ||
          !userData.email ||
          !userData.squarCraft_auth_token
        ) {
          throw new Error("Invalid user data provided.");
        }
        setUser(userData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setUser]
  );

const logoutUser = useCallback(async () => {
  setLoading(true);
  try {
    const response = await axios.post("https://webefo-backend.vercel.app/api/v1/logout", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}`,
      },
      withCredentials: true,
    });
    console.log(response.data.message);
    setUser(null);
    localStorage.removeItem("squarCraft_auth_token");
    sessionStorage.removeItem("squarCraft_auth_token");
    document.cookie = "squarCraft_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "squarCraft_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.yoursquarespace.com; secure; samesite=strict;";
    setError(null);
  } catch (err) {
    console.error("Logout Error:", err.message);
    setError("Failed to log out. Please try again.");
  } finally {
    setLoading(false);
  } 
}, [setUser]);

  const contextValue = useMemo(
    () => ({
      user,
      registerUser,
      loginUser,
      logoutUser,
      error,
      loading,
    }),
    [user, registerUser, loginUser, logoutUser, error, loading]
  );
  console.log("contextValue", contextValue);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;




