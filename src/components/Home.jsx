import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <nav>
      <div>
        <Link to="/articles">
          <div>
            <button>Articles</button>
          </div>
        </Link>
      </div>
      <p></p>
      <div>
        <Link to="/topics">
          <div>
            <button>Topics</button>
          </div>
        </Link>
      </div>
      <p></p>
      <div>
        <Link to="/">
          <button>Log out</button>
        </Link>
      </div>
    </nav>
  );
};

export default Home;
