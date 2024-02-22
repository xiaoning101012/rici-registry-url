import axios from 'axios'
// import store from "@/store";
// import { Notification, MessageBox, Message, Loading } from 'element-ui'

const appRequestTest = axios.create({
	baseURL: 'https://www.sczwfw.gov.cn/zqsk/hqcy/',
	// baseURL: 'http://192.168.0.21:8085',
	timeout: 10000,
})
appRequestTest.interceptors.request.use(
	(config) => {
		config.headers['Content-Type'] = 'application/json;charset=utf-8'
		// let res = store.state.token;
		// if (res) {
		//   config.headers["token"] = res.data;
		// }
		//权限验证不通过
		// if (res.code == 401 || res.code == '401') {
		// 	alert('无效token，请重新登录')
		// }
		// get请求映射params参数
		if (config.method === 'get' && config.params) {
			let url = config.url + '?'
			for (const propName of Object.keys(config.params)) {
				const value = config.params[propName]
				var part = encodeURIComponent(propName) + '='
				if (value !== null && typeof value !== 'undefined') {
					if (typeof value === 'object') {
						for (const key of Object.keys(value)) {
							let params = propName + '[' + key + ']'
							var subPart = encodeURIComponent(params) + '='
							url += subPart + encodeURIComponent(value[key]) + '&'
						}
					} else {
						url += part + encodeURIComponent(value) + '&'
					}
				}
			}
			url = url.slice(0, -1)
			config.params = {}
			config.url = url
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

appRequestTest.interceptors.response.use(
	(response) => {
		let res = response.data
		if (res.code == 401 || res.code == '401') {
			// Message({
			// 	message: res.msg,
			// 	type: 'error',
			// })
			console.log(error)
		}

		if (res.code == 600 || res.code == '600') {
			// Message({
			// 	message: res.msg,
			// 	type: 'error',
			// })
			console.log(error)
		}
		// 如果返回的是文件
		if (response.config.responseType === 'blob') {
			return res
		}

		//兼容服务端返回的字符串数据
		// if (typeof res === 'string') {
		// 	res = res ? JSON.parse(res) : res
		// }
		return res
	},
	(error) => {
		// Message({
		// 	message: error.msg,
		// 	type: 'error',
		// })
		console.log(error)
		return Promise.reject(error)
	}
)

export default appRequestTest
