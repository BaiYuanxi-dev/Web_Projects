//引用html-webpack-plugin插件，作用是根据html模板在内存生成html文件，它的工作原理是根据模板文件在内存中生成一个index.html文件。
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
module.exports={
    target: "node",
    entry:'./app.js',  //指定打包的入口文件
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks:['dist/js/index'],
            filename: 'public/index.html',
            template: 'public/index.html'
        })
    ],
    devtool: 'eval-source-map',    //映射生成文件与源文件，调试时可以看到源代码
    
}
