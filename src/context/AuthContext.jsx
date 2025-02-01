import axios from "axios";
import { useState, createContext, useEffect, useMemo, useCallback, useContext } from "react";
import { useSanitize } from "../hooks/DomSanitize/DomSanitize";
import { API } from "../hooks/Api/Api";
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const {sanitize} = useSanitize(); 
  const [user, setUserState] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const setUser = useCallback((userData) => {
    if (userData) {
      const sanitizedUser = sanitize(userData); 
      localStorage.setItem("squarCraft_user", JSON.stringify(sanitizedUser));

      window.parent.postMessage(
        { type: "squarCraft_user", payload: sanitizedUser },
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
  }, [sanitize]);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API}/api/v1/get-userProfile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}`,
          },
          withCredentials: true,
        } 
      );

      console.log("Get method of authcontext", response.data);
      setUser(sanitize(response?.data)); 
    } catch (err) {
      console.error("Error fetching profile:", err);

      if (err.response?.status === 404) {
        console.warn("Profile not found, but user exists. Defaulting to user data.");
        const storedUser = localStorage.getItem("squarCraft_user");
        if (storedUser) {
          setUser(sanitize(JSON.parse(storedUser))); // ✅ Sanitize localStorage data
        }
      } else {
        setError(err.response?.data?.message || "Failed to fetch profile.");
      }
    } finally {
      setLoading(false);
    }
  }, [setUser, sanitize]);

  useEffect(() => {
    
const setTokenToScript = (token) => {
  const widgetScript = document.getElementById("squarecraft-script");
  if (widgetScript && token) {
    widgetScript.setAttribute("data-token", token);
    console.log("Token set to widget:", token);
  }
};
const authToken = localStorage.getItem("squarCraft_auth_token");
if (authToken) {
  setTokenToScript(authToken);
}
    window.authData = {
      user,
      token: localStorage.getItem("squarCraft_auth_token") || null,
    };

   
  }, [fetchProfile, sanitize, user]);

  const registerUser = useCallback(
    async (userData) => {
      setLoading(true);
      try {
        if (!userData || !userData.name || !userData.email || !userData.squarCraft_auth_token) {
          throw new Error("Invalid user data provided.");
        }
        setUser(sanitize(userData)); // ✅ Sanitize before setting user
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setUser, sanitize]
  );

  const loginUser = useCallback(
    async (userData) => {
      setLoading(true);
      try {
        if (!userData || !userData.email || !userData.squarCraft_auth_token) {
          throw new Error("Invalid user data provided.");
        }
        setUser(sanitize(userData)); // ✅ Sanitize before setting user
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setUser, sanitize]
  );

  const logoutUser = useCallback(async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        `${API}/api/v1/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}`,
          },
          withCredentials: true,
        }
      );
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
      fetchProfile,
      error,
      loading,
    }),
    [user, registerUser, loginUser, logoutUser, fetchProfile, error, loading]
  );

  console.log("contextValue", contextValue);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useWidget = () => {
  return useContext(AuthContext);
};