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
