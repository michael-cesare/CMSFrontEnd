import { applyMiddleware, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import * as commonEpics from '@epics/common.epics';
import * as pageEpics from '@epics/page.epics';

import { getInitialState } from '@utils/state.util';

import middleware from './middleware';
import rootReducer from './rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
const blacklistedActions: Array<string> = [];

const actionSanitizer = ( action: any ) => action;

const stateSanitizer = ( state: any ) => {
  const newState = state && state.toJS ? state.toJS() : state;

  return newState;
};

const composeEnhancers = typeof window !== 'undefined' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__( {
    actionsBlacklist: blacklistedActions,
    trace:            true,
    traceLimit:       25,
    actionSanitizer,
    stateSanitizer,
  } )
  : compose;

const persistedState = getInitialState();

const epicMiddleware = createEpicMiddleware();
const enhancedMiddleware = composeEnhancers( applyMiddleware(  
  middleware,
  epicMiddleware,
) );

const store = createStore(
  rootReducer,
  persistedState,
  enhancedMiddleware,
);

const epics = [
  commonEpics.handleSetupApp,
  pageEpics.handleSetPage,
]

epicMiddleware.run( combineEpics<any>( ...epics ) );

export default store;
