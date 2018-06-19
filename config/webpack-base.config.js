import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from '../config/config';
import pkg from '../package.json';
import { getRootRelativePath } from './utils';
// import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const OUTPUT_PATH = getRootRelativePath(config.webpack.buildPath);
const ENTRY_APP_TS = getRootRelativePath('src/app/index.tsx');
const INDEX_HTML_TEMPLATE = getRootRelativePath('src/index.ejs');
const INDEX_HTML_FAVICON = getRootRelativePath('src/favicon.ico');
const INDEX_HTML_TITLE = 'GDMN'; // TODO pkg.title
const INDEX_HTML_DESCRIPTION = pkg.description;
const CONFIG_FILE = getRootRelativePath('config/config.json');
const SRC_DIR = getRootRelativePath('src');

function getConfiguration(outputFilename, outputChunkFilename) {
  return {
    entry: {
      app: [
        // TODO 'react-hot-loader/patch',
        ENTRY_APP_TS
      ]
    },
    output: {
      path: OUTPUT_PATH,
      publicPath: '/', // TODO test
      filename: outputFilename,
      chunkFilename: outputChunkFilename
    },
    plugins: [
      new HtmlWebpackPlugin({
        // TODO minify: { collapseWhitespace: true }
        favicon: INDEX_HTML_FAVICON,
        inject: false,
        template: INDEX_HTML_TEMPLATE,
        title: INDEX_HTML_TITLE,
        // template params
        appMountNodeId: config.webpack.appMountNodeId,
        description: INDEX_HTML_DESCRIPTION,
        mobile: true
      }),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
      alias: {
        '@src': SRC_DIR,
        configFile: CONFIG_FILE
      },
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
    }
  };
}

export default getConfiguration;
