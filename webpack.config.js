var path = require('path');
var webpack = require("webpack");
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './main_android.js'
    },//入口文件
    output: {
        // filename: 'bundle'+new Date().getTime()+'.js',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        chunkFilename: "[chunkhash][name].js",
        chunkLoadTimeout:120000,
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
        })
    ],
  resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
      extensions: ['.js', '.json', '.coffee']
  },
    devServer: {
        inline:true,
        publicPath: "/dist/"
    }
}