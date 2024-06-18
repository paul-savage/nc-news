import { useEffect, useState } from "react";
import { getUsers } from "../utils/apicalls";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const [loginName, setLoginName] = useState("");
  const [invalidUser, setInvalidUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser('');
    getUsers().then((data) => {
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
    });
  }, []);

  const handleLoginNameChange = (event) => {
    setLoginName(event.target.value);
    setInvalidUser(false);
  };

  const handleSelectChange = (event) => {
    setLoginName(users[+event.target.value]);
    setInvalidUser(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (users.includes(loginName)) {
      setInvalidUser(false);
      setUser(loginName);
      navigate("/home");
    } else {
      setInvalidUser(true);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h2>Log in with username:</h2>
        {invalidUser ? <p>Username does not exist!</p> : null}
        <label htmlFor="login">Enter your username:</label>
        <input
          id="login"
          type="text"
          onChange={handleLoginNameChange}
          value={loginName}
          required
        />
        <h2>OR select username from:</h2>
        <div>
          <select onChange={handleSelectChange}>
            {users.map((user, index) => {
              return (
                <option key={user} value={index}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <p></p>
        <div>
          <button>Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
