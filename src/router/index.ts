import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [{
    path: "/",
    name: "登录",
    component: () => (import('../components/Login.vue')),
    children:[
        {
            path : 'user1',
            name:"user1",
            component:()=>(import('../components/User1.vue'))
        },
        {
            path : 'user2',
            name:"user2",
            component:()=>(import('../components/User2.vue'))
        },
    ]
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
