<script setup lang="ts">
import {  RouterView } from 'vue-router'
import dayjs from 'dayjs';
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/locale/zh_CN";
dayjs.locale("zh-cn");

</script>

<template>
  <a-config-provider :locale="locale">
    <div class="divheader">
      <!-- <Header></Header> -->
    </div>
    <div class="body">
      <RouterView />

    </div>
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
