import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { ChunkExtractor } from '@loadable/server'
import path from 'path';

import { createStoreSSR, epicMiddlewares, runEpicMiddleware } from '@client/redux/createStoreSSR'
import NodeApp from '@client/NodeApp'

import { setupApp } from '@redux/common/actions';

import { renderHtmlApp } from './pageHtml'

const webStats = path.join(process.cwd(), '/lib/client/loadable-stats.json')

export const renderPage = (ssrState: any, locationUrl: any) => {
  const nodeState = {
    viewModel: ssrState,
  }

  // const storeState = Immutable.fromJS(nodeState)
  const storeState = nodeState
  const epicMiddleware = epicMiddlewares()
  const ssrStore = createStoreSSR(nodeState, epicMiddleware)
  runEpicMiddleware(epicMiddleware);
  ssrStore.dispatch(setupApp());

  const context = {};

  const webExtractor = new ChunkExtractor({ statsFile: webStats, entrypoints: ['ReactApp'] })

  const sheet = new ServerStyleSheet()
  const AppRoute: JSX.Element = (
    <Provider store={ssrStore}>
      <StaticRouter location={locationUrl} context={context}>
        <NodeApp />
      </StaticRouter>
    </Provider>
  );
  
  const AppStyled = sheet.collectStyles(AppRoute);
  const jsx: any = webExtractor.collectChunks(AppStyled)

  const htmlDom = renderToString(jsx)
  const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
  const rtn = renderHtmlApp(htmlDom, storeState, webExtractor, styleTags)

  return rtn
}
