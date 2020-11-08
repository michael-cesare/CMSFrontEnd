import express from 'express';

import apiClient from '@server/api.util'
import { renderPage } from './pageChunk'

const mainRouter = express.Router();

const fetch = async (fetchUrl:any) => {
  return await apiClient.get(fetchUrl, {
    options: {
      isPublicPath: true,
    },
  });
};

const mainRoute = async (req:any, res:any, next:any) => {
  const locationUrl = req.url || '/';
  const ssrState = await fetch( locationUrl );

  const pageHtml = renderPage(ssrState, locationUrl);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(pageHtml);
  res.end();
};

mainRouter.get('/', mainRoute);
mainRouter.get('/*', mainRoute);

export default mainRouter;
