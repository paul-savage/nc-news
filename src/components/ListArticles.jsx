import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ListArticles = ({ items, searchParams, setSearchParams }) => {
  const navigate = useNavigate();

  const [queries, setQueries] = useState({});

  useEffect(() => {
    const topic = searchParams.get("topic");
    const sort_by = searchParams.get("sort_by");
    const order = searchParams.get("order");
    const newQueries = {};
    if (topic) {
      newQueries.topic = topic;
    }
    if (sort_by) {
      newQueries.sort_by = sort_by;
    }
    if (order) {
      newQueries.order = order;
    }
    setQueries(newQueries);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams(queries);
  };

  return (
    <>
      <div>
        <h1>Choose article...</h1>
        <Link to="/home">Home</Link>
      </div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <h3>Select sort order:</h3>
            <input
              id="asc"
              name="order"
              type="radio"
              value="asc"
              onChange={() =>
                setQueries((currentQueries) => {
                  return { ...currentQueries, order: "asc" };
                })
              }
              checked={queries.order === "asc"}
            />
            <label htmlFor="asc">Ascending</label>
            <input
              id="desc"
              name="order"
              type="radio"
              value="desc"
              onChange={() =>
                setQueries((currentQueries) => {
                  return { ...currentQueries, order: "desc" };
                })
              }
              checked={queries.order === "desc"}
            />
            <label htmlFor="desc">Descending</label>
          </div>
          <div>
            <h3>Select sort attribute:</h3>

            <input
              id="creation-date"
              name="attribute"
              type="radio"
              value="created_at"
              onChange={() =>
                setQueries((currentQueries) => {
                  return { ...currentQueries, sort_by: "created_at" };
                })
              }
              checked={queries.sort_by === "created_at"}
            />
            <label htmlFor="creation-date">Creation date</label>

            <input
              id="comment-count"
              name="attribute"
              type="radio"
              value="comment_count"
              onChange={() =>
                setQueries((currentQueries) => {
                  return { ...currentQueries, sort_by: "comment_count" };
                })
              }
              checked={queries.sort_by === "comment_count"}
            />
            <label htmlFor="comment-count">Number of comments</label>

            <input
              id="votes"
              name="attribute"
              type="radio"
              value="votes"
              onChange={() =>
                setQueries((currentQueries) => {
                  return { ...currentQueries, sort_by: "votes" };
                })
              }
              checked={queries.sort_by === "votes"}
            />
            <label htmlFor="votes">Number of votes</label>
          </div>
          <div>
            <button>Search</button>
          </div>
        </form>
      </div>
      {items.length === 0 ? (
        <p>No articles available</p>
      ) : (
        <div>
          {items.map((item) => {
            return (
              <div key={item.article_id} className="article-item">
                <div>
                  <div>
                    <img
                      style={{ width: "100%" }}
                      src={item.article_img_url}
                      alt={`Article avatar`}
                    />
                  </div>
                  <h3>
                    <strong>Title: </strong> {item.title}
                  </h3>
                  <h4>
                    <strong>Topic: </strong> {item.topic}
                  </h4>
                  <h4>
                    <strong>Author: </strong> {item.author}
                  </h4>
                  <h4>
                    <strong>Comments: </strong> {item.comment_count}
                  </h4>
                  <div>
                    <button
                      onClick={() => navigate(`/articles/${item.article_id}`)}
                    >
                      Read
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ListArticles;
