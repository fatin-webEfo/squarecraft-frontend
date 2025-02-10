import axios from "axios";
import { useState, createContext, useEffect, useMemo, useCallback, useContext } from "react";
import { API } from "../hooks/Api/Api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pluginLoading, setpluginLoading] = useState(false);
  const [postPluginsLoading, setPostPluginsLoading] = useState(false);
  const [myPlugins, setMyPlugins] = useState([]);
  

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

      setUserState(response.data);
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  const postPlugins = useCallback(async () => {
    setPostPluginsLoading(true);
    try {
        const newPlugin = {
            pluginName: "New Plugin",
            src: "https://fatin-webefo.github.io/squareCraft-Plugin/squareCraft.js",
            website: "https://squarecraft.io",
        };

        const response = await axios.post(
            `${API}/api/v1/create-plugins`,
            newPlugin,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}` },
                withCredentials: true,
            }
        );
        

        if(response.status === 201){
          setPostPluginsLoading(false);
          console.log("✅ New Plugin Created:", response.data);
        setMyPlugins((prevPlugins) => [...prevPlugins, response.data.plugin]);
        }

    } catch (error) {
        console.error("❌ Error creating plugin:", error);
    } finally {
        setPostPluginsLoading(false);
    }
}, []);




const getPlugin = useCallback(async () => {
  setpluginLoading(true);
  try {
      const response = await axios.get(`${API}/api/v1/my-plugins`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}` },
          withCredentials: true,
      });

      console.log("✅ Plugins Fetched:", response.data);
      
      const pluginsWithLoadingState = response?.data?.map(plugin => ({
          ...plugin,
          loading: false
      }));

      setMyPlugins(pluginsWithLoadingState);

  } catch (error) {
      console.error("❌ Error fetching plugins:", error);
  } finally {
      setpluginLoading(false);
  }
}, []);




  useEffect(() => {
    fetchProfile();
    getPlugin();
  }, [fetchProfile, getPlugin]);

  const logoutUser = useCallback(async () => {
    setLoading(true);
    try {
      await axios.post(
        `${API}/api/v1/logout`,
        {}, // Empty body
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}` },
          withCredentials: true,
        }
      );

      setUserState(null);
      localStorage.removeItem("squarCraft_auth_token");
      sessionStorage.removeItem("squarCraft_auth_token");
      document.cookie = "squarCraft_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setError(null);
    } catch (err) {
      console.error("❌ Logout Error:", err.message);
      setError("Failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      myPlugins,
      logoutUser,
      fetchProfile,postPluginsLoading,
      pluginLoading,
      postPlugins,
      setMyPlugins,
      setpluginLoading,
      loading,
      setUserState,
      error,
    }),
    [user, logoutUser, fetchProfile,setpluginLoading,postPluginsLoading, postPlugins,pluginLoading,setMyPlugins, myPlugins, loading, error]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useWidget = () => useContext(AuthContext);
