<template>
    <el-row class=" min-h-screen bg-light-blue-500">
        <el-col :lg="16" :md="12" class=" flex items-center justify-center">
            <div>
                <div class="font-bold text-5xl text-light-50 mb-4">
                    欢迎👏
                </div>
                <div class="text-gray-200 text-sm">
                    传感器信息管理（重庆邮电大学节点设计）
                </div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="bg-light-50 flex items-center justify-center flex-col">
            <h2 class="font-bold text-3xl text-gray-800">
                请登陆
            </h2> 
            <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
                <span class="h-[1px] w-16 bg-gray-200"></span>
                <span>账号密码登录</span>
                <span class="h-[1px] w-16 bg-gray-200"></span>
            </div>
            <el-form :model="form" class="w-[250px]">
                <el-form-item>
                    <el-input class="my-1" v-model="form.username" type="username" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="mb-1" v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" type="primary" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">

import { reactive } from 'vue'
import { ElMessage } from 'element-plus';
const form = reactive({
    username: '',
    password: ''
})

const handleLogin = () => {
    if (!form.username || !form.password) {
        ElMessage.warning('请填写用户名和密码')
        return
    }
    if (form.username === 'admin' && form.password === 'admin') {
        ElMessage.success('登陆成功')
        localStorage.setItem('token', 'admin')
        localStorage.setItem('username', 'admin')
        localStorage.setItem('password', 'admin')
        localStorage.setItem('role', 'admin')
        localStorage.setItem('avatar', 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534')
    }
    console.log(form)
}

</script>