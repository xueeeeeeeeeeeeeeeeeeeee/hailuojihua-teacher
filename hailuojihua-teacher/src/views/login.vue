<template>
    <div class="login-container">
        <a-card class="login-card">
            <h2 class="login-title">海螺计划教学教师后台</h2>
            <a-form :model="loginForm" :rules="rules" label-width="80px" class="login-form">
                <a-form-item label="学校" name="schoolId">
                    <a-input v-model:value="loginForm.schoolId" placeholder="请输入学校ID"></a-input>
                </a-form-item>
                <a-form-item label="用户名" name="userid">
                    <a-input v-model:value="loginForm.userid" placeholder="请输入用户名"></a-input>
                </a-form-item>
                <a-form-item label="密码" name="password">
                    <a-input v-model:value="loginForm.password" placeholder="请输入密码" type="password"></a-input>
                </a-form-item>
                <a-form-item label="密码" name="className" v-if="false">
                    <a-input v-model:value="loginForm.className" placeholder="请输入密码"></a-input>
                </a-form-item>
                <!-- 按钮居中 -->
                <a-button type="primary" @click="handleLogin" style="margin: 0 auto; width: 100%;">登录后台管理系统</a-button>
            </a-form>
        </a-card>
    </div>
</template>
<script lang="ts" setup>
import api from '../api/create'
import { ref } from 'vue'
import router from '../router/index'
import { useAuthStore } from '../store/index'
const AuthStore = useAuthStore();
interface LoginForm {
    userid: string;
    password: string;
    schoolId: string;
    className: string;
}
const loginForm = ref<LoginForm>({
    userid: '',
    password: '',
    schoolId: '',
    className: '教师'
});
const handleLogin: any = () => {
    let x=0;
    console.log(loginForm.value);
    api.managelogin({
        username: loginForm.value.userid,
        password: loginForm.value.password,
    }).then((res) => {
        console.log(res);
        if (res.msg == "管理员登录成功") {
            AuthStore.manage();
            x=1;
            localStorage.setItem("token", res.data.token)
        // console.log(localStorage.getItem('token'));

        router.push('/');
        }

    })
if(x==1){    
    api.login({
        username: loginForm.value.userid,
        className: loginForm.value.className,
        password: loginForm.value.password,
        schoolId: parseInt(loginForm.value.schoolId)
    }).then((res) => {
        console.log(loginForm.value);
        if (res.msg == "管理员登录成功") {
            AuthStore.manage();
        }
        console.log(res);
        localStorage.setItem("token", res.data.token)
        // console.log(localStorage.getItem('token'));

        router.push('/');
    })
}


}

const rules: any = {
    schoolId: [
        { required: true, message: '请输入学校ID', trigger: 'blur' }
    ],
    userid: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}





</script>
<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../assets/back.jpg');
}

/* 其他样式保持不变 */
.login-card {
    width: 400px;
    padding: 20px;
    border-radius: 10px;
}

.login-title {
    text-align: center;
    margin-bottom: 10px;
}

.login-form {
    width: 100%;
}

.qr-code {
    text-align: center;
    margin-top: 5px;
}

.qr-code img {
    width: 200px;
    height: 200px;
}
</style>