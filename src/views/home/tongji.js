import appRequest from '../../utils/appRequest'
import { parseTime } from '@/views/home/utils.js'
// 获取助企惠企主题一级菜单
export function tongji(type, modelType) {
	// 社会码
	let uniscid = sessionStorage.getItem('socialCreditCode') ? sessionStorage.getItem('socialCreditCode') : null
	let userType = null
	let username = null
	if (sessionStorage.getItem('already') == '1') {
		// 已经登录 企业：非企业
		if (uniscid && uniscid != 'undefined') {
			userType = 2
			username = sessionStorage.getItem('deptName')
		} else {
			userType = 3
			username = sessionStorage.getItem('username')
		}
	} else {
		// 未登录 游客
		userType = 1
		username = '游客'
	}
	let param = {
		crateDate: parseTime(new Date(), '{y}-{m}-{d}'),
		crateTime: parseTime(new Date(), '{h}:{i}:{s}'),
		equipment: '1',
		ip: sessionStorage.getItem('local_ip'),
		type: type,
		modelType: modelType,
		uniscid: uniscid, //社会码 企业才填
		userType: userType, //1.游客 2.企业 3.非企业
		username: username,

		// type 1.页面 2.按钮
		// modelType
		//页面：
		// 1助企惠企专区首页 2.政策库 3.免申即享
		//按钮：
		// 1.单政策
		// 2.政策查询
		// 3.政策匹配
		// 4政策工具
		// 5.完成政策自测点击量6.完成模拟申报工具
		// 7.政策日历按月查看点击量8.立即自测
		// 9.立即电报点击量
	}
	return appRequest({
		url: '/zqsk/ywtbapi/summarize',
		method: 'post',
		data: param,
	})
}
