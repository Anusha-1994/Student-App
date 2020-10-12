/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({
  component: Component, restricted, path, exact,
}: any) => (
  <Route
    exact={exact}
    path={path}
    render={() => (<Component />)}
  />
);

export default PublicRoute;
