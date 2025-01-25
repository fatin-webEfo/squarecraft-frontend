import { useState, createContext, useEffect, useMemo, useCallback, Fragment } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Memoized helper function to update user state and persist in localStorage
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

  const contextValue = useMemo(() => ({
    user,
    registerUser,
    loginUser,
    error,
    loading
  }), [user, registerUser, loginUser, error, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      <Fragment>{children}</Fragment>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
