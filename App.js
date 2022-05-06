import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AppRoute from "./Route/AppRoute";
import routes from "./Route/Routes";
import Notfound from "./Common/Notfound/Notfound";
import CommonSpin from "./Common/Loaders/CommonSpin";
import "./App.scss";
import ReactGA from "react-ga";
import CookiesSetup from "./cookies/CookiesSetup";

function App() {
  console.log("im a react Ga");
  return (
    <Suspense
      fallback={
        // <Spin size="large" />
        <CommonSpin size="large" />
      }
    >
      <Router>
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
              isPublic={route.isPublic}
              exact={route.exact}
            />
          ))}
          <Route exact path="/404" component={Notfound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
      <CookiesSetup />
    </Suspense>
  );
}

export default App;
