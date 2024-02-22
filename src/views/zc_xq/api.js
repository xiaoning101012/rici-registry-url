import appRequest from '../../utils/appRequest'


// 政策详情
export function getzc_xq(query) {
	return appRequest({
		url: '/policy/front/search/getPolicyContentById',
		method: 'get',
    params: query,
	})
}

// 政策解读详情
export function getzcjd_xq(query) {
	return appRequest({
		url: '/policy/front/search/getPolicyInterpretById',
		method: 'get',
    params: query,
	})
}