import express from 'express'

import { favIconRoute } from '@server/middleware/favIconMiddleware';
import mainRouter from '@server/pages/mainRouter';

const initNode = () => {
  const app = express()

  app.use(favIconRoute);
  app.use('/client', express.static('lib/client'));
  app.use('/src', express.static('lib/client'));
  app.use('/lib', express.static('lib'));
  app.use(express.static('lib/server'));

  // ---- errorHandler for unhandledRejection ----
  process.on('unhandledRejection', (err:any) => {
    const error = `[unhandledRejection] ${err.message || JSON.stringify(err)}`;
    console.log(error);
  });

  app.use(mainRouter)

  app.listen(9000, () => console.log('Server started http://localhost:9000'))
}

initNode();
