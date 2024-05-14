<template>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="用户名">
            <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="email">
            <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item label="手机号">
            <a-input v-model:value="formState.mobileNumber" />
        </a-form-item>
        <a-form-item label="密码">
            <a-input v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="真名">
            <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="学号">
            <a-input v-model:value="formState.studentId" />
        </a-form-item>
        <a-form-item label="志愿者编号">
            <a-input v-model:value="formState.volunteerId" />
        </a-form-item>
        <a-form-item label="生日格式（xxxx-xx-xx）">
            <a-input v-model:value="formState.birthday" />
        </a-form-item>
        <a-form-item label="学校">
            <a-input v-model:value="formState.school" />
        </a-form-item>
        <a-form-item label="学院">
            <a-input v-model:value="formState.college" />
        </a-form-item>
        <a-form-item label="专业">
            <a-input v-model:value="formState.major" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">创建</a-button>
            <a-button style="margin-left: 10px">Cancel</a-button>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import API from '../api/create'
import { Moment } from 'moment';
import { defineComponent, reactive, toRaw, UnwrapRef } from 'vue';
interface FormState {
    username: string;
    email: string | undefined;
    mobileNumber: string | undefined;
    password: string;
    name: string;
    studentId: string;
    volunteerId: string;
    birthday: string;
    school: string;
    college: string;
    major: string;
}
const formState: UnwrapRef<FormState> = reactive({
    "username": "",
    "email": "",
    "mobileNumber": "",
    "password": "",
    "name": "",
    "studentId": "",
    "volunteerId": "",
    "birthday": "2003-01-31",
    "school": "",
    "college": "",
    "major": ""
});
const onSubmit = () => {
    API.volunteerRegister(formState)
        .then((res) => {
            console.log(res);
if(res.code=="101"){
    alert("创建成功")
}
        })
};


</script>