const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill','./src/index.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: './dist'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }, {
            loader: "postcss-loader"
          }
        ]
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }, {
        test: /\.vue$/,
        loaders: ['vue-loader']
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new BrowserSyncPlugin({
      proxy: 'http://localhost:8080',
      host: 'localhost',
      port: 3000
    }, {reload: true}),
    new CopyWebpackPlugin([
      {
        from: './src/index.php',
        to: 'index.php'
      }
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    proxy: {
      '/': {
        target: {
          host: 'localhost',
          port: 8888,
          protocol: 'http'
        }
      }
    }
  }
}
