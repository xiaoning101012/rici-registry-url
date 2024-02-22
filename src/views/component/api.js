import appRequest from '../../utils/appRequest'

// 政策匹配-分组获取企业所有标签
export function companyTag(query) {
	return appRequest({
		url: '/policy/front/cy/get/all/company/tag',
		method: 'get',
		params: query,
	})
}

export function updatecompanytag(data) {
  return appRequest({
    url: '/policy/front/cy/add/or/update/company/tag',
    method: 'POST',
    data
  })
}

// // 获取区域option
export function getNatureQuyu(query) {
	return appRequest({
		url: '/policy/front/area-depart/area/list',
		method: 'get',
		params: query,
	})
}
