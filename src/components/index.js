// 导入面包屑组件
import MyBread from '../../src/components/my-bread.vue'

// 面包屑插件
export default {
  install (Vue) {
    // 注册组件
    Vue.component(MyBread.name, MyBread)
  }
}
