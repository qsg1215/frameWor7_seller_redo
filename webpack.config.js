var path = require('path');
var webpack = require("webpack");
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: './main_android.js',
        vendor: ['framework7', 'moment', 'axios', 'md5-hex','pinyin','echarts']
    },//入口文件
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].[chunkHash:8].js",
        publicPath: './dist/',
        chunkFilename: "[name].[chunkHash:8].js",
       /* // filename: 'bundle'+new Date().getTime()+'.js',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        chunkFilename: "[chunkhash][name].js",
        chunkLoadTimeout:120000,*/
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'es6'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'index_android.html',
            inject:true,
            title:'webpack is good',
            chunks:['main']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
    ],
  resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
      extensions: ['.js', '.json', '.coffee']
  },
    devServer: {
        inline:true,
        publicPath: "/dist/"
    }
}