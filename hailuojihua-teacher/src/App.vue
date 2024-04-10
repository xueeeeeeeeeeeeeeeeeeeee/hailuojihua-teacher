<script setup lang="ts">
import { ref } from 'vue';
import {  RouterView } from 'vue-router'
import dayjs from 'dayjs';
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/locale/zh_CN";
import Menuleft from "./components/Menuleft.vue"
import Header from "./components/Header.vue"
dayjs.locale("zh-cn");
const collapsed = ref(false);

</script>

<template>
  <a-config-provider :locale="locale">
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
  </a-config-provider>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}

.divheader {
  width: 100%;
  height: 6vh;
  position: sticky;
  top: 0px;
  z-index: 999;
}

.body {
  height: 94vh;
  min-width: 100%;
}
</style>
