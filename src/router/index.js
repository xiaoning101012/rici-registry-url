import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	//政策兑现公示 http://47.103.60.144:9021/#/policyfulfillment
	//一键匹配 http://47.103.60.144:9021/#/hq_zc_piepi
	//惠企政策清单 http://47.103.60.144:9021/#/hq_zcqd
	//助企服务 http://47.103.60.144:9021/#/ZqFw
	{
		path: '/',
		name: 'Index',
		component: () => import('../views/index/index.vue'),
		meta: { title: '助企惠企服务专区' },
	},
	{
		path: '/policyMatching',
		name: 'policyMatching',
		component: () => import('../views/zc_piepi/index.vue'),
		meta: { title: '政策匹配' },
	},
	{
		path: '/matchingDetail',
		name: 'matchingDetail',
		component: () => import('../views/zc_pipei_xq/index.vue'),
		meta: { title: '匹配报告' },
	},
	{
		path: '/policyInquire',
		name: 'policyInquire',
		component: () => import('../views/zc_cx/index.vue'),
		meta: { title: '政策查询' },
	},
	{
		path: '/policyLibrary',
		name: 'policyLibrary',
		component: () => import('../views/zc_ku/index.vue'),
		meta: { title: '政策库' },
	},
	{
		path: '/selfTest',
		name: 'selfTest',
		component: () => import('../views/self_test/index.vue'),
		meta: { title: '立即自测' },
	},
	{
		path: '/basisDetail',
		name: 'basisDetail',
		component: () => import('../views/basis_detail/index.vue'),
		meta: { title: '政策依据' },
	},
	{
		path: '/policyDetail',
		name: 'policyDetail',
		component: () => import('../views/zc_xq/index.vue'),
		meta: { title: '政策详情' },
	},
	{
		path: '/enjoyWithout',
		name: 'enjoyWithout',
		component: () => import('../views/msjx/index.vue'),
		meta: { title: '免申即享' },
	},
	{
		path: '/pdfwj',
		name: 'pdfwj',
		component: () => import('../views/pdfwj/index.vue'),
		meta: { title: '预览' },
	},
	{
		path: '/pdfwj1',
		name: 'pdfwj1',
		component: () => import('../views/pdfwj/index1.vue'),
		meta: { title: '预览' },
	},
	{
		path: '/zcjd',
		name: 'zcjd',
		component: () => import('../views/zc_jd/index.vue'),
		meta: { title: '政策解读' },
	},
]

const router = new VueRouter({
	routes,
})
router.beforeEach((to, from, next) => {
	to.meta.title && (document.title = to.meta.title)
	window.scrollTo(0, 0);
	next()
})
export default router
