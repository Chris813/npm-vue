<template>
  <div v-if="selectedView === 'graph'">
    <Graph />
  </div>
</template>

<script setup>
import Graph from './components/Dependency_Graphviz.vue'; // 封装了一个子组件
import { ref } from 'vue';
</script>
