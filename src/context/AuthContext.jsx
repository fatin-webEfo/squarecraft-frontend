import axios from "axios";
import { useState, createContext, useEffect, useMemo, useCallback, useContext } from "react";
import { API } from "../hooks/Api/Api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("squarCraft_auth_token");
      if (!token) {
        setUserState(null);
        return;
      }

      const response = await axios.get(`${API}/api/v1/get-userProfile`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      console.log("✅ Profile fetched:", response.data);
      setUserState(response.data);
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]); 

  const logoutUser = useCallback(async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/api/v1/logout`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}` },
        withCredentials: true,
      });
      setUserState(null);
      localStorage.removeItem("squarCraft_auth_token");
      sessionStorage.removeItem("squarCraft_auth_token");
      document.cookie = "squarCraft_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setError(null)
    } catch (err) {
      console.error("❌ Logout Error:", err.message);
      setError("Failed");
    } finally {
      setLoading(false);
     
    }
  }, []);

  const contextValue = useMemo(() => ({
    user,
    logoutUser,
    fetchProfile,
    loading,
    setUserState,
    error,
  }), [user, logoutUser, fetchProfile, loading, error]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useWidget = () => useContext(AuthContext);
 