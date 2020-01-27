'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

const defPort = 3000;
const defHost = '0.0.0.0';
const DEV_ENV = 'development';
const PROD_ENV = 'production';
const { PORT = defPort, HOST = defHost, NODE_ENV = DEV_ENV } = process.env;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './build/index.html',
  filename: 'index.html',
  inject: 'body',
  favicon: './build/js.ico',
});

const Uglify = () => new UglifyJsPlugin({
  cache: false,
  sourceMap: false,
  parallel: true,
  uglifyOptions: {
    warnings: false,
    compress: true,
    comments: false,
    ecma: 6,
    mangle: true,
    output: null,
    toplevel: false,
    nameCache: null,
    ie8: false,
    keep_fnames: false,
  },
});

const GZip = () => new CompressionPlugin({
  compressionOptions: { level: 9 },
  filename: '[path].gz[query]',
  algorithm: 'gzip',
  test: /\.js(\?.*)?$/i,
  threshold: 10240,
  minRatio: 0.8
});


const config = {
  target: 'web',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './build/index.js',
  ],
  output: {
    path: path.resolve(__dirname, './build/js'),
    filename: 'index.js',
  },
  externals: {
    'react': 'React',
    'redux': 'Redux',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react', 'env'],
            plugins: [
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-runtime'
            ]
          }
        }
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   loader: 'file-loader'
      // },
      // {
      //   test: /\.(svg|eot|ttf|woff|woff2)$/,
      //   loader: 'url-loader'
      // },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    host: HOST,
    port: PORT,
    stats: 'errors-only',
    // compress: true,
    // hot: true,
    // open: true,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }),
    HtmlWebpackPluginConfig,
  ],
  devtool: 'inline-source-map',
};

if (NODE_ENV === DEV_ENV) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (NODE_ENV === PROD_ENV) {
  config.optimization = { minimizer: [Uglify()] };
  config.plugins.push(GZip());
  config.module.rules[0].use.options.presets.push('react-optimize');
}

module.exports = config;
