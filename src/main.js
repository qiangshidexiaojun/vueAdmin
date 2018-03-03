import Vue from "vue"//引入vue
import App from "./component/App.vue"//引入根组件
import vueRouter from "./router/index.js"//找到路由规则

import ElementUI from 'element-ui'//引入ui组件
import 'element-ui/lib/theme-chalk/index.css'//引入样式

import 'normalize.css'//引入初始化样式库

import axios from "axios"//引入axios类库
import api, { domain } from "./js/api.js"//加载变量

import "./less/index.less" //引入全局less

import Vuex from "vuex" //引入组件通信管理插件

import { store } from './js/store.js' // 使用{}引入store实例，因为store是一个const变量

/* 导入富文本编辑样式 */
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor'

// 配置默认域名, 这样请求的时候就不用在url里加域名了
axios.defaults.baseURL = domain;
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;

Vue.prototype.$http = axios;
Vue.prototype.$api = api;

Vue.use(ElementUI)
Vue.use(VueQuillEditor)

new Vue({
    el: "#app",
    render: createElement => createElement(App),
    router: vueRouter, //注入路由 
    store,
})

export default{
    components: {
        quillEditor: VueQuillEditor
    }
}

vueRouter.beforeEach((to, from, next) => {
    /* to要进入的路由 */
    /* from要离开的路由 */
    /* next调用这个方法才能执行后续操作 */
    /* console.log(to);
    console.log(from);
    console.log(next);
    next(); */
    axios.get(api.islogin).then(res => {
        if (to.path == "/login"){
            next();
        }  
        if (to.path == "/admin" && from.path == "/login"){
            location.href = "http://localhost:8080/#/login";
        }
        if (res.data.code == "logined") {
            next();
        } 
    });
})