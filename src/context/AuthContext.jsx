import axios from "axios";
import { useState, createContext, useEffect, useMemo, useCallback, Fragment } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const setUser = useCallback((userData) => {
    if (userData) {
      localStorage.setItem("squarCraft_user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("squarCraft_user");
    }
    setUserState(userData);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("squarCraft_user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser)); // Restore user from localStorage
    }
  }, []);

  const registerUser = useCallback(async (userData) => {
    setLoading(true);
    try {
      if (!userData || !userData.name || !userData.email || !userData.squarCraft_auth_token) {
        throw new Error("Invalid user data provided.");
      }
      setUser(userData); // Store user in state and localStorage
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  const loginUser = useCallback(async (userData) => {
    setLoading(true);
    try {
      if (!userData || !userData.email || !userData.squarCraft_auth_token) {
        throw new Error("Invalid user data provided.");
      }
      setUser(userData); // Store user in state and localStorage
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  const logoutUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/v1/logout", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}`,
        },
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

  const contextValue = useMemo(() => ({
    user,
    registerUser,
    loginUser,
    error,
    loading,
    logoutUser,
  }), [user, registerUser, loginUser, error, loading,logoutUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      <Fragment>{children}</Fragment>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
