import React from "react";
import { Router, Location, Redirect } from "@reach/router";
import Home from "./Home";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location}>{children}</Router>
        </div>
      </div>
    )}
  </Location>
);

const app = () => (
  <div className="wraper">
    <GlobalStyles />
    <PosedRouter>
      <Home exact path="/">
        <Redirect to="/home" />
      </Home>
    </PosedRouter>
  </div>
);
export default app;
