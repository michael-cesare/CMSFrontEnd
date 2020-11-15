import { compose, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import * as commonEpics from '@epics/common.epics';
import * as pageEpics from '@epics/page.epics';

import rootReducer from '@redux/rootReducer';

import middleware from './middleware';

const createStoreSSR = ( preloadedState: any, epicMiddleware: any ) => {
  const middlewareList: Array<any> = [
    middleware,
    epicMiddleware,
  ];

  const enhancedMiddleware = compose( applyMiddleware(...middlewareList ));

  const store = createStore(
    rootReducer,
    preloadedState,
    enhancedMiddleware,
  );

  return store;
};

const epicMiddlewares = () => {
  const epicMiddleware = createEpicMiddleware();

  return epicMiddleware;
}

const runEpicMiddleware = ( epicMiddleware: any ) => {
  const epics = [
    commonEpics.handleSetupApp,
    pageEpics.handleSetPage,
  ]

  epicMiddleware.run( combineEpics<any>( ...epics ) );
}

export {
  createStoreSSR,
  epicMiddlewares,
  runEpicMiddleware,
};
