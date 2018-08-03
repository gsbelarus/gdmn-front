// tslint:disable no-submodule-imports
import { Configuration, EnvironmentPlugin, HotModuleReplacementPlugin, NamedModulesPlugin } from 'webpack';
import * as merge from 'webpack-merge';
// @ts-ignore
import * as errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
// @ts-ignore
import * as noopServiceWorkerMiddleware from 'react-dev-utils/noopServiceWorkerMiddleware';

import { getRootRelativePath } from './utils';
import { getWebpackConfigBase, cssLoader, cssModulesLoader } from './webpackConfigBase';

const OUTPUT_FILENAME = 'scripts/[name].bundle.js';
const OUTPUT_CHUNK_FILENAME = 'scripts/[name].chunk.js';
const STYLES_PATH = getRootRelativePath('src/styles');

const config: Configuration = merge(getWebpackConfigBase(OUTPUT_FILENAME, OUTPUT_CHUNK_FILENAME), {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 9090,
    historyApiFallback: true,
    hot: true, // HMR
    inline: true, // HMR
    open: true,
    publicPath: '/',
    // FIXME type
    // stats: {
    // assets: false,
    // children: false,
    // colors: true,
    // modules: false
    // },
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
              plugins: ['react-hot-loader/babel', '@babel/plugin-syntax-dynamic-import']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      // styles
      {
        test: /\.css$/,
        include: STYLES_PATH,
        use: ['style-loader', cssLoader]
      },
      // css modules
      {
        test: /\.css$/,
        include: getRootRelativePath('src'),
        exclude: STYLES_PATH,
        use: ['style-loader', cssModulesLoader]
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new HotModuleReplacementPlugin(), // TODO test hot: true
    // prints more readable module names in the browser console on HMR updates
    new NamedModulesPlugin()
  ]
});

// tslint:disable-next-line no-default-export
export default config;
