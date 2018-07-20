import webpack from 'webpack';
import merge from 'webpack-merge';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import noopServiceWorkerMiddleware from 'react-dev-utils/noopServiceWorkerMiddleware';

import getBaseConfiguration from './webpack-base.config';
import { getRootRelativePath } from './utils';

const OUTPUT_FILENAME = 'scripts/[name].bundle.js';
const OUTPUT_CHUNK_FILENAME = 'scripts/[name].chunk.js';
const DEV_SERVER_HOST = 'localhost';
const DEV_SERVER_PORT = 9090;
const STYLES_PATH = getRootRelativePath('src/styles');
const MODULE_STYLES_PATH = getRootRelativePath('src');

const configuration = merge(getBaseConfiguration(OUTPUT_FILENAME, OUTPUT_CHUNK_FILENAME), {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  devServer: {
    host: DEV_SERVER_HOST,
    port: DEV_SERVER_PORT,
    historyApiFallback: true,
    hot: true, //HMR
    inline: true, //HMR
    open: true,
    publicPath: '/', // TODO test
    stats: {
      assets: false,
      children: false,
      colors: true,
      modules: false
    },
    overlay: {
      warnings: true,
      errors: true
    },
    // see https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpackDevServer.config.js
    before(app) {
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
      app.use(noopServiceWorkerMiddleware());
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              // cacheDirectory: true,
              plugins: ['react-hot-loader/babel']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        include: STYLES_PATH,
        use: ['style-loader', { loader: 'css-loader', options: { sourceMap: true } }]
      },
      {
        test: /\.css$/,
        include: MODULE_STYLES_PATH,
        exclude: STYLES_PATH,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(), // TODO test hot: true
    new webpack.NamedModulesPlugin()
  ]
});

export default configuration;
