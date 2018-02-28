import Vue from "vue"//引入vue
import App from "./component/App.vue"//引入根组件
import vueRouter from "./router/index.js"//找到路由规则

import ElementUI from 'element-ui'//引入ui组件
import 'element-ui/lib/theme-chalk/index.css'//引入样式

import 'normalize.css'//引入初始化样式库

import axios from "axios"//引入axios类库
import api, { domain } from "./js/api.js"//加载变量

import "./less/index.less" //引入全局less

// 配置默认域名, 这样请求的时候就不用在url里加域名了
axios.defaults.baseURL = domain;
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;

Vue.prototype.$http = axios;
Vue.prototype.$api = api;

Vue.use(ElementUI)

new Vue({
    el: "#app",
    render: createElement => createElement(App),
    router: vueRouter //注入路由      
})