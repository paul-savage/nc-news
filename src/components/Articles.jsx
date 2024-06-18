import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getArticles } from "./utils/apicalls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "../App.css";

const Articles = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsloading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getArticles()
      .then((res) => {
        setItems(res);
      })
      .catch((err) => {
        console.log("Error fetching articles -------->>>>>>", err);
      });
    setIsloading(false);
  }, []);

  const handleClick = (event) => {
    navigate(`/articles/${event.target.dataset.id}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
              <div key={item.article_id} className="articleItem">
                <div>
                  <div>
                    <img
                      style={{ width: "100%" }}
                      src={item.article_img_url}
                      alt={`Article avatar`}
                    />
                  </div>
                  <h3>
                    <strong>Name: </strong> {item.title}
                  </h3>
                  <h4>
                    <strong>Topic: </strong> {item.topic}
                  </h4>
                  <h4>
                    <strong>Author: </strong> {item.author}
                  </h4>
                  <div>
                    <button onClick={handleClick} data-id={item.article_id}>
                      Read
                    </button>
                  </div>
                  <p></p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Articles;
