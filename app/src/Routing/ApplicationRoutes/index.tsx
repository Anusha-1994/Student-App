/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import {
  NotFound,
  Students
} from '../../Pages';
import {
  Header,
  Sidebar,
} from '../../Components';
import Routes from '../../Global/Routes';
import './style.css';
import PrivateRoute from '../PrivateRoute'
const MainComponent = () => (
  <Layout>
    <Header />
    <Layout>
      <Sidebar />
      <Layout.Content className="px-5 py-4">
        <Switch>
          <Route path={Routes.home} exact><Redirect to={Routes.students} /></Route>
          <Route path={Routes.students} component={Students} exact />
          <Redirect to={Routes.notFound} />
        </Switch>
      </Layout.Content>
    </Layout>
  </Layout>
);
const Router = () => (
  <Switch>
    <Route path={Routes.notFound} component={NotFound} exact />
    <PrivateRoute path={Routes.home} component={MainComponent} />

  </Switch>
);
export default Router;