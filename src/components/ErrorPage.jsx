import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const ErrorPage = () => {
  const { user, setUser } = useContext(UserContext);

  return <h1>Error - page not found (user: {user})</h1>;
};

export default ErrorPage;
