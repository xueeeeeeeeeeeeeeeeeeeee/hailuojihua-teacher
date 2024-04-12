<script setup lang="ts">
import { RouterView } from 'vue-router'
import dayjs from 'dayjs';
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

</script>

<template>

  <RouterView />

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
