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

      window.parent.postMessage(
        { type: "squarCraft_user", payload: userData },
        "https://steady-cobbler-fd4750.netlify.app"
      );
    } else {
      localStorage.removeItem("squarCraft_user");

      window.parent.postMessage(
        { type: "squarCraft_user", payload: null },
        "https://steady-cobbler-fd4750.netlify.app"
      );
    }
    setUserState(userData);
  }, []);

  // Fetch updated profile data
  const fetchProfile = useCallback(async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://webefo-backend.vercel.app/api/v1/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}`,
        },
        withCredentials: true,
      });
      console.log("Fetched profile:", response.data);
      setUser(response.data.user); // Update context with the latest user data
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    const storedUser = localStorage.getItem("squarCraft_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserState(parsedUser);

      window.parent.postMessage(
        {
          type: "squarCraft_user",
          payload: parsedUser,
        },
        "*"
      );

      // Fetch the latest profile data on initial load
      if (parsedUser?.user_id) {
        fetchProfile(parsedUser.user_id);
      }
    }
  }, [fetchProfile]);

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
        if (!userData || !userData.email || !userData.squarCraft_auth_token) {
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
      const response = await axios.post(
        "https://webefo-backend.vercel.app/api/v1/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      setUser(null);
      localStorage.removeItem("squarCraft_auth_token");
      sessionStorage.removeItem("squarCraft_auth_token");
      document.cookie = "squarCraft_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "squarCraft_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.yoursquarespace.com; secure; samesite=strict;";
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
      setUserState,
      fetchProfile, // Add fetchProfile to the context
      error,
      loading,
    }),
    [user, registerUser, loginUser, logoutUser, fetchProfile, error, loading]
  );

  console.log("contextValue", contextValue);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
