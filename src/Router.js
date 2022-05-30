import { useState, Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Auth } from './routes';

const PrivateRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Fragment>
            <Route exact path="/">
              <Home />
            </Route>
          </Fragment>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default PrivateRoute;
