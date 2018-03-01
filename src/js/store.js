import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        //填充用于管理状态的共享变量
        isCollapse: false,
        width: 200
    },
    mutations: {
        increment(state) {
            state.isCollapse = !state.isCollapse;
        },
        changeWidth(state){
            state.width = state.width == 200 ? 64 : 200;
        }
    },
    actions: {
        increment(context){
            context.commit("increment");
        },
        changeWidth(context){
            context.commit("changeWidth");
        }
    },
    getters: {
        isCollapse(state){
            return state.isCollapse;
        },
        width(state){
            return state.width;
        }
    }
})

