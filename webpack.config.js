const {version} = require('./package');
const webpack = require('webpack');

module.exports = {

    entry: './src/widgetify.js',

    output: {
        path: `${__dirname}/dist`,
        publicPath: 'dist/',
        filename: 'widgetify.min.js',
        library: 'Widgetify',
        libraryExport: 'default',
        libraryTarget: 'umd'
    },

    devServer: {
        contentBase: `${__dirname}/`,
        host: '0.0.0.0',
        port: 3002
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: 'widgetify.min.js.map'
        }),

        new webpack.BannerPlugin({
            banner: `Widgetify ${version} MIT | https://github.com/Simonwep/widgetify`
        })
    ]
};
