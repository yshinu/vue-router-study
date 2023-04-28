<script setup lang="ts">
import {reactive, ref} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {router} from "../router";
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
</script>

<template>
    <h1>这里是登录</h1>
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

</template>

<style scoped lang="scss">

</style>