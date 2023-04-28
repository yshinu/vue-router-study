# vue-router学习


## vue-router的安装与全局注册
安装
`npm install vue-router@4`
注册,createRouter接受history模式，这里用的是哈希，还接受路由信息
导出后用app.use全局注册
```vue
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
```
## 路由跳转方式
1.  如上所示使用`/path`
2. vue-router中给路由配置命名 name 属性
   * 方便在编程式导航中进行路由跳转。我们可以通过 `router.push({ name: 'routerName' }) `来进行路由跳转，这样在项目中如果有多个地方需要使用同一个路由地址时，只需要在路由配置中统一命名，并在其他地方通过 name 属性进行引用即可。
   * 
   * 在模板中使用 v-for 遍历渲染时，可以方便地根据路由名称来生成对应的链接地址。例如：`<router-link :to="{ name: 'routerName' }">Link Text</router-link>`。
   * 
   * 可以方便地进行路由匹配。当访问某个路由时，我们可以使用 route.name 属性获取当前路由的名称并进行相关处理。
   * 
   * 在开发者工具中调试时，可以方便地辨识每个路由。由于路由名称是开发者定义的，因此可以更直观地辨识每个路由，方便调试和维护。
   * 
   * 总之，路由命名 name 属性是使代码更加清晰易懂、维护性更高的一种技巧。
## 采用 replace 进行页面的跳转
会同样也会创建渲染新的 Vue 组件，但是在 history 中其不会重复保存记录，而是替换原有的 vue 组件
```vue
<router-link replace to="/">Login</router-link>
<router-link replace style="margin-left:10px" to="/reg">Reg</router-link>
```
或者
```vue
const toPage = (url: string) => {
  router.replace(url)
}
```
## 横跨历史
采用这种方法前进或后退几个历史
```vue
const next = () => {
  //前进 数量不限于1
  router.go(1)
}

const prev = () => {
  //后退
  router.back()
}
```
## Query 路由传参
```vue
const items = {
    name:"yshinu",
    age:"18",
    hobby:'抽烟'
}
const toPage1 = () => {
router.push({
path: '/reg',
query:items
})
}
```
这样地址栏就会带上参数：http://localhost:5173/#/reg?name=yshinu&age=18&hobby=抽烟，
同样跳转的页面也可以接收参数：
```vue
import { useRoute } from 'vue-router';
const route = useRoute()

//可以用这个来获取参数
route.query?.xxx

```
## 动态路由传参
路由这样：
```vue
    {
        path:"/reg/:id",
        name: "注册",
        component: () => (import('../components/Reg.vue'))
    }
```
传参这样：
```vue
const toPage2 = () => {
    router.push({
     name: '注册',
      params:{
      id:items.id
    }
  })
}
```
浏览器：`http://localhost:5173/#/reg/114514`

## 二者区别
* query 传参配置的是 path，而 params 传参配置的是 name，在 params 中配置 path 无效
* query 在路由配置不需要设置参数，而 params 必须设置
* query 传递的参数会显示在地址栏中
* params 传参刷新会无效，但是 query 会保存传递过来的值，刷新不变 ;
* 路由配置

## 嵌套路由
在路由中增加一个子路由,子路由的path前面不要加/
```vue
{
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
}
```
在`'../components/Login.vue'`里面不要忘记加` <router-view/>`了，这样访问/login/user1就可以显示user1的内容了