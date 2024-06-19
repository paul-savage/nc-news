import { useNavigate, Link } from "react-router-dom";

const ListArticles = ({ items }) => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>Choose article...</h1>
        <Link to="/home">Home</Link>
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
