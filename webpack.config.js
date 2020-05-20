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
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]",
                        outputPath: "./assets/",
                    }
                }
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.js"
    },
};