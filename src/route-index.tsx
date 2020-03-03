import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Test from "./pages/test";
import Activities from "./pages/activities/activities";
import ActivityPage from "./pages/ActivityPage";
import ActivityEdit from "./pages/ActivityEdit";

export default function RouteIndex() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/activities">
        <Activities />
      </Route>
      <Route path="/activity/:activityId">
        <ActivityPage />
      </Route>
      <Route path="/edit-activity/:activityId">
        <ActivityEdit />
      </Route>
      <Route path="/test">
        <Test />
      </Route>
    </Switch>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About(props) {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
