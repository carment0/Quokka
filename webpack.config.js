const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/frontend/application.jsx'),
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' }
      },
    ]
  },
  devtool: 'source-maps'
};
