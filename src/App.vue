<template>
  <div class="selectviz">
    <select v-model="selectedView">
      <option value="tree">Tree</option>
      <option value="graph">Graph</option>
    </select>
  </div>
  <div v-if="selectedView === 'graph'">
    <Graph />
  </div>
  <div v-if="selectedView === 'tree'">
    <Tree />
  </div>
</template>

<script setup>
import Graph from './components/Dependency_Graphviz.vue'; // 封装了一个子组件
import Tree from './components/Dependency_Toggle.vue';
import { ref } from 'vue';

const selectedView = ref('graph');
</script>
