<template>
  <div class="app">
    <splitpanes class="splitpanes">
      <pane min-size="70"  key="left">
        <div class="header">
          header
        </div>
        <div class="main">
          <!-- <Dependency /> -->
          main
          <FunctionAreas />
          <!-- TODO：修改样式 -->
          <el-button class="toggle" @click="handlePanel"> 折叠</el-button>
        </div>
      </pane>
      <pane v-if="showRight" size="20" key="right">
        <InfoList />
      </pane>
    </splitpanes>
  </div>
</template>

<script setup>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import Dependency from './components/Dependency'
import FunctionAreas from './components/FunctionAreas';
import InfoList from './components/InfoList';

const showRight = ref(true);
const handlePanel = () => {
  showRight.value = !showRight.value
}

</script>

<style lang='scss' scoped>
.app {
  width: 100vw;
  height: 100vh;
  color: aliceblue;

  .main {
    position: relative;
  .toggle {
    position: absolute;
    right: 0;
    top: 0;
  }
  }
}

.splitpanes {
  background-color: #202020;

  &__pane {
    box-shadow: 0 0 5px rgba(241, 225, 225, 0.22) inset;
    padding: 1vw;
    // justify-content: center;
    // align-items: center;
    // display: flex;
  }

  &--vertical > &__splitter {
    min-width: 7px;
    background: linear-gradient(90deg, #ccc, #111);
  }
}
</style>
