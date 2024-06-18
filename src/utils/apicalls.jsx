import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://pauls-be-nc-news.onrender.com/api",
});

export const getUsers = () => {
  return ncNews
    .get("/users")
    .then((response) => {
      return response.data.users;
    })
    .catch((err) => {
      console.log("Error fetching users....", err);
    });
};

export const getArticles = () => {
  return ncNews
    .get("/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((err) => {
      console.log("Error fetching articles....", err);
    });
};

export const getArticleById = (article_id) => {
  return ncNews
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      console.log("Error fetching articles....", err);
    });
};

export const getCommentsByArticleId = (article_id) => {
  return ncNews
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((err) => {
      console.log("Error fetching comments....", err);
    });
};
