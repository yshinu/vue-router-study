<script setup lang="ts">
import {router} from "./router";
//字符串
const toPage = () => {
    router.push('/reg')
}
//对象
const toPage1 = () => {
    router.replace({
        path: '/reg'
    })
}
//命名
const toPage2 = () => {
    router.push({
        name: 'Reg'
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
        </div>
        <hr />

        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">

</style>
