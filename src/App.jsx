import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Home from "./components/Home";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import Topics from "./components/Topics";
import ErrorPage from "./components/ErrorPage";

function App() {
  const { loggedIn } = useContext(UserContext);

  if (loggedIn) {
    return (
      <>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Logout />} />
            <Route path="/home" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <footer></footer>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
