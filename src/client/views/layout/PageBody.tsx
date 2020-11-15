import React, { FC } from "react";
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component'

const HomePage = loadable(() => import('@views/HomePage' /* webpackChunkName: 'views-HomePage' */));
const NotFoundPage = loadable(() => import('@views/NotFoundPage' /* webpackChunkName: 'views-NotFoundPage' */));

type TOwnProps = {
};

const PageBody: FC<TOwnProps> = () => {
  return (
    <div className="page-body">
      <Switch>
        <Route key="1" path="/" component={HomePage}/>
        <Route key="home" path="/home" component={HomePage}/>
        <Route key="NotFoundPage" component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default PageBody;
