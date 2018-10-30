const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
}