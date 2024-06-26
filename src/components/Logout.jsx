import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useEffect } from "react";

const Logout = () => {
  const { setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    setLoggedIn(false);
  }, []);

  return null;
};

export default Logout;
