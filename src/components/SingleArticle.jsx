import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getArticleById, getCommentsByArticleId } from "../utils/apicalls";
import Comments from "./Comments";

const SingleArticle = () => {
  const { user, setUser } = useContext(UserContext);

  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const articleAndComments = [
      getArticleById(article_id),
      getCommentsByArticleId(article_id),
    ];
    Promise.all(articleAndComments)
      .then((res) => {
        let theArticle = res[0];
        theArticle.created_at = reformatTime(theArticle.created_at);
        setArticle(theArticle);
        setComments(
          res[1].map((comment) => {
            comment.created_at = reformatTime(comment.created_at);
            return comment;
          })
        );
        setIsloading(false);
      })
      .catch((err) => {
        console.log("Error fetching article by ID -------->>>>>>", err);
      });
  }, []);

  const reformatTime = (str) => {
    let index = str.indexOf("T");
    if (index !== -1) {
      str = str.slice(0, index) + " " + str.slice(index + 1);
      index = str.indexOf(".");
      str = str.slice(0, index);
    }
    return str;
  };

  const handleToggleComments = (event) => {
    setShowComments((currentStatus) => {
      return !currentStatus;
    });
  };

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
        <div>
          {showComments ? (
            <div>
              <div>
                <button onClick={handleToggleComments}>Hide Comments</button>
              </div>
              <Comments comments={comments} />
            </div>
          ) : (
            <button onClick={handleToggleComments}>Show Comments</button>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleArticle;
