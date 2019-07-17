import axios from 'axios'
// 打包
import JSONBig from 'json-bigint'
// 封装 配置项
const instance = axios.create({
  // 基本路径
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  // 清空token值，token 为null 找不到页面
  //   headers: {
  //     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
  //   }
  transformResponse: [(data) => {
    //  处理格式
    // data可能没有数据 null 严谨判断
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
})

// 请求拦截器 在发送axios之前获取token，设置在头部
// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 获取token
  const user = window.sessionStorage.getItem('hm-toutiao')
  // 判断
  if (user) {
    // 设置在头部
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response
}, (error) => {
  // 对响应错误做点什么
  // 判断状态码
  // error.response.status 状态码
  // 获取响应状态码做严谨处理，如果没有响应
  if (error.response && error.response.status === 401) {
    // 跳转到登录页面
    // hash是location提供，获取操作地址栏的#后面的地址的属性
    location.hash = '/login'
  }
  return Promise.reject(error)
})
export default instance
