
import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
//导入路由组件
import Login from '../views/Login/index.vue'
//注册路由
Vue.use(VueRouter)
//配置路由对象
const router = new VueRouter({
    routes:[
        {name:'login',path:'/login',component:Login}
    ]
})
//导出路由
export default router