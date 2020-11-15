
import path, { resolve } from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import babelConfigs from '../babel.options'

const pathResolve = ( location ) => resolve( '/', __dirname, location );

const appRoot = pathResolve('../');
const pathAlias = {
  src: path.join(appRoot, 'src'),
  images: path.join(appRoot, 'src', 'static', 'images'),
  nodeModules: path.join(appRoot, 'node_modules'),
};

const cssLoaderClient = env => [
  {
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    include: pathAlias.src,
    use: [
      'style-loader', // creates style nodes from JS strings
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          importLoaders: 3,
          minimize: true,
          import: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          ident:   'postcss',
      },
      },
      { loader: 'resolve-url-loader' },
      {
        loader: 'sass-loader',
       },
    ],
  }
];

const cssLoaderServer = env => [
  {
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    use: [
		  'style-loader',
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
      },
      { loader: 'resolve-url-loader' },
      { loader: 'sass-loader' },
    ],
  },
];

const mediaLoader = [
  {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      query: {
        limit: 40000,
        mimetype: 'application/octet-stream',
      },
    },
  },
  {
    test: /\.(wav|mp3|png|jpe?g|gif)$/,
    loader: 'file-loader',
    query: {
      name: 'static/media/[name].[hash:8].[ext]',
    },
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)$/,
    use: {
      loader: 'file-loader',
      query: {
        // Inline images smaller than 10kb as data URIs
        limit: 40000,
        name: 'static/media/[name].[hash:8].[ext]',
        // outputPath: 'fonts/'
      },
    },
    include: [
      pathAlias.images,
    ],
  },
  {
    test: /\.(woff(2)?|eot|ttf)$/,
    loader: 'file-loader',
    options: {
      onlyLocals: true,
    },
  },
];

const cssLoader = (env, renderType) => (renderType === 'ssr' ? cssLoaderServer(env) : cssLoaderClient(env));

const nodeRules = (env, target) => [
  {
    test: /\.([jt])sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: babelConfigs({
          target,
          env,
          name: 'babel-loader',
        }),
      },
      {
        loader: "ts-loader"
      },
    ],
  },
  ...cssLoader(env, 'ssr'),
  {
    test: /\.txt$/,
    use: 'raw-loader',
  },
  {
    type: 'javascript/auto',
    test: /\.(json)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'json-loader',
        query: { name: '[name].[ext]' },
      },
    ],
  },
  {
    test: /\.(html)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'html-loader',
        options: { },
      },
    ],
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: 'file-loader',
  },
  ...mediaLoader,
];

const webRules = (env, target) => [
  {
    test: /\.([jt])sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: babelConfigs({
          target,
          env,
          name: 'babel-loader',
        }),
      },
      {
        loader: "ts-loader"
      },
    ],
  },
  ...cssLoader(env, 'csr'),
  {
    test: /\.txt$/,
    use: 'raw-loader',
  },
  {
    type: 'javascript/auto',
    test: /\.(json)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'json-loader',
        query: { name: '[name].[ext]' },
      },
    ],
  },
  {
    test: /\.(html)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'html-loader',
        options: { },
      },
    ],
  },
  ...mediaLoader,
];

const loaderRules = (target, env) => {
  return (target === 'node' ? nodeRules(env, target) : webRules(env, target))
};

export default loaderRules;
