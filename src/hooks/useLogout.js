import { useNavigate } from "react-router-dom";
import { removeUser } from "../authService";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeUser();
    navigate("/");
  };

  return logout;
};

export default useLogout;