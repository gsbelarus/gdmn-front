import webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import getBaseConfiguration from './webpack-base.config';
import { getRootRelativePath } from './utils';

const OUTPUT_FILENAME = 'scripts/[name].[hash].bundle.js';
const OUTPUT_CHUNK_FILENAME = 'scripts/[name].[chunkhash].chunk.js';
const EXTRACT_CSS_FILENAME = 'styles/[name].[chunkhash].css';
const STYLES_PATH = getRootRelativePath('src/styles');

const configuration = merge(getBaseConfiguration(OUTPUT_FILENAME, OUTPUT_CHUNK_FILENAME), {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: STYLES_PATH,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
      // new OptimizeCSSAssetsPlugin({})
    ]
  },
  performance: {
    // TODO ?
    hints: false
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new MiniCssExtractPlugin({ filename: EXTRACT_CSS_FILENAME })
  ],
  output: {
    publicPath: '/gs/ng/' // TODO ?
  }
});

export default configuration;
