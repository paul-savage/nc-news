import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reformatTime } from "../utils/utils";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const ListArticles = ({
  items,
  searchParams,
  setSearchParams,
  pageData,
  setPageData,
}) => {
  const navigate = useNavigate();

  const [queries, setQueries] = useState({});

  useEffect(() => {
    const topic = searchParams.get("topic");
    const sort_by = searchParams.get("sort_by");
    const order = searchParams.get("order");
    const newQueries = {};
    if (topic) {
      newQueries.topic = topic;
    }
    if (sort_by) {
      newQueries.sort_by = sort_by;
    } else {
      newQueries.sort_by = "created_at";
    }
    if (order) {
      newQueries.order = order;
    } else {
      newQueries.order = "desc";
    }
    setQueries(newQueries);
  }, [pageData]);

  const handleSelectChange = (event) => {
    setPageData((currentData) => {
      return { ...currentData, pageNumber: +event.target.value };
    });
    const copyQueries = { ...queries, p: +event.target.value };
    setQueries(copyQueries);
    setSearchParams(copyQueries);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams(queries);
  };

  if (items.length === 0) {
    return <p>No articles available</p>;
  }

  return (
    <>
      <div className="nav-spacer">
        <h1 className="mt-4">Articles</h1>
      </div>

      <div className="article-sort-box mx-auto px-2">
        <Form
          onSubmit={handleSubmit}
          className="mt-3 border border-light-subtle rounded-3 p-3"
        >
          <Row>
            <Col className="text-start">
              <h5>Sort order:</h5>

              <Form.Group className="mb-3">
                <Form.Check
                  id="asc"
                  type="radio"
                  label="Ascending"
                  value="asc"
                  onChange={() =>
                    setQueries((currentQueries) => {
                      return { ...currentQueries, order: "asc" };
                    })
                  }
                  checked={queries.order === "asc"}
                />

                <Form.Check
                  id="desc"
                  type="radio"
                  label="Descending"
                  value="desc"
                  onChange={() =>
                    setQueries((currentQueries) => {
                      return { ...currentQueries, order: "desc" };
                    })
                  }
                  checked={queries.order === "desc"}
                />
              </Form.Group>
            </Col>

            <Col className="text-start">
              <h5>Sort by:</h5>

              <Form.Group className="mb-3">
                <Form.Check
                  id="creation-date"
                  type="radio"
                  label="Creation date"
                  value="created_at"
                  onChange={() =>
                    setQueries((currentQueries) => {
                      return { ...currentQueries, sort_by: "created_at" };
                    })
                  }
                  checked={queries.sort_by === "created_at"}
                />

                <Form.Check
                  id="comment-count"
                  type="radio"
                  label="Comments"
                  value="comment_count"
                  onChange={() =>
                    setQueries((currentQueries) => {
                      return {
                        ...currentQueries,
                        sort_by: "comment_count",
                      };
                    })
                  }
                  checked={queries.sort_by === "comment_count"}
                />

                <Form.Check
                  id="votes"
                  type="radio"
                  label="Votes"
                  value="votes"
                  onChange={() =>
                    setQueries((currentQueries) => {
                      return { ...currentQueries, sort_by: "votes" };
                    })
                  }
                  checked={queries.sort_by === "votes"}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>

      {pageData.maxPages && pageData.maxPages > 1 ? (
        <div className="article-sort-box mt-3 mx-auto px-2">
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Page</Card.Title>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Form onSubmit={(event) => event.preventDefault()}>
                  <Form.Select onChange={handleSelectChange} value={pageData.pageNumber}>
                    {Array.from(Array(pageData.maxPages).keys()).map(
                      (pageNumber) => {
                        return (
                          <option key={pageNumber} value={pageNumber + 1}>
                            {pageNumber + 1}
                          </option>
                        );
                      }
                    )}
                  </Form.Select>
                </Form>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>of {pageData.maxPages}</Card.Title>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
      ) : null}

      <div className="mt-3 mb-5 px-2">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {items.map((item) => (
            <Col key={item.article_id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={item.article_img_url}
                  alt="article avatar"
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item>Topic: {item.topic}</ListGroup.Item>
                    <ListGroup.Item>Author: {item.author}</ListGroup.Item>
                    <ListGroup.Item>
                      Comments: {item.comment_count}
                    </ListGroup.Item>
                    <ListGroup.Item>Votes: {item.votes}</ListGroup.Item>
                    <ListGroup.Item>
                      Created: {reformatTime(item.created_at)}
                    </ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/articles/${item.article_id}`)}
                  >
                    Read article
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ListArticles;
