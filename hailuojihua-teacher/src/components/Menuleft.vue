<template>
    <div class="Menuleft">

        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="1">
                <AlignRightOutlined /> 
                <span>主页</span>
            </a-menu-item>
            <a-menu-item key="2">
                <IdcardOutlined />
                <span>用户</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
                <template #title>
                    <span>
                        <BookOutlined />
                        <span>政策</span>
                    </span>
                </template>
                <a-menu-item key="3">总览</a-menu-item>
                <a-menu-item key="4">统计</a-menu-item>

            </a-sub-menu>
            <a-sub-menu key="sub2">
                <template #title>
                    <span>
                        <GlobalOutlined />
                        <span>爬虫</span>
                    </span>
                </template>
                <a-menu-item key="6">总览</a-menu-item>
                <a-menu-item key="7">最新数据</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>
<script setup lang="ts">
import { AlignRightOutlined,IdcardOutlined,BookOutlined,GlobalOutlined  } from '@ant-design/icons-vue';
import { ref,watch } from 'vue';
import { useRouter } from 'vue-router';
const selectedKeys = ref(['1']);
const router = useRouter();
watch(selectedKeys, (newVal, oldVal) => {
    console.log(newVal[0]);
    if(newVal[0]==='1'){
        router.push('/');
    }else if(newVal[0]==='2'){
        router.push('/user');
    }else if(newVal[0]==='3'){
        router.push('/allpolicy');
    }else if(newVal[0]==='4'){
        router.push('/policystatistics');
    }else if(newVal[0]==='5'){
        router.push('/user');
    }else if(newVal[0]==='6'){
        router.push('/spider');
    }else if(newVal[0]==='7'){
        router.push('/newpolicy');
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
::v-deep .ant-menu-title-content{
    /* display: flex;
    justify-content: center;
    align-items: center; */
    
}
</style>