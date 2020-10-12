/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, path, exact }: any) => (
  <Route
    exact={exact}
    path={path}
    render={() => (<Component />)}
  />
);

export default PrivateRoute;
