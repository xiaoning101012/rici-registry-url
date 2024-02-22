import appRequest from '../../utils/appRequest'
// import appRequestTest from '../../utils/appRequestTest'
import vuex from '../../store/index'
// // 获取资质
export function getNature(query) {
	return appRequest({
		url: '/policy/front/cy/nature/name',
		method: 'get',
		params: query,
	})
}
// // 获取区域option
// export function getNature_quyu(id) {
// 	return appRequest({
// 		url: '/zqsk/common/common/region/item/' + id,
// 		method: 'get',
// 	})
// }
// // 获取部门
// export function getNature_bumen(id) {
// 	return appRequest({
// 		url: '/zqsk/common/common/department/addressId/' + id,
// 		method: 'get',
// 	})
// }
// 获取政策库
export function getzck(query) {
	return appRequest({
		url: '/policy/front/search/data/list',
		method: 'get',
		params: query,
	})
}
// // 获取政策详情
// export function getzc_xq(id) {
// 	return appRequest({
// 		url: '/zqsk/zstapi/zstapi/manager/data/policy/getByPolicy/' + id,
// 		method: 'get',
// 	})
// }


// 日期格式化
function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/')
		}
		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

// 统计
export function tongji(data) {
	let params = {}
	if (vuex.state.userInfo.type == 'manager') {
		// 登录是企业
		params.typeUser = 3
	} else if (vuex.state.userInfo.type == 'user') {
		// 个人登录
		params.typeUser = 1
	} else {
		// 游客
		params.typeUser = 0
	}
	if (params.typeUser != 0) {
		// 用户名
		params.username = vuex.state.userInfo.encodeRealName
		// 身份证号
		params.idCard = vuex.state.userInfo.encodeIdNumber
	} else {
		// 用户名
		params.username = null
		// 身份证号
		params.idCard = null
	}
	params.createTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
	params = {
		...params,
		...data,
	}
	return appRequestTest({
		url: '/records/add',
		method: 'post',
		data: params,
	})
}
