var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '../web-app/js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      dropbox: 'dropbox',
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['jsx'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  }
}
