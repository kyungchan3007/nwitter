import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routers/Auth";
import Home from "../routers/Home";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Router exact path="/">
              <Home />
              <button>logout</button>
            </Router>
          </>
        ) : (
          <Router exact path="/">
            <Auth />
          </Router>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
