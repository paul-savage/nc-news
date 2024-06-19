import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { getTopicArticles } from "../utils/apicalls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ListArticles from "./ListArticles";

const TopicArticles = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const { slug } = useParams();

  const [isLoading, setIsloading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTopicArticles({ topic: slug })
      .then((res) => {
        setItems(res);
        setIsloading(false);
      })
      .catch((err) => {
        console.log("Error fetching topic articles -------->>>>>>", err);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <ListArticles items={items} />;
};

export default TopicArticles;
