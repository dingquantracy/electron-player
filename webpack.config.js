var path = require('path');
var webpack = require("webpack")

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.join(__dirname, '/app'),
    // publicPath: "/assets/",
    filename: '[name].js'
  },
  module:{
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders:['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg)$/,
        exclude: /node_modules/,
        loaders:['file-loader?name=[name].[ext]']
      }
    ]
  },
  externals: {
    React: 'react',
    ReactDom: 'react-dom'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ]
};