import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const useUserAuth = () => {
  const { loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [loading, navigate]);
};

export default useUserAuth;
