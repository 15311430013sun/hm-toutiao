import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入路由组件
import Login from '../views/Login/index.vue'
// 导入首页路由组件
import Home from '../views/home/index.vue'
// 导入axios
import axios from 'axios'
// 导入欢迎页
import Welcome from '../views/welcome/index.vue'
// 导入404页面
import NotFound from '../views/404/404.vue'
// 挂载到原型上
Vue.prototype.$axios = axios
// 注册路由
Vue.use(VueRouter)
// 配置路由对象
const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'welcome', path: '/', component: Welcome
    }]
  },
  // 404页面写在路由最后面
  { name: '404', path: '*', component: NotFound }
  ]
})
// 导出路由
export default router
