import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes:Array<RouteRecordRaw> = [{
    path : "/",
    component:()=>(import('../components/Login.vue'))
},
    {
        path : "/reg",
        component:()=>(import('../components/Reg.vue'))
    }]
export const router = createRouter({
    history:createWebHashHistory(),
    routes
})
