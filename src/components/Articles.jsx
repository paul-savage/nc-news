import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getArticles } from "../utils/apicalls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useSearchParams } from "react-router-dom";
import ListArticles from "./ListArticles";

const Articles = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsloading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const topic = searchParams.get("topic");
    const sort_by = searchParams.get("sort_by");
    const order = searchParams.get("order");
    const queries = {};
    if (topic) {
      queries.topic = topic;
    }
    if (sort_by) {
      queries.sort_by = sort_by;
    }
    if (order) {
      queries.order = order;
    }
    getArticles(queries)
      .then((res) => {
        setItems(res);
        setIsloading(false);
      })
      .catch((err) => {
        console.log("Error fetching articles -------->>>>>>", err);
      });
  }, [searchParams]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ListArticles
      items={items}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
};

export default Articles;
