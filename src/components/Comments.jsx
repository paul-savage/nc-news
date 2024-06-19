import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { postCommentByArticleId, deleteCommentById } from "../utils/apicalls";

const Comments = ({ article_id, comments, setComments }) => {
  const { user, setUser } = useContext(UserContext);

  const [posting, setPosting] = useState("");
  const [postDisabled, setPostDisabled] = useState(false);
  const [deleteDisabled, setDeleteDisabled] = useState(false);

  const handleDescriptionChange = (event) => {
    setPosting(event.target.value);
  };

  const handleDeleteComment = (event, comment_id) => {
    setDeleteDisabled(true);
    deleteCommentById(comment_id)
      .then(() => {
        setComments(
          comments.filter((comment) => comment.comment_id !== comment_id)
        );
        setDeleteDisabled(false);
      })
      .catch((err) => {
        setDeleteDisabled(false);
        console.log("Error deleting comment...", err);
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
        setPostDisabled(false);
      })
      .catch((err) => {
        setPostDisabled(false);
        console.log("Error posting comment...", err);
      });
  };

  return (
    <>
      {comments.length === 0 ? (
        <p>No comments posted</p>
      ) : (
        <div>
          {comments.map((comment) => {
            return (
              <div className="comment" key={comment.comment_id}>
                <h3>
                  <strong>Author: </strong> {comment.author}
                </h3>
                <p>
                  <strong>Body: </strong>
                  {comment.body}
                </p>
                <h4>
                  <strong>Created: </strong>
                  {comment.created_at}
                </h4>
                <div>
                  {comment.author === user ? (
                    <button
                      onClick={(event) =>
                        handleDeleteComment(event, comment.comment_id)
                      }
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h2>Post new comment:</h2>
        <label htmlFor="description">Enter your comment:</label>
        <textarea
          id="description"
          multiline="true"
          onChange={handleDescriptionChange}
          value={posting}
          required
        ></textarea>
        <div>
          {postDisabled ? (
            <div>
              <button disabled>Post Comment</button>
              <p>Posting comment...</p>
            </div>
          ) : (
            <button>Post Comment</button>
          )}
        </div>
      </form>
      <div></div>
    </>
  );
};

export default Comments;
