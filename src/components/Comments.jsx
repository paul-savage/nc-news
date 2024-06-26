import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { postCommentByArticleId, deleteCommentById } from "../utils/apicalls";
import Error from "./Error";
import { reformatTime } from "../utils/utils";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

const Comments = ({ article_id, comments, setComments }) => {
  const { user, setUser } = useContext(UserContext);

  const [posting, setPosting] = useState("");
  const [postDisabled, setPostDisabled] = useState(false);
  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDescriptionChange = (event) => {
    setPosting(event.target.value);
  };

  const handleDeleteComment = (event, comment_id) => {
    setDeleteDisabled(true);
    deleteCommentById(comment_id)
      .then(() => {
        handleShow();
        setComments(
          comments.filter((comment) => comment.comment_id !== comment_id)
        );
        setDeleteDisabled(false);
      })
      .catch((err) => {
        setDeleteDisabled(false);
        setError("Error deleting comment");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = { article_id: article_id, body: posting, username: user };
    setPostDisabled(true);
    postCommentByArticleId(article_id, newPost)
      .then((res) => {
        setComments((currentComments) => {
          return [...currentComments, res];
        });
        setPosting("");
        setPostDisabled(false);
      })
      .catch((err) => {
        setPostDisabled(false);
        setError("Error posting comment");
      });
  };

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      {comments.length === 0 ? (
        <Alert className="mt-3" variant={"danger"}>
          No comments posted!
        </Alert>
      ) : (
        <div>
          {comments.map((comment) => {
            return (
              <Card
                bg={"light"}
                border="info"
                key={comment.comment_id}
                className="mt-4"
              >
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Author:</strong> {comment.author}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Created:</strong> {reformatTime(comment.created_at)}
                  </ListGroup.Item>
                </ListGroup>
                <Card.Text className="p-4">{comment.body}</Card.Text>
                {comment.author === user ? (
                  <Button
                    className="mx-5 mb-2"
                    variant="danger"
                    size="lg"
                    disabled={deleteDisabled}
                    onClick={(event) =>
                      handleDeleteComment(event, comment.comment_id)
                    }
                  >
                    Delete
                  </Button>
                ) : null}
              </Card>
            );
          })}
        </div>
      )}

      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Label htmlFor="post-text">
          <strong>Post new comment:</strong>
        </Form.Label>
        <Form.Group>
          <Form.Control
            as="textarea"
            placeholder="Enter new comment"
            onChange={handleDescriptionChange}
            value={posting}
            required
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Button
            size="lg"
            variant="info"
            type="submit"
            disabled={postDisabled}
          >
            Post Comment
          </Button>
          {postDisabled ? (
            <Alert className="mt-3" variant={"info"}>
              Posting comment...
            </Alert>
          ) : null}
        </Form.Group>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>The post has been deleted.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Comments;
