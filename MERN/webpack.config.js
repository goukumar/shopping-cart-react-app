
const path = require('path')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


// const htmlPlugin = new HtmlWebpackPlugin({
//     template: path.resolve('client/public/index.html'),
//     filename: "./index.html"
//   });
//const textPlugin = new ExtractTextPlugin(path.resolve('client/public/bootstrap.min.css'))
//'@babel/polyfill',
const browserConfig = {
    entry: ['babel-polyfill','./client/index.js'],
    name:'client',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'client.bundle.js',
        publicPath: '/'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: "css-loader",
                }),
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            webp: {
                                quality: 75
                            },
                            bypassOnDebug: false, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                            outputPath: 'images/'
                        }

                    },
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
         //htmlPlugin,
        new ExtractTextWebpackPlugin('style/styles.css'),
        new CopyWebpackPlugin([
            {from:'client/images',to:'images'} 
        ]), 
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        })
    ]
}

const serverConfig = {
    entry: './server/app.js',
    target: 'node',
    externals: [nodeExternals()],
    output:{
        path: path.resolve(__dirname,'bin'),   
        filename: 'server.bundle.js',
        publicPath: '/'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['bin']),
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        })
    ]

}
module.exports = [
    browserConfig, 
    serverConfig
]
