import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import config from '../config/config';
import pkg from '../package.json';
import { getRootRelativePath } from './utils';

const OUTPUT_PATH = getRootRelativePath(config.webpack.buildPath);
const ENTRY_APP_TS = getRootRelativePath('src/app/index.tsx');
const INDEX_HTML_TEMPLATE = getRootRelativePath('src/index.ejs');
const INDEX_HTML_FAVICON = getRootRelativePath('src/favicon.ico');
const INDEX_HTML_TITLE = 'GDMN'; // TODO pkg.title
const INDEX_HTML_DESCRIPTION = pkg.description;
const CONFIG_FILE = getRootRelativePath('config/config.json');
const STYLES_DIR = getRootRelativePath('src/styles');
const COMPONENTS_DIR = getRootRelativePath('src/app/components');

function getConfiguration(outputFilename, outputChunkFilename) {
  return {
    entry: {
      app: [
        //`webpack-dev-server/client?http://${'localhost'}:${9091}`,
        ENTRY_APP_TS
      ]
    },
    output: {
      path: OUTPUT_PATH,
      publicPath: '/', // TODO test
      filename: outputFilename,
      chunkFilename: outputChunkFilename
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: INDEX_HTML_FAVICON,
        inject: false,
        template: INDEX_HTML_TEMPLATE,
        title: INDEX_HTML_TITLE,
        // template params
        appMountNodeId: config.webpack.appMountNodeId,
        description: INDEX_HTML_DESCRIPTION,
        mobile: true
      }),
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(pkg.version)
      }),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
      alias: {
        configFile: CONFIG_FILE,
        styles: STYLES_DIR,
        components: COMPONENTS_DIR
      },
      extensions: ['.tsx', '.ts', '.js', '.jsx']
    }
  };
}

export default getConfiguration;
