import path from 'path'
import express from 'express'

import { favIconRoute } from './favIconMiddleware';
import mainRouter from './pages/mainRouter';

const app = express()
const env = 'dev'
// https://github.com/gregberge/loadable-components/issues/634
// app.use('*/runtime~main.js', async (req, res, next) => {
//   console.log('delaying runtime chunk');
//   await new Promise(resolve => setTimeout(resolve, 2000));
//   next();
// });

app.use('/favicon.ico', express.static('./static/favicon.ico'));
// app.use(favIconRoute);
app.use(express.static(path.join(__dirname, '../../public')))

if (env !== 'production') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  // const { default: webpackConfig } = require('../../webpack.config.babel')
  // const webpackDevMiddleware = require('webpack-dev-middleware')
  // const webpack = require('webpack')
  /* eslint-enable global-require, import/no-extraneous-dependencies */
/*
  const compiler = webpack(webpackConfig)

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'silent',
      publicPath: '/dist/web',
      writeToDisk(filePath) {
        return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath)
      },
    }),
  )
  */
}

app.get('*', mainRouter)

// eslint-disable-next-line no-console
app.listen(9000, () => console.log('Server started http://localhost:9000'))
