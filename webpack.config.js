var path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
      filename: 'bundle.js',
      path: DIST_DIR
    },
    module : {
      rules : [
        {
          test : /\.jsx?/,
          // include : SRC_DIR,
          loader : 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
         }
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      ]
    }
  };