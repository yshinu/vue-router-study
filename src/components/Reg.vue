<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
    <h1>这里是注册</h1>
    <ul>
        <li v-for="i in route.query" :key='i'>我的信息：{{i}}</li>
    </ul>
</template>

<style scoped lang="scss">

</style>