import path, { resolve } from 'path'
import nodeExternals from 'webpack-node-externals'
import LoadablePlugin from '@loadable/webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CrudeTimingPlugin from './webpackFiles/crudeTimingPlugin'

const pathResolve = ( location ) => resolve( '/', __dirname, location );

const env = 'development';
const production = env === 'production'
const development = !production

const appRoot = pathResolve('./');
const distPath = pathResolve('public/dist')
const libPath = pathResolve('lib')
const appSrc = path.join(appRoot, 'src');

console.log( `
root:${appRoot}
src:${appSrc}
` )

const getOutput = target => ({
  path: target === 'node' ? path.join(libPath, 'server') : path.join(distPath, target),
  publicPath: target === 'node' ?  path.join(libPath, 'server') : `/dist/${target}/`, // used by webpackdevserver or express
  filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
  chunkFilename: production ? 'js/[name]-bundle-[chunkhash:8].js' : 'js/[name].js',
  //libraryTarget: target === 'node' ? 'commonjs2' : undefined,
});

const nodePlugins = env => [
  new LoadablePlugin(),
];

const webPlugins = env => [
  new LoadablePlugin(),
  env === 'development' ? new CrudeTimingPlugin() : () => {},
];

const getConfig = target => ({
  name: target,
  mode: development ? 'development' : 'production',
  target,
  entry: target === 'node' ? './src/server/main.ts' : `./src/client/main-${target}.js`,
  module: {
    rules: [
      {
        test: /\.([jt])sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: { target },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  externals:
    target === 'node' ? [nodeExternals()] : undefined,

  optimization: {
    runtimeChunk: target !== 'node',
  },

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
    },
  },

  output: getOutput( target ),
  plugins: [new LoadablePlugin(), new MiniCssExtractPlugin()],
  devtool: target === 'web' && development ? 'eval-source-map' : 'cheap-source-map',  // 'cheap-source-map', 'eval', 'eval-source-map'

  plugins: target === 'node' ? nodePlugins(env) : webPlugins(env),
})

export default [getConfig('web'), getConfig('node')]
