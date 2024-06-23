import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
} from "../utils/apicalls";
import { reformatTime } from "../utils/utils";
import Comments from "./Comments";
import Error from "./Error";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import CardGroup from "react-bootstrap/CardGroup";
import Spinner from "react-bootstrap/Spinner";

const SingleArticle = () => {
  const { user, setUser } = useContext(UserContext);

  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

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
        setError(`Error fetching article ${article_id}`);
      });
  }, []);

  const handleToggleComments = (event) => {
    setShowComments((currentStatus) => {
      return !currentStatus;
    });
  };

  const handleUpVote = (event) => {
    setArticle((currentArticle) => {
      return { ...currentArticle, votes: currentArticle.votes + 1 };
    });
    patchArticleById(article.article_id, { inc_votes: 1 })
      .then((res) => {
        setIsError(false);
        setArticle((currentArticle) => {
          return { ...currentArticle, votes: res.votes };
        });
      })
      .catch((err) => {
        setArticle((currentArticle) => {
          return { ...currentArticle, votes: currentArticle.votes - 1 };
        });
        setIsError(true);
        setError("Error patching article by ID");
      });
  };

  const handleDownVote = (event) => {
    setArticle((currentArticle) => {
      return { ...currentArticle, votes: currentArticle.votes - 1 };
    });
    patchArticleById(article.article_id, { inc_votes: -1 })
      .then((res) => {
        setIsError(false);
        setArticle((currentArticle) => {
          return { ...currentArticle, votes: res.votes };
        });
      })
      .catch((err) => {
        setArticle((currentArticle) => {
          return { ...currentArticle, votes: currentArticle.votes + 1 };
        });
        setIsError(true);
        setError("Error patching article by ID");
      });
  };

  if (error) {
    return <Error message={error} />;
  }

  if (isLoading) {
    return (
      <>
        <Spinner animation="border" variant="info" />
      </>
    );
  }

  return (
    <div className="px-2 mb-5">
      <h1>{article.title}</h1>

      <Card className="mt-3">
        <Card.Img
          variant="top"
          src={article.article_img_url}
          alt="article avatar"
        />
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Topic: {article.topic}</ListGroup.Item>
            <ListGroup.Item>Author: {article.author}</ListGroup.Item>
            <ListGroup.Item>
              Created: {reformatTime(article.created_at)}
            </ListGroup.Item>
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
          <Card.Text>{article.body}</Card.Text>
        </Card.Body>
        <Card.Body>
          <CardGroup>
            <Card bg={"light"}>
              <Card.Body>
                <Button variant="success" onClick={handleUpVote} size="lg">
                  Vote Up
                </Button>
              </Card.Body>
            </Card>
            <Card bg={"light"}>
              <Card.Body>
                <Card.Text>
                  <strong>
                    Votes:
                    <br /> {article.votes}
                  </strong>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card bg={"light"}>
              <Card.Body>
                <Button variant="danger" onClick={handleDownVote} size="lg">
                  Vote Down
                </Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </Card.Body>
        <Card.Body>
          {isError ? (
            <p className="voting-error">Error updating votes</p>
          ) : null}
          {showComments ? (
            <div>
              <Button variant="info" onClick={handleToggleComments} size="lg">
                Hide Comments
              </Button>
              <Comments
                article_id={article_id}
                comments={comments}
                setComments={setComments}
              />
            </div>
          ) : (
            <Button variant="info" onClick={handleToggleComments} size="lg">
              Show Comments
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleArticle;
