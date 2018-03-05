import Vue from "vue"//引入vue
import VueRouter from "vue-router"//引入路由
import Login from "../component/login/Login.vue"//引入login组件
import Admin from "../component/admin/Admin.vue"//引入admin组件

import StudentCategory from "../component/admin/student/category/Category.vue"//引入学员类别组件
import StudentComment from "../component/admin/student/comment/Comment.vue"//引入学员评论
import StudentContent from "../component/admin/student/content/Content.vue"//引入学员内容

import GoodsCategory from "../component/admin/goods/categoryList/CategoryList.vue"//引入商品类别组件
import GoodsDetail from "../component/admin/goods/detailList/DetailList.vue"//引入商品详细信息组件
import GoodsAdd from "../component/admin/goods/addList/AddList.vue"//引入商品新增信息组件
import GoodsList from "../component/admin/goods/list/List.vue"//引入商品列表

/* 使用路由 */
Vue.use(VueRouter)

const student = [
    { name: "studentCategory", path: 'student/category', component: StudentCategory},
    { name: "studentComment", path: 'student/comment', component: StudentComment},
    { name: "studentContent", path: 'student/content', component: StudentContent}
];

const goods = [
    { name: "goodsCategory", path: 'goods/categoryList', component: GoodsCategory },
    { name: "goodsDetail", path: 'goods/detailList/:id', component: GoodsDetail },
    { name: "goodsAdd", path: 'goods/addList', component: GoodsAdd },
    { name: "goodsList", path: 'goods/list', component: GoodsList }
];


/* 暴露路由 */
export default new VueRouter({
    /* 路由规则 */
    routes: [
        { name: "login", path: "/login", component: Login },
        { name: "admin", path: "/admin", component: Admin, children: [...student,...goods] },
    ]
})