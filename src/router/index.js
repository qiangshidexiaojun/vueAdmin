import Vue from "vue"//引入vue
import VueRouter from "vue-router"//引入路由
import Login from "../component/login/Login.vue"//引入login组件
import Admin from "../component/admin/Admin.vue"//引入login组件
import Shopcart from "../component/admin/shopcart/Shopcart.vue"//引入login组件

/* 使用路由 */
Vue.use(VueRouter)

const shopcart = [{ name: "shopcart", path: 'shopcart', component: Shopcart }]

/* 暴露路由 */
export default new VueRouter({
    /* 路由规则 */
    routes: [
        { name: "login", path: "/login", component: Login },
        { name: "admin", path: "/admin", component: Admin , children:[...shopcart] },
    ]
})