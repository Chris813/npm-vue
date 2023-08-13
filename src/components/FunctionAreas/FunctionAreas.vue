<template>
  <div>
    <el-button :icon="Download" @click="handleDownload" />
  </div>
</template>

<script setup>
import { Download } from '@element-plus/icons-vue';

const handleDownload = () => {
  
}
</script>

<style lang='scss' scoped>

.el-button {
  background-color:$dark-color;
  border: none;
  color:$light-color;
}
</style>