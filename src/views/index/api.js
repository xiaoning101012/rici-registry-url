import appRequest from '../../utils/appRequest'

// 根据关键字检索企业列表提示
export function zc_qiye_list(query) {
	return appRequest({
		url: '/policy/front/cy/get/company/list',
		method: 'get',
		params: query,
	})
}

// 初始值进来
export function companytag(query) {
	return appRequest({
		url: '/policy/front/cy/is/fill/in/company/tag',
		method: 'get',
		params: query,
	})
}
// 通过统一社会信用代码查询企业名称
export function companybyuniscid(query) {
	return appRequest({
		url: '/policy/front/cy/get/company/by/uniscid',
		method: 'get',
		params: query,
	})
}

// 通过统一社会信用代码查询企业名称
export function testgetsz(query) {
	return appRequest({
		url: '/policy/front/cy/hot/policy',
		method: 'get',
		params: query,
	})
}
export function interpret(query) {
	return appRequest({
		url: '/policy/front/search/interpret/list',
		method: 'get',
		params: query,
	})
}