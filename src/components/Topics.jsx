import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getTopics } from "../utils/apicalls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Error from "./Error";

const Topics = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsloading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopics()
      .then((res) => {
        setItems(res);
        setIsloading(false);
      })
      .catch((err) => {
        setError("Error fetching topics");
      });
  }, []);

  const handleClick = (event, slug) => {
    navigate(`/articles?topic=${slug}`);
  };

  if (error) {
    return <Error message={error} />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h1>Choose topic...</h1>
        <Link to="/home">Home</Link>
      </div>
      {items.length === 0 ? (
        <p>No topics available</p>
      ) : (
        <div>
          {items.map((item) => {
            return (
              <div key={item.slug} className="topic-item">
                <div>
                  <h2>{item.slug}</h2>
                  <p>{item.description}</p>
                  <div>
                    <button onClick={(event) => handleClick(event, item.slug)}>
                      Display Articles
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

export default Topics;
