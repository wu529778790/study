var path = require('path')
var IP = require('ip')
const ip = IP.address()

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'temp/'
    },
    devServer: {
        contentBase: './',
        host: ip,
        compress: true,
        port: 8080
    },
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: 'babel-loader',
            query: {
                presets: ['2015', 'react']
            }
        }
    ]
}