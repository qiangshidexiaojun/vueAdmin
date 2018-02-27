var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname, "dist"),
        // publicPath: "/dist",
        filename: "bundle_[chunkhash:8].js"//每次运行都生成一个随机名,确保不会缓存
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',// 自动注入js到什么地方
        })
    ],
    module: {
        rules: [
            // 配置的是用来解析.css文件的loader(style-loader和css-loader)
            {
                // 1.0 用正则匹配当前访问的文件的后缀名是  .css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
            },
            // 解析less规则的
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            //解析scss规则的
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            },
            /* 解析字体图标的 */
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50
                    }
                }]
            },
            /* babel打包js的 */
            {
                test: /\.js$/,
                // Webpack2建议尽量避免exclude，更倾向于使用include
                exclude: /(node_modules)/, // node_modules下面的.js文件会被排除
                // include: [path.resolve(__dirname, 'src')],
                use: {
                    loader: 'babel-loader'
                }
            },
            /* 解析vue单文件的 */
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
}