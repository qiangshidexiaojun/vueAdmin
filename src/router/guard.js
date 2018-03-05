import axios from 'axios';
import api from '../js/api.js';

// 导出一个全局的路由守卫对象
export default function (to, from, next) {
    axios.get(api.islogin).then(res => {
        let isLogin = false;

        // 已登陆
        if (res.data.code == 'logined') {
            isLogin = true;
        }

        // 如果访问登陆页面
        // 已登陆 => 为了用户友好体验, 自动跳转到后台管理
        // 未登陆 => 允许访问登陆页面
        if (to.name == 'login') {
            if (isLogin) {
                next({ name: 'admin' });
            } else {
                next();
            }
        }

        // 如果访问后台页面
        // 已登陆 => 允许访问后台页面 
        // 未登陆 => 禁止访问, 自动跳转到登陆页面
        if (to.name != 'login') {
            if (isLogin) {
                next();
            } else {
                next({ name: 'login' ,query: {next: to.fullPath}});
            }
        }
    });
};