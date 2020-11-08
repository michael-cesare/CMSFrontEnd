import * as React from 'react'
import { Provider } from 'react-redux';

import store from '@redux/createStore';
import { setupApp } from '@redux/common/actions';

import App from './App';

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

const WebApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WebApp
