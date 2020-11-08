import express from 'express'

import { favIconRoute } from '@server/middleware/favIconMiddleware';
import mainRouter from '@server/pages/mainRouter';

const initNode = () => {
  const app = express()

  app.use(favIconRoute);
  app.use('/dist', express.static('public/dist'));

  // ---- errorHandler for unhandledRejection ----
  process.on('unhandledRejection', (err:any) => {
    const error = `[unhandledRejection] ${JSON.stringify(err)}` || err.message;
    console.log(error);
  });

  app.use(mainRouter)

  app.listen(9000, () => console.log('Server started http://localhost:9000'))
}

initNode();
