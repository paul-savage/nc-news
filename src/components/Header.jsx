import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  return <h1>NC News! - (user: {user})</h1>;
};

export default Header;
