const path = require('path');
module.exports = {
    mode: "development",
    entry: './src/index.js',
    devServer: {
        port: 8080,
        compress: true,
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "index.js"
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
}