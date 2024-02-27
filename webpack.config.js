const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "util":false,
      "path":false

    },
  },
  mode:'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: './dist',
  },
  devtool: 'inline-source-map',  
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html'
    }),
    new NodePolyfillPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", 'css-loader'],
      },
    ],
  }, 
  optimization: {
    runtimeChunk: 'single',
  },
};