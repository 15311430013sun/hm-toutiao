import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入路由组件
import Login from '../views/Login/index.vue'
// 导入首页路由组件
import Home from '../views/home/index.vue'
// 导入欢迎页
import Welcome from '../views/welcome/index.vue'
// 导入404页面
import NotFound from '../views/404/404.vue'
// 导入内容管理组件
import Article from '../views/article/index.vue'
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
    // name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'welcome',
      path: '/',
      component: Welcome
    },
    { name: 'article', path: '/article', component: Article }
    ]
  },

  // 404页面写在路由最后面
  {
    name: '404',
    path: '*',
    component: NotFound
  }
  ]
})
// 设置全局导航守卫  判断是否有koten值
router.beforeEach((to, from, next) => {
  // // 如果是登录页面放行
  // if (to.path === '/login') return next()
  // // 判断登录状态  现获取toke
  // const user = window.sessionStorage.getItem('hm-toutiao')
  // if (user) {
  //   next()
  // } else {
  //   next('/login')
  // }
  const user = window.sessionStorage.getItem('hm-toutiao')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
// 导出路由
export default router
