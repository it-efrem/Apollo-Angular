const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.ts',
    output: {
        publicPath: '/',
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.css', '.json'],
    },
    module: {
        loaders: [{
            test: /\.css/,
            loader: 'style!css',
        }, {
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.json$/,
            loader: 'json',
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'ui/index.html',
        }),
    ],
    devServer: {
        proxy: {
            '/graphql': 'http://localhost:3010/graphql',
            '/login/*': 'http://localhost:3010',
            '/logout': 'http://localhost:3010',
        },
        historyApiFallback: {
            index: '/',
        },
    },
};