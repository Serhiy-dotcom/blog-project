import React from "react";
import "./App.css";

import Header from "./Header.js";
import Posts from "./Posts.js";
import Post from "./Post.js";
import CreatePost from "./CreatePost.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />

        <Switch>
          <Route path="/" exact>
            <Posts />
          </Route>

          <Route path="/post/:id" exact>
            <Post />
          </Route>

          <Route path="/create_post" exact>
            <CreatePost />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
