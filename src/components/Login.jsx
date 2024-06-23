import { useEffect, useState } from "react";
import { getUsers } from "../utils/apicalls";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const { setUser, setLoggedIn } = useContext(UserContext);

  const [loginName, setLoginName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidUser, setIsInvalidUser] = useState(false);
  const [isFetchUsersError, setIsFetchUsersError] = useState(false);

  useEffect(() => {
    getUsers()
      .then((data) => {
        const userNames = data.map((user) => {
          return user.username;
        });
        setUsers(userNames);
        if (userNames.length) {
          setLoginName(userNames[0]);
        } else {
          setLoginName("");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsFetchUsersError(true);
      });
  }, []);

  const handleLoginNameChange = (event) => {
    setLoginName(event.target.value);
    setIsInvalidUser(false);
  };

  const handleSelectChange = (event) => {
    setLoginName(users[+event.target.value]);
    setIsInvalidUser(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (users.includes(loginName)) {
      setIsInvalidUser(false);
      setUser(loginName);
      setLoggedIn(true);
      navigate("/home");
    } else {
      setIsInvalidUser(true);
    }
  };

  if (isFetchUsersError) {
    return <p className="invalid-username">Error loading user names</p>;
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
      <div className="login-header mb-5">NC News</div>
      <div className="login-form-wrapper">
        <Form onSubmit={handleSubmit} className="px-2">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="login-name">Login with user name</Form.Label>
            <Form.Control
              id="login-name"
              placeholder="username"
              onChange={handleLoginNameChange}
              value={loginName}
            />
          </Form.Group>

          {isInvalidUser ? (
            <p className="invalid-username">User name does not exist</p>
          ) : null}

          <Form.Label>
            <strong>OR</strong>
          </Form.Label>

          <Form.Group className="mb-3">
            <Form.Label>Select user name from</Form.Label>
            <Form.Select onChange={handleSelectChange}>
              {users.map((user, index) => {
                return (
                  <option key={user} value={index}>
                    {user}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default Login;
