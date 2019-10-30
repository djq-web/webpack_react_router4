import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";

const AsyncHome = asyncComponent(() => import("../pages/Home"));
const AsyncCount = asyncComponent(() => import("../pages/Count"));
const AsyncNotFound = asyncComponent(() => import("../pages/NotFound"));

export default ({ childProps }) =>
  <Switch>
    <Route
      path="/"
      exact
      component={AsyncHome}
      props={childProps}
    />
    <Route
      path="/count"
      exact
      component={AsyncCount}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={AsyncNotFound} />
  </Switch>;
