import Vue from 'vue'
import App from './App.vue'
// 导入ui包
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import router from '@/router'
// 导入axios
import axios from '../src/api/axios.js'
// 导入面包屑插件
import components from '../src/components/index.js'
// 注册组件
Vue.use(components)
// 挂载到原型上
Vue.prototype.$axios = axios
// 注册组件
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  // 配置路由
  router,
  render: h => h(App)
}).$mount('#app')
