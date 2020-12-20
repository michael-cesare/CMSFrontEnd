import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import path from 'path';

import { globalContext } from '@/server/middleware/globalContext';
import { favIconRoute } from '@server/middleware/favIconMiddleware';
import mainRouter from '@server/pages/mainRouter';

import envConfig, { PORT } from "@common/config/envConfig";
import logger from '@common/utils/logger.util';
import { readfileFs } from '@common/utils/config.util';

const initNode = () => {
  const app = express()
  const port = PORT();
  const httpServer = http.createServer(app);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cors());

  // Recourses
  app.use(favIconRoute);
  app.use('/client', express.static('lib/client'));
  app.use('/src', express.static('lib/client'));
  app.use('/lib', express.static('lib'));
  app.use(express.static('lib/server'));

  // Middleware
  app.use(globalContext);

  // Server Request Handlers
  app.use(mainRouter)
  
  // Server Start

  logger.info(`****************** STARTING ********************`);
  httpServer.listen(port, () => logger.info(`Server is listenning`));
  logger.info(`**********************************************`);

  logger.info(`Server running on port ${port}`);

  // ---- errorHandler for unhandledRejection ----
  process.on('unhandledRejection', (err:any) => {
    const error = `[unhandledRejection] ${err.message || JSON.stringify(err)}`;
    console.log(error);
  });
}

const startNode = (data: any) => {
  logger.log(`APP Configs: ${JSON.stringify(data)}`);
  envConfig.config = data;
  initNode();
}

const errorCatcher = (err: any) => {
  logger.log(`err ${JSON.stringify(err)}`);
}

const pathResolve = ( location:string ) => path.join( process.cwd(), location );
const configFilePath = pathResolve('/lib/public/config.json');
readfileFs(configFilePath, startNode, errorCatcher);
