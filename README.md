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

## 命名视图
在Vue.js中，vue-router是一个官方的路由库，用于构建单页应用程序。命名视图是一种将多个组件同时渲染到同一个路由匹配的位置的技术。它允许您在同一个页面上同时渲染多个视图。当您需要同时显示多个相关联的组件时，这非常有用。

这样设置路由
```vue
    {
        path: "/my",
        components: {
            default: () => import('../components/layout/menu.vue'),
            header: () => import('../components/layout/header.vue'),
            content: () => import('../components/layout/content.vue')
        }
        }
```
默认展示default内容，想展示其余的可以用
```vue
 <router-view name="header"></router-view>
    <router-view name="content"></router-view>
```
类似具名插槽

## 重定向和别名
加个redirect:"/user1",就可以在访问‘/’时直接定向到‘/user1’
```vue
{
    path: "/",
    name: "登录",
    redirect:"/user1",
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
```

redirect也可以写成这样： `redirect: { path: '/user1' }, 或者 name: 'user1'`
当然redirect页可以传参，像这样：
```vue
 redirect: (to) => {
            console.log(to) //可以查看父级内容
            return {
                path: '/user1',
                query: to.query //将父级参数传递，或者自定义参数，例如{name:"happy"}
            }
```
别名，意味着你访问/root以及"/root2","/root3"都会自动访问‘/my’
```vue
{
        path: "/my",
        alias:["/root","/root2","/root3"],//别名
        components: {
            default: () => import('../components/layout/menu.vue'),
            header: () => import('../components/layout/header.vue'),
            content: () => import('../components/layout/content.vue')
        }
```

## 路由守卫
```vue
router.beforeEach((to, form, next) => {
    console.log(to, form);
    next()
})
```
* to: Route， 即将要进入的目标 路由对象；
* from: Route，当前导航正要离开的路由；
* next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
* next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
* next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

### 鉴权登录
前置全局守卫`beforeEach`
如果有token或者在白名单里就可以直接跳否则返回主页
```vue
const whileList = ['/']
 
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (whileList.includes(to.path) || token) {
        next()
    } else {
        next({
            path:'/'
        })
    }
})
```
这里next()，不一定时跳转下一个页面，它是一个hook在意在这个时候执行其他内容
后置全局守卫`afterEach`
```vue
router.afterEach((to, from) => {
    Vnode.component?.exposed?.endLoading()
})
```

## 小案例：登录
用element plus的form表单坐验证，登录后会给localstorge存token
```vue
<el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="formInline">
        <el-form-item label="账号" prop="user">
            <el-input v-model="formInline.user" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="formInline.password" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
    </el-form>

```
```vue
const ruleFormRef = ref()
const formInline = reactive({
user: '',
password: '',
})
const rules = reactive<FormRules>({
user: [
{required: true, message: '请输入用户名', trigger: 'blur'},
{min: 1, max: 5, message: '用户名应为1-5位', trigger: 'blur'},
],
password: [
{
required: true,
message: '请输入密码',
trigger: 'change',
},
],
})
const onSubmit = () => {
ruleFormRef.value?.validate((validate) => {
if (validate) {
router.push('/my')
localStorage.setItem('token', '1')
} else {
ElMessage.error('请输入完整')
}
})

}
```

## 路由元信息
通过路由记录的  meta  属性可以定义路由的元信息。使用路由元信息可以在路由中附加自定义的数据。

作用：
* 权限校验标识。
* 路由组件的过渡名称。
* 路由组件持久化缓存 (keep-alive) 的相关配置。
* 标题名称
```vue
  routes: [
    {
      path: '/',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: "登录"
      }
    },
```

修改当前页面标题：
```vue
  routes: [
    {
      path: '/',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: "登录"
      }
    },
```