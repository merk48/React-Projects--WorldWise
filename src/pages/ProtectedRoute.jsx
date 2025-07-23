import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication/fakeAuthenticationContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);

  // hook useEffect execute after the jsx is rendered already
  return isAuthenticated && children;
}

export default ProtectedRoute;
