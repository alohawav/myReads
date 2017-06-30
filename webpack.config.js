const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/App.js',
    styles: './src/styles/main.scss',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    // Creates a separate file for css:
    new ExtractTextPlugin('styles.css'),

    // Generates the index.html file with the script tags dynamically:
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],

  // Sets the path for the modules and makes it unnecessary to indicate the extensions:
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          // env is a Babel preset that automatically determines the Babel plugins you need
          // based on your supported environments:
          presets: ['env', 'react', 'stage-2'],
        },
      },
      {
        // Transforms scss into css:
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack-loader'],
      },
    ],
  },
  // Base file in dev tools instead of bundle.js:
  devtool: 'source-map',
  devServer: {
    // Always return the main index.html, so react-router render the route in the client
    historyApiFallback: {
      index: '/',
    },
  },
};
