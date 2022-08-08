import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "../routers/Auth";
import Home from "../routers/Home";
import Profile from "../routers/Profile";
import Navigation from "./navigation";

//userObject (props App.js) , isLoggedIn( props App.js )
const AppRouter = ({ refreshUser, isLoggedIn, userObject }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObject={userObject} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObject={userObject} />
            </Route>
            <Route exact path="/profile">
              <Profile userObject={userObject} refreshUser={refreshUser} />
            </Route>
            {/* <Redirect from="*" to="/" /> */}
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            {/* <Redirect from="*" to="/" /> */}
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
