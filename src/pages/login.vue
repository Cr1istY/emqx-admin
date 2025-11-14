<style scoped>

</style>
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
            <el-form ref="formRef" :model="form" class="w-[250px]" :rules="rules">
                <el-form-item prop="username">
                    <el-input class="my-1" v-model="form.username" type="username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <User/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="mb-1" v-model="form.password" type="password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Lock/> 
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" type="primary" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">

import { ref, reactive } from 'vue'
import { ElMessage, ElForm } from 'element-plus'
import { login } from '@/api/manager'

const form = reactive({
    username: '',
    password: ''
})

const rules = {
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 4, message: '密码长度不能小于4个字符', trigger: 'blur'}
    ]
}

const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const handleLogin = () => {

    formRef.value?.validate((vailed: boolean) => {
        if (!vailed) {
            ElMessage.error('请输入正确的用户名和密码')
            return
        }
        // console.log(vailed)
        login(form.username, form.password).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
            ElMessage.error("登陆失败：" + err.message)
        })
    })

}

</script>