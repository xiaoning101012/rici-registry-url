import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueCompositionAPI from '@vue/composition-api'

// Vue.use(VueCompositionAPI)
Vue.config.productionTip = false

import ElementUI from 'element-ui' // 2.1引入结构
import 'element-ui/lib/theme-chalk/index.css' // 2.2引入样式
Vue.use(ElementUI) // 3.安装

// 引入form-create 表单生成器
import formCreate from "@form-create/element-ui"

Vue.use(formCreate)

require('es6-promise').polyfill()
import { parseTime } from '@/views/home/utils.js'
// 标题
import Title from '@/views/component/Title.vue'
// 分页
import myPagination from '@/views/component/myPagination.vue'
// 旁侧返回和首页
import aside from '@/views/component/aside.vue'
// 空列表、
import Empty from '@/views/component/Empty.vue'
Vue.component('Empty', Empty)
Vue.component('Title', Title)
Vue.component('myPagination', myPagination)
Vue.component('Aside', aside)
Vue.prototype.parseTime = parseTime
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
