<script setup lang="ts">
import {router} from "./router";
//字符串
const items = {
    name:"yshinu",
    age:"18",
    hobby:'抽烟',
    id:'114514'
}
const toPage = () => {
    router.push('/reg')
}
//对象
const toPage1 = () => {
    router.push({
        path: '/reg',
        query:items
    })
}
//http://localhost:5173/#/reg?name=yshinu&age=18&hobby=抽烟
//命名
const toPage2 = () => {
    router.push({
        name: '注册',
        params:{
            id:items.id
        }
    })
}
</script>

<template>
    <div>
        <h1>我的vue-router测试页面</h1>
        <div>
            <router-link tag="div" to="/">登录</router-link>
            <router-link tag="div" style="margin-left:200px" to="/reg">注册</router-link>
            <button @click="toPage1">点我去reg</button>
            <button @click="toPage2">动态传参</button>
        </div>
        <hr />
        <router-view v-slot="{route,Component}">
            <transition  :enter-active-class="`animate__animated ${route.meta.transition}`">
                <div :key="route.meta.title">
                    <component :is="Component"></component>
                </div>
            </transition>
        </router-view>

        <router-view name="header"></router-view>
        <router-view name="content"></router-view>
    </div>
</template>

<style scoped lang="scss">

</style>
