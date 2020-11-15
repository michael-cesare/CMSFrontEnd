import path, { resolve } from 'path'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import LoadablePlugin from '@loadable/webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import CrudeTimingPlugin from './webpackFiles/crudeTimingPlugin'
import loaderRules from './webpackFiles/loaderRules';

const rootDir = path.join(__dirname, './');
const pathResolve = ( location ) => resolve( '/', __dirname, location );

const env = 'development';
const isDevServer = false;
const isDevelopment = env === 'development'
const isProduction = env === 'production'
const development = !isProduction

const appRoot = pathResolve('./');
const libPath = pathResolve('lib')
const appSrc = path.join(appRoot, 'src');

const webEntry = isDevServer ? './src/client/main-web-dev-server.tsx' :  { ReactApp: ['./src/client/main-web.tsx'] };
const nodeEntry = { NodeApp: ['./src/server/main.ts'] };

const getOutput = target => ({
  path: target === 'node' ? path.join(libPath, 'server') : path.join(libPath, 'client'),
  publicPath: target === 'node' ?  path.join(rootDir, 'lib', 'server') : '/client/', // used by webpackdevserver or express
  filename: isProduction ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
  chunkFilename: isProduction ? 'js/[name]-bundle-[chunkhash:8].js' : 'js/[name].js',
  libraryTarget: target === 'node' ? 'commonjs2' : undefined,
});

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(appSrc, 'client', 'index.html'),
  filename: "index.html",
  inject: true
});

const nodePlugins = env => [
  new LoadablePlugin(),
  new MiniCssExtractPlugin({
    filename: 'styles/[name].css'
  }),
];

const webPlugins = env => [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new LoadablePlugin(),
  env === 'development' ? new CrudeTimingPlugin() : () => {},
  new MiniCssExtractPlugin({
    filename: 'styles/[name].css'
  }),
  HTMLWebpackPluginConfig,
];

const getConfig = target => ({
  name: target,
  mode: development ? 'development' : 'production',
  entry: target === 'node' ? nodeEntry : webEntry,
  target,
  module: {
    rules: loaderRules( target, env ),
  },
  externals: target === 'node' ? [
    // '@loadable/component',
    nodeExternals({
      whitelist: [
        // /^@loadable\/component$/,
        // /^react$/,
        // /^react-dom$/,
        // /^core-js$/,
        // /^commonjs$/,
        // /^lodash$/,
        // /^lodash.debounce$/,
      ],
    }),
  ] : { 
    node: {
      fs: 'empty', // dont use fs on browser.. use only by node.
    },
  },

  // optimization: {
  //   runtimeChunk: target !== 'node',
  // },

  resolve: {
    extensions:[ ".ts", ".tsx", '.js', '.jsx', '.json', '.css', '.scss'],
    alias:      {
      '@': appSrc,
      '@server': resolve(appRoot, './src/server/'),
      '@client': resolve(appRoot, './src/client/'),
      '@redux': resolve(appRoot, './src/client/redux/'),
      '@epics': resolve(appRoot, './src/client/epics/'),
      '@utils': resolve(appRoot, './src/client/utils/'),
      '@views': resolve(appRoot, './src/client/views/'),
      '@components': resolve(appRoot, './src/client/components/'),
      '@srcTypes': resolve(appRoot, './src/types/'),
      '@styles': resolve(appRoot, './src/static/scss/'),
      '@sconfig': resolve(appRoot, './src/config/'),
      '@common': resolve(appRoot, './src/common/'),
    },
  },

  output: getOutput( target ),
  devtool: isDevelopment ? 'eval-source-map' : 'cheap-source-map',  // 'cheap-source-map', 'eval', 'eval-source-map'

  plugins: target === 'node' ? nodePlugins(env) : webPlugins(env),
})

export default [getConfig('web'), getConfig('node')]
