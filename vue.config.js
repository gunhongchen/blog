
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

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
        const plugins = [
            new BundleAnalyzerPlugin()
        ];
        if (process.env.NODE_ENV === 'production') {
            const plugin = new CompressionPlugin({
                test: /\.(js|css)$/,// 匹配文件名
            });
            plugins['push'](plugin)
        }
        return {
            plugins,
            externals: {
                'element-ui': 'ELEMENT',
                'vue': 'Vue',
            }
        }
    },
    chainWebpack(config) {
        const cdn = {
            css: [
                // element-ui css
                'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
            ],
            js: [
                // vue must at first!
                'https://unpkg.com/vue/dist/vue.js',
                // element-ui js
                'https://unpkg.com/element-ui/lib/index.js'
            ]
        }
        config.plugin('html')
            .tap(args => {
                args[0].cdn = cdn
                return args
            })
    }
}