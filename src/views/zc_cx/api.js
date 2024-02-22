import appRequest from '../../utils/appRequest'

// 获取政策列表
export function getzc_list(query) {
	return appRequest({
		url: '/policy/front/search/page/getLikePolicyByCode',
		method: 'get',
    params: query,
	})
}
