import React, { FC } from "react";
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component'

const HomePage = loadable(() => import('@views/HomePage' /* webpackChunkName: 'views-HomePage' */));
const ServerPage = loadable(() => import('@views/ServerPage' /* webpackChunkName: 'views-ServerPage' */));

type TOwnProps = {
};

const PageBody: FC<TOwnProps> = () => {
  return (
    <div className="page-body">
      <Switch>
        <Route key="home" path="/home" component={HomePage}/>
        <Route key="index" exact path="/" component={HomePage}/>
        <Route key="serverPage" path="/" component={ServerPage} />
      </Switch>
    </div>
  );
}

export default PageBody;
