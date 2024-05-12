
<template>
  <div class="Header">
    <div class="Header-left">
      hailuojihua
    </div>
    <div class="Header-right">
      <a-button @click="logout">退出登录</a-button>
<!-- <img src="../assets/dog.jpg" alt=""> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const logout=()=>{
  localStorage.clear();
  router.push('/login')
}
</script>
<style scoped>
.Header {
  box-sizing: border-box;
  padding: 0px 100px 0px  ;
  width: 100%;
  height: 100%;
  display: flex;
justify-content: space-between;
}
.Header-right{

  height: 40px;
  width: 40px;
}
.Header-right img{
  width: 100%;
  height: 100%;
  border-radius:50% ;
}
</style>
