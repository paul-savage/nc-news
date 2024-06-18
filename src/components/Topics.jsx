import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Topics = () => {
  const { user, setUser } = useContext(UserContext);

  return <h1>Topics</h1>;
};

export default Topics;
