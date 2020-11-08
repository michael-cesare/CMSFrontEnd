import React, { FC } from "react";
import { StaticRouter, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component'

// TODO - Hydreate issue with the below line: https://github.com/gregberge/loadable-components/issues/423
const HomePage = loadable(() => import(`@views/HomePage`));
const NotFoundPage = loadable(() => import('@views/NotFoundPage'));

type TOwnProps = {
};

const PageBody: FC<TOwnProps> = () => {
  return (
    <div className="page-body">
      <StaticRouter>
        <Switch>
          <Route path="/" component={HomePage}/>
          <Route path="/home" component={HomePage}/>
          <Route component={NotFoundPage} />
        </Switch>
      </StaticRouter>      
    </div>
  );
}

export default PageBody;
