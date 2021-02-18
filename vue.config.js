
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // 相当于webpack-dev-server，对本地服务器进行配置 
    devServer: {
        proxy: {
            "/api": {
                // target: "http://www.blog.chaikd.com",
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
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('tailwindcss'),
                    require('autoprefixer')
                ]
            }
        }
    },
    configureWebpack: config => {
        return {
            plugins: [
                new BundleAnalyzerPlugin()
            ],
            externals: {
                'element-ui': 'ELEMENT',
                'vue': 'Vue',
            }
        }
    }
}