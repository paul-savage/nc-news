import { useEffect, useState } from "react";
import { getTopics } from "../utils/apicalls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Error from "./Error";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
    <>
      <div className="nav-spacer">
        <h1>Topics</h1>
      </div>
      {items.length === 0 ? (
        <Alert className="mt-3" variant={"danger"}>
          No topics available
        </Alert>
      ) : (
        <div className="article-sort-box mx-auto px-2">
          {items.map((item) => {
            return (
              <Card className="mt-3" key={item.slug}>
                <Card.Body>
                  <Card.Title>{item.slug}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button
                    variant="warning"
                    onClick={() => navigate(`/articles?topic=${item.slug}`)}
                  >
                    Display Articles
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Topics;
