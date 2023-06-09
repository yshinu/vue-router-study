import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
declare module 'vue-router' {
    interface RouteMeta {
        title?: string
    }
}
const routes: Array<RouteRecordRaw> = [{
    path: "/",
    name: "登录",
    component: () => (import('../components/Login.vue')),
    meta:{
        title:"首页",
        transition:"animate__fadeIn"
    },
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
        meta:{
            title:"个人信息",
            transition:"animate__fadeIn"
        },
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
    scrollBehavior:(to, from, savedPosition)=>{
        if (savedPosition) {
            return savedPosition
        } else {
            return {top:0 }
        }
    },
    routes,

})
const whileList = ['/']

// @ts-ignore
router.beforeEach((to, from, next) => {
    document.title = <string>to.meta.title
    let token = localStorage.getItem('token')
    //白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面
    if (whileList.includes(to.path) || token) {
        //另外说一下beforeEach可以定义不止一个，vue会收集你所有定义的路由钩子，所以next的作用不应该是跳转，而是使步骤进行到下一个你定义的钩子
        next()
    } else {
        next({
            path:'/'
        })
    }
})