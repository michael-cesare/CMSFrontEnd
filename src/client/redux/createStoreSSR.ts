import { compose, createStore, applyMiddleware } from 'redux';

import rootReducer from '@redux/rootReducer';

const configureStoreSSR = (preloadedState: any) => {
  const middlewareList: Array<any> = [];

  const enhancer = compose(applyMiddleware(...middlewareList));

  return createStore(
    rootReducer,
    preloadedState,
    enhancer,
  );
};

export default configureStoreSSR;
