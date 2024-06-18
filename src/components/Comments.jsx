import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Comments = ({ comments }) => {
  const { user, setUser } = useContext(UserContext);

  if (comments.length === 0) {
    return <p>No comments available</p>;
  }

  return (
    <>
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comments;
