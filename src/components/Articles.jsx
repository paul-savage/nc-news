import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getArticles } from "../utils/apicalls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ListArticles from "./ListArticles";

const Articles = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsloading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getArticles()
      .then((res) => {
        setItems(res);
        setIsloading(false);
      })
      .catch((err) => {
        console.log("Error fetching articles -------->>>>>>", err);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <ListArticles items={items} />;
};

export default Articles;
