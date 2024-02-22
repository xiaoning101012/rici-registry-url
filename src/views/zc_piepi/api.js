import appRequest from '../../utils/appRequest'
// // 获取区域option
export function getNatureQuyu(query) {
	return appRequest({
		url: '/policy/front/area-depart/area/list',
		method: 'get',
		params: query,
	})
}
// 获取政策列表
export function getZc(query) {
	return appRequest({
		url: '/policy/front/cy/company/policy/page/list/tag/id',
		method: 'get',
		params: query,
	})
}

// 通过企业id
export function companytag(query) {
	return appRequest({
		url: '/policy/front/cy/get/this/company/tag',
		method: 'get',
		params: query,
	})
}



export function pagelist(query) {
	return appRequest({
		url: '/policy/front/cy/get/company/policy/page/list',
		method: 'get',
		params: query,
	})
}