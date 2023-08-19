<template>
  <div>
    <el-button :icon="Download" @click="handleDownload" />
  </div>
</template>

<script setup>
import { Download } from '@element-plus/icons-vue';
import { handelSvgZoom } from '@/utils/index';
import { getTranslate } from '@/utils/index';
import pubsub from 'pubsub-js';
let svgElement;
let translate;

const handleDownload = () => {
  console.log(svgElement);
  const newSvgElement = handelSvgZoom(svgElement, 'graph', translate);
  // 获取 <svg> 元素的内容
  const svgContent = new XMLSerializer().serializeToString(newSvgElement);
  // 创建 Blob 对象
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  // 创建链接元素
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  // 设置下载属性
  downloadLink.download = 'dependency.svg';
  // 触发链接的点击事件，从而触发下载
  downloadLink.click();
  // 清理创建的 Blob 对象
  URL.revokeObjectURL(downloadLink.href);
};

onMounted(() => {
  pubsub.subscribe('renderDone', (event, val) => {
    if (val === true) {
      svgElement = document.querySelector('#graph svg');
      translate = getTranslate(svgElement, 'graph');
      console.log(`mounted:${svgElement}`);
    }
  });
});
</script>

<style lang="scss" scoped>
.el-button {
  background-color: $dark-color;
  border: none;
  color: $light-color;
}
</style>
