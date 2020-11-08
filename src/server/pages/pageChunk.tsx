import React from "react"
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'
import path from 'path';
import Immutable from 'immutable';

import createStoreSSR from '@client/redux/createStoreSSR';
import NodeApp from '@client/NodeApp'; 
import { renderHtmlApp } from './pageHtml'

const webStats = path.join( process.cwd(), '/public/dist/web/loadable-stats.json' );

export const renderPage = (ssrState:any, locationUrl:any) => {
  const nodeState = {
    viewModel: ssrState,
  }

  // const storeState = Immutable.fromJS(nodeState);
  const storeState = nodeState;
  const ssrStore = createStoreSSR(nodeState);
  const context = {};

  const webExtractor = new ChunkExtractor({ statsFile: webStats })

  const AppRoute = (
    <Provider store={ssrStore}>
      <StaticRouter location={locationUrl} context={context}>
        <NodeApp />
      </StaticRouter>
    </Provider>
  );

  const jsx = webExtractor.collectChunks(AppRoute)
  const htmlDom = renderToString(jsx)
  const rtn = renderHtmlApp(htmlDom, storeState, webExtractor)

  return rtn
}
