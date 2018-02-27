import Vue from "vue"//引入vue
import VueRouter from "vue-router"//引入路由
import Login from "../component/login/Login.vue"//引入login组件
import Register from "../component/register/Register.vue"//引入register组件

/* 使用路由 */
Vue.use(VueRouter)

/* 暴露路由 */
export default new VueRouter({
    /* 路由规则 */
    routes: [
        { name: "login", path: "/login", component: Login },
        {path: "/register", name: "register", component: Register}
    ]
})