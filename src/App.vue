<script setup lang="ts">

</script>

<template>
    <div>
        <h1>我的vue-router测试页面</h1>
        <div>
            <!--使用 router-link 组件进行导航 -->
            <!--通过传递 `to` 来指定链接 -->
            <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
            <router-link tag="div" to="/">登录</router-link>
            <router-link tag="div" style="margin-left:200px" to="/reg">注册</router-link>
        </div>
        <hr />

        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">

</style>
