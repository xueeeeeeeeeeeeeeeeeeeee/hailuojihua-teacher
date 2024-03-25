<script setup>
import { ref } from 'vue';
import Menuleft from "./components/Menuleft.vue"
import Header from "./components/Header.vue"
import { RouterLink, RouterView } from "vue-router";
const collapsed = ref(false);
</script>
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible style="position: sticky; top: 0px; height: 100vh;">
      <Menuleft></Menuleft>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; position: sticky; top: 0px;">
        <Header></Header>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">

        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <RouterView />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

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
</style>