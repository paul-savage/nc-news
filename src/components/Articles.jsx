import { useEffect, useState } from "react";
import { getArticles } from "../utils/apicalls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ListArticles from "./ListArticles";
import Error from "./Error";
import Spinner from "react-bootstrap/Spinner";

const Articles = () => {
  const navigate = useNavigate();

  const { user, setUser, setLoggedIn } = useContext(UserContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsloading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const topic = searchParams.get("topic");
    const sort_by = searchParams.get("sort_by");
    const order = searchParams.get("order");
    let p = searchParams.get("p");
    let limit = searchParams.get("limit");
    const queries = {};
    if (topic) {
      queries.topic = topic;
    }
    if (sort_by) {
      queries.sort_by = sort_by;
    } else {
      queries.sort_by = "created_at";
    }
    if (order) {
      queries.order = order;
    } else {
      queries.order = "desc";
    }
    if (p) {
      queries.p = p;
      p = +p;
    } else {
      p = 1;
    }
    if (limit) {
      queries.limit = limit;
      limit = +limit;
    } else {
      limit = 10;
    }
    getArticles(queries)
      .then((res) => {
        setItems(res);
        if (res.length) {
          setPageData({
            pageNumber: p,
            pageSize: limit,
            maxPages: Math.ceil(+res[0].total_count / limit),
          });
        }
        setIsloading(false);
      })
      .catch((err) => {
        setError("Error fetching articles");
      });
  }, [searchParams]);

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
    <ListArticles
      items={items}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      pageData={pageData}
      setPageData={setPageData}
    />
  );
};

export default Articles;
