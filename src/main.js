import Vue from "vue"//引入vue
import App from "./component/App.vue"//引入根组件
import vueRouter from "./router/index.js"//找到路由规则

import ElementUI from 'element-ui'//引入ui组件
import 'element-ui/lib/theme-chalk/index.css'//引入样式

Vue.use(ElementUI)

new Vue({
    el: "#app",
    render: createElement => createElement(App) ,
    router: vueRouter //注入路由      
})