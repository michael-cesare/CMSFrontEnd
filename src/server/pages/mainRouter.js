import express from 'express';

import { renderPage } from './pageChunk'
import apiClient from '../api.util'

const mainRouter = express.Router();

const fetch = async (fetchUrl) => {
  return await apiClient.get(fetchUrl, {
    options: {
      isPublicPath: true,
    },
  });
};

const mainRoute = async (req, res, next) => {
  const locationUrl = req.url || '/';
  const ssrState = await fetch( locationUrl );

  const pageHtml = renderPage(ssrState, locationUrl);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(pageHtml);
  res.end();
};

mainRouter.get('/*', mainRoute);

export default mainRouter;
