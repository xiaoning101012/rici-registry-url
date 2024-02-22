// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default
module.exports = {
	// transpileDependencies:['*'],
	transpileDependencies: process.env.NODE_ENV === "development" ? ["*"] : [],
	// 部署生产环境和开发环境下的URL。
	// 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
	// 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	// 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
	outputDir: 'dist',
	// 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
	assetsDir: 'static',
	// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	productionSourceMap: false,
	// webpack-dev-server 相关配置
	chainWebpack: config => {
		config.entry('main').add('babel-polyfill') //main.js是入口js文件 
	},
	parallel: false, // disable thread-loader, which is not compactible with this plugin
	configureWebpack: {
		plugins: [
			ScriptSetup({ /* options */ }),
		],
	},
	devServer: {
		host: '0.0.0.0',
		port: 8088,
		open: true,
		proxy: {
			// detail: https://cli.vuejs.org/config/#devserver-proxy
			[process.env.VUE_APP_BASE_API]: {
				// target: `https://www.sczwfw.gov.cn/zqsk/zstapi`,
				target: `https://sczwfww.ricitech.com:9500/zqsk/enter-api`,
				// target: `https://www.sczwfw.gov.cn`,
				// target: `http://192.168.0.21:8085`,
				// target: `http://222.128.10.207:9400/enter-api`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_API]: '',
				},
			},
		},
		disableHostCheck: true,
	},
}
