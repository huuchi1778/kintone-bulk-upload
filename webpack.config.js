/* eslint-disable */
const path = require('path');
module.exports = (env = {}) => {
  return {
    entry: {
      'kinetoneCustomize': './src/index.ts'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
