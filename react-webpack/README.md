# 手动创建react-webpack
1, 安装webpack-dev-server，配置
    devServer: {
        contentBase: './',
        host: 'host',
        compress: true,
        port: 8080
    }
2, 自动刷新浏览器，在output里面加图publicPath: 'temp/',然后再index.html引入'./temp/index.js'