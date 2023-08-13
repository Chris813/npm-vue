<template id="fold-panel">
  <el-tabs v-model="activeName" type="card" class="tabs">
    <el-tab-pane label="Module" name="Module">
      <div v-if="!showModule" class="tab_content">
        No module selected. Click a module in the graph to see details.
      </div>
      <div v-else class="tab_content">
        <ModuleDetail />
      </div>
    </el-tab-pane>
    <el-tab-pane label="Graph" name="Graph">
      <div class="tab_content">
        Graph
      </div>
    </el-tab-pane>
  </el-tabs>
</template>



<script lang='ts' setup>
import ModuleDetail from './cpns/ModuleDetail.vue'
const activeName = ref('Module')
const showModule = ref(false)
</script>

<style lang='scss'>
.el-tabs {
  margin-left: -1vw;
  --el-tabs-header-height: 30px;

  .el-tabs__header {
    background-color: $dark-color;
    border-bottom-color: $light-color;

    .el-tabs__nav {
      border: none;
      background-color: $light-color;
      border-radius: 0;

      & .el-tabs__item:hover {
        background-color: $hover-color;
        color:$dark-color;
      }

    }
  }
}

.tab_content {
  padding: 0 5px 0 5px;
}
</style>