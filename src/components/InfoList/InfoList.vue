<template id="fold-panel">
    <el-tabs
    v-model="activeName"
    type="card"
    class="tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane label="Module" name="Module">
      <div v-if="!showModule">
        No module selected. Click a module in the graph to see details.
      </div>
      <div v-else>

      </div>
    </el-tab-pane>
    <el-tab-pane label="Graph" name="Graph">
      Graph
    </el-tab-pane>
  </el-tabs>
</template>



<script setup>
const showModule = ref(false)
</script>

<style lang='scss' scoped>

</style>