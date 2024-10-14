
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
                // ws: true,
                // pathRewrite: {
                //     "^/api": '/api'
                // }
            }
        },
        // disableHostCheck: true
    },
    runtimeCompiler: true,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    plugins: [
                        require('autoprefixer'),
                        require('tailwindcss')
                    ],
                },
                sourceMap: true,
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
            // plugins,
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
                'https://lib.baomitu.com/element-ui/2.13.0/theme-chalk/index.css'
            ],
            js: [
                // vue must at first!
                'https://lib.baomitu.com/vue/2.6.10/vue.min.js',
                // element-ui js
                'https://lib.baomitu.com/element-ui/2.13.0/index.js'
            ]
        }
        config.plugin('html')
            .tap(args => {
                args[0].cdn = cdn
                return args
            })
    }
}
