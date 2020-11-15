import * as React from 'react'
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from '@redux/createStore';
import { setupApp } from '@redux/common/actions';

import App from './App';

import '@styles/global.scss';

store.dispatch( setupApp() );

// const ReactApp = () => {
//   React.useEffect(() => {
//     const jsNodeState = document.getElementById('__NODE_STATE__');
//     if (jsNodeState && jsNodeState.parentElement) {
//       jsNodeState.parentElement.removeChild(jsNodeState);
//     }
//   }, []);

//   return (
//     <App />
//   );
// };

const customHistory = createBrowserHistory({
  basename: '/',
});

const WebApp = () => (
  <Provider store={store}>
    <Router history={customHistory}>
      <App />
    </Router>
  </Provider>
);

export default WebApp
