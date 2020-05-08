const path = require('path');
module.exports = {
    mode: "development",
    entry: './src/index.js',
    module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: "index.js"
},
};