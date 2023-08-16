<template>
  <div>
    <el-button :icon="Download" @click="handleDownload" />
  </div>
</template>

<script setup>
import { Download } from '@element-plus/icons-vue';
import { handelSvgZoom } from '@/utils/index';
const handleDownload = () => {
  const svgElement = document.querySelector('#graph svg');
  const newSvgElement = handelSvgZoom(svgElement, 'graph');
  // 获取 <svg> 元素的内容
  const svgContent = new XMLSerializer().serializeToString(newSvgElement);
  // 创建 Blob 对象
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  // 创建链接元素
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  // 设置下载属性
  downloadLink.download = 'your_svg_file.svg';
  // 触发链接的点击事件，从而触发下载
  downloadLink.click();
  // 清理创建的 Blob 对象
  URL.revokeObjectURL(downloadLink.href);
};
</script>

<style lang="scss" scoped>
.el-button {
  background-color: $dark-color;
  border: none;
  color: $light-color;
}
</style>
