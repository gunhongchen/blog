module.exports = {
    // 相当于webpack-dev-server，对本地服务器进行配置 
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                ws: true,
                // pathRewrite: {
                //     "^/api": '/api'
                // }
            }
        },
        disableHostCheck: true
    },
    runtimeCompiler: true
}