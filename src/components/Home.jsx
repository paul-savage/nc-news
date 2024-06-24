import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Home = () => {
  const { setLoggedIn } = useContext(UserContext);

  return (
    <nav className="nav-spacer mb-5">
      <div className="article-sort-box mx-auto px-2">
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Articles</Card.Title>
            <Card.Text>Display all articles</Card.Text>
            <Link to="/articles">
              <div>
                <Button variant="success" size="lg">
                  Articles
                </Button>
              </div>
            </Link>
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Topics</Card.Title>
            <Card.Text>Display articles by topic</Card.Text>
            <Link to="/topics">
              <div>
                <Button variant="warning" size="lg">
                  Topics
                </Button>
              </div>
            </Link>
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Log out</Card.Title>
            <Card.Text>Log out current user</Card.Text>
            <Link to="/topics">
              <div>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setLoggedIn(false)}
                >
                  Log out
                </Button>
              </div>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </nav>
  );
};

export default Home;
