import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [{
    path: "/",
    name: "登录",
    component: () => (import('../components/Login.vue'))
},
    {
        path:"/reg/:id",
        name: "注册",
        component: () => (import('../components/Reg.vue'))
    }]
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
