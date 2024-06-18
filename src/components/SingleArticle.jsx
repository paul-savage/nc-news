import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getArticleById } from "./utils/apicalls";
import "../App.css";

const SingleArticle = () => {
  const { user, setUser } = useContext(UserContext);

  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    getArticleById(article_id)
      .then((res) => {
        let timeStr = res.created_at;
        let index = timeStr.indexOf("T");
        if (index !== -1) {
          timeStr = timeStr.slice(0, index) + " " + timeStr.slice(index + 1);
          res.created_at = timeStr;
          index = timeStr.indexOf(".");
          timeStr = timeStr.slice(0, index);
          res.created_at = timeStr;
        }
        setArticle(res);
      })
      .catch((err) => {
        console.log("Error fetching article by ID -------->>>>>>", err);
      });
    setIsloading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Single Article: {article_id}</h1>
      <Link to="/home">Home</Link>

      <div className="articleItem">
        <div>
          <div>
            <img
              style={{ width: "100%" }}
              src={article.article_img_url}
              alt={`Article avatar`}
            />
          </div>
          <h3>
            <strong>Title: </strong> {article.title}
          </h3>
          <h4>
            <strong>Topic: </strong> {article.topic}
          </h4>
          <h4>
            <strong>Author: </strong> {article.author}
          </h4>
          <p>{article.body}</p>
          <h4>
            <strong>Created: </strong> {article.created_at}
          </h4>
        </div>
      </div>
    </>
  );
};

export default SingleArticle;
