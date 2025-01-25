import { useEffect, useMemo } from "react";

// eslint-disable-next-line react/prop-types
const AuthenticateWrapper = ({ children }) => {
  const authenticateRoutes = useMemo(() => [
    "/auth/login",
    "/auth/register",
    "/auth/register-otp",
    "/auth/register-success",
    "/auth/Forgot-pass-email-verify",
    "/auth/Forgot-pass-email-otp",
    "/auth/forgot-pass-set-new-pass",
    "/auth/forgot-pass-pass-updated",
  ], []);

  useEffect(() => {
    const storedUser = localStorage.getItem("squarCraft_user");
    const currentPath = window.location.pathname;

    if (storedUser && authenticateRoutes.includes(currentPath)) {
      window.location.href = "/dashboard/myWebsites";
    }
  }, [authenticateRoutes]);

  return <>{children}</>;
};

export default AuthenticateWrapper;
