// import appRequest from '../../utils/appRequest'
import appRequestTest from '../../utils/appRequestTest'
// // 获取资质
// export function getNature(query) {
// 	return appRequest({
// 		url: '/zqsk/zstapi/zstapi/user/common/getNature',
// 		method: 'get',
// 		params: query,
// 	})
// }
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
// // 获取政策库
// export function getzck(query) {
// 	return appRequest({
// 		url: '/zqsk/zstapi/zstapi/manager/data/policy/pageList',
// 		method: 'get',
// 		params: query,
// 	})
// }
// // 获取政策详情
// export function getzc_xq(id) {
// 	return appRequest({
// 		url: '/zqsk/zstapi/zstapi/manager/data/policy/getByPolicy/' + id,
// 		method: 'get',
// 	})
// }

// 本地获取市州
export function testgetsz(query) {
	return appRequestTest({
		url: '/interfaceIntegration/pageList',
		method: 'get',
		params:query
	})
}