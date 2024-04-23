<template>
  <!-- <a-drawer title="该学生海螺" placement="right" :closable="false" v-model:open="visible"
        width="50%">
        <hailuo></hailuo>
    </a-drawer> -->
  <div>
    xxxxxx1
  </div>
</template>
<script lang="ts" setup>
import api from '../api/create'
import { ref, onMounted } from 'vue';

onMounted(() => {
  api.readOnehailuo(1).then((res) => {
    console.log(res);

  });
})


</script>