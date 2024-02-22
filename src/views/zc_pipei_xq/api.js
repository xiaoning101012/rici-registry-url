import appRequest from '../../utils/appRequest'
// 匹配报告
// 政策详情
export function getZc_xq(query) {
	return appRequest({
		url: '/policy/front/cy/policy/info',
		method: 'get',
		params: query,
	})
}

// 通过企业id
export function policyindex(query) {
	return appRequest({
		url: '/policy/front/cy/select/policy/index',
		method: 'get',
		params: query,
	})
}

// 通过企业id
export function indextagid(query) {
	return appRequest({
		url: '/policy/front/cy/select/policy/index/tag/id',
		method: 'get',
		params: query,
	})
}

