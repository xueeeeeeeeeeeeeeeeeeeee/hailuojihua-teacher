<template>
    <div class="Menuleft">

        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="1">
                <AlignRightOutlined />
                <span>主页</span>
            </a-menu-item>
            <a-menu-item key="2" v-if="!ismanager">
                <IdcardOutlined />
                <span>学生管理</span>
            </a-menu-item>
            <a-menu-item key="3" v-if="!ismanager">
                <ExclamationCircleOutlined />
                <span>敏感词管理</span>
            </a-menu-item>
            <a-menu-item key="4" v-if="ismanager">
                <ExclamationCircleOutlined />
                <span>志愿者导入与上班时间导入</span>
            </a-menu-item>
        </a-menu>
    </div>
</template>
<script setup lang="ts">
import { AlignRightOutlined, IdcardOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import {useAuthStore} from '../store/index'
const ismanager=useAuthStore().ismanager;
const selectedKeys = ref(['1']);
const router = useRouter();
watch(selectedKeys, (newVal) => {
    console.log(newVal[0]);
    if (newVal[0] === '1') {
        router.push('/');
    } else if (newVal[0] === '2') {
        router.push('/student');
    } else if (newVal[0] === '3') {
        router.push('/dangerouswords');
    }  else if (newVal[0] === '4') {
        router.push('/volunteer');
    } 

});
</script>
<style scoped>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}

::v-deep .ant-menu-title-content {
    /* display: flex;
    justify-content: center;
    align-items: center; */

}
</style>