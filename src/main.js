import Vue from 'vue'
import App from './App.vue'
//导入ui包
import ElementUI from 'element-ui'
//引入样式 
import 'element-ui/lib/theme-chalk/index.css'
//引入路由
import router from '@/router'
//注册组件
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  //配置路由
  router,
  render: h => h(App)
}).$mount('#app')
