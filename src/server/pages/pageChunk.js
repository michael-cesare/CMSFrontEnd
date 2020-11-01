import React from "react";
import Immutable from 'immutable';
import { renderToString } from 'react-dom/server';
// import { Provider } from 'react-redux';
// import { StaticRouter } from 'react-router-dom';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';

import { renderHtmlApp } from './pageHtml'

const nodeStats = path.resolve(
  __dirname,
  '../../../public/dist/node/loadable-stats.json',
)

const webStats = path.resolve(
  __dirname,
  '../../../public/dist/web/loadable-stats.json',
)

export const renderPage = (ssrState, locationUrl) => {
  const storeState = Immutable.fromJS(ssrState);
  const ssrStore = { ssrState } // configureStoreSSR(storeState);
  const context = {};

  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })
  const { default: App } = nodeExtractor.requireEntrypoint()

  const webExtractor = new ChunkExtractor({ statsFile: webStats })
  const AppRouter = (
    // <Provider store={ssrStore}>
    //   <StaticRouter location={locationUrl} context={context}>
        <App />
    //   </StaticRouter>
    // </Provider>
  );

  const jsx = webExtractor.collectChunks(AppRouter);
  const htmlDom = renderToString(jsx);
  const rtn = renderHtmlApp(htmlDom, ssrStore, webExtractor);

  return rtn;
};
