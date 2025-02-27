'use strict';

var webpack = require('webpack');
var path = require('path');

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

var DEV_MODE = process.env.NODE_ENV !== 'production';

if (DEV_MODE) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}
else {
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

var entry = DEV_MODE ? [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  './examples/app.js'
] : {
  app: './examples/app.js',
  overflow: './examples/overflow.js',
  scroll: './examples/scroll.js',
  throttle: './examples/throttle.js',
  vendors: ['react']
};

var loaders = DEV_MODE ? [{
  test: /\.jsx?$/,
  loader: 'react-hot',
  exclude: /node_modules/
}, {
  test: /\.jsx?$/,
  loader: 'babel?stage=0&loose=all',
  exclude: /node_modules/
}] : [{
  test: /\.jsx?$/,
  loader: 'babel?stage=0&loose=all',
  exclude: /node_modules/
}];

module.exports = {
  module: {
    loaders: loaders
  },

  entry: entry,

  watch: DEV_MODE,
  debug: DEV_MODE,
  devtool: DEV_MODE ? 'inline-source-map' : 'source-map',

  output: {
    path: path.join(__dirname, 'examples/js/'),
    filename: '[name].js'
  },

  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  }
};
