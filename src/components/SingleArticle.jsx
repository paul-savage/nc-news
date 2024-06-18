import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const SingleArticle = () => {
  const { user, setUser } = useContext(UserContext);

  const { article_id } = useParams();

  return (
    <>
      <h1>Single Article: {article_id}</h1>
      <Link to="/home">Home</Link>
    </>
  );
};

export default SingleArticle;
