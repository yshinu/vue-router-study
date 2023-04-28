import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [{
    path: "/",
    name: "登录",

    redirect: (to) => {
        console.log(to);
        return {
            path: '/user1',
            query: {
                name:"haha"
            } //传参
        }},
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
        path:"/reg",
        name: "注册",
        component: () => (import('../components/Reg.vue'))
    },
    {
        path: "/my",
        alias:["/root","/root2","/root3"],//别名
        components: {
            default: () => import('../components/layout/menu.vue'),
            header: () => import('../components/layout/header.vue'),
            content: () => import('../components/layout/content.vue')
        }
        },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
