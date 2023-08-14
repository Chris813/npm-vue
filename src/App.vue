<template>
  <div class="app">
    <splitpanes class="splitpanes">
      <pane min-size="70" class="left">
        <div class="header">
          <svg
            width="30"
            height="30"
            viewBox="0 0 114 114"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs />
            <path
              id="Vector"
              d="M90.4543 25.81C84.2152 22.8784 77.544 20.7478 70.5696 19.5347C69.713 21.0899 68.7123 23.1817 68.0224 24.8458C60.6083 23.726 53.2625 23.726 45.9848 24.8458C45.2949 23.1817 44.2715 21.0899 43.4073 19.5347C36.4253 20.7478 29.7465 22.8862 23.5074 25.8256C10.9232 44.9237 7.51176 63.5475 9.21746 81.9068C17.564 88.1666 25.6528 91.9691 33.6052 94.4575C35.5686 91.7436 37.3198 88.8587 38.8284 85.8182C35.9553 84.7218 33.2034 83.3687 30.6032 81.798C31.293 81.2848 31.9677 80.7482 32.6197 80.1961C48.4789 87.6456 65.7103 87.6456 81.38 80.1961C82.0395 80.7482 82.7142 81.2848 83.3965 81.798C80.7887 83.3765 78.0292 84.7296 75.1561 85.826C76.6646 88.8587 78.4083 91.7514 80.3793 94.4653C88.3392 91.9769 96.4356 88.1744 104.782 81.9068C106.784 60.6236 101.363 42.171 90.4543 25.81ZM40.989 70.6159C36.2282 70.6159 32.324 66.1525 32.324 60.717C32.324 55.2815 36.1448 50.8102 40.989 50.8102C45.8332 50.8102 49.7373 55.2737 49.6539 60.717C49.6615 66.1525 45.8332 70.6159 40.989 70.6159ZM73.0107 70.6159C68.2499 70.6159 64.3457 66.1525 64.3457 60.717C64.3457 55.2815 68.1665 50.8102 73.0107 50.8102C77.8549 50.8102 81.759 55.2737 81.6756 60.717C81.6756 66.1525 77.8549 70.6159 73.0107 70.6159Z"
              fill-rule="nonzero"
              fill="#575757"
            />
          </svg>
          <span class="title"> Npm Analyzer </span>

          <el-icon
            v-if="showRight"
            size="30"
            class="toggle"
            @click="handlePanel"
          >
            <i-ep-caret-right />
          </el-icon>
          <el-icon v-else size="30" class="toggle" @click="handlePanel">
            <i-ep-caret-left />
          </el-icon>
        </div>
        <div class="main">
          <Dependency />
        </div>
        <div class="footer">
          <FunctionAreas />
        </div>
      </pane>
      <pane v-if="showRight" min-size="20" size="20" class="right">
        <InfoList />
      </pane>
    </splitpanes>
  </div>
</template>

<script setup>
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import Dependency from './components/Dependency';
import FunctionAreas from './components/FunctionAreas';
import InfoList from './components/InfoList';
const showRight = ref(true);
const handlePanel = () => {
  showRight.value = !showRight.value;
};
</script>

<style lang="scss">
.app {
  width: 100vw;
  height: 100vh;

  .header {
    display: flex;
    align-items: center;
    position: relative;

    .title {
      margin-left: 5px;
      font-weight: 800;
      color: $dark-color;
    }

    .toggle {
      position: absolute;
      right: -18px;
      top: 0;
      color: $dark-color;
      cursor: pointer;
    }
  }

  .footer {
    position: absolute;
    left: 1vw;
    bottom: 1vw;
    z-index: 999;
  }
}

.splitpanes {
  .left {
    background-color: $light-color;
  }
  .right {
    background-color: $dark-color;
  }

  &__pane {
    // box-shadow: 0 0 5px #575757 inset;
    padding: 1vw;
    // justify-content: center;
    // align-items: center;
    // display: flex;
  }

  &--vertical > &__splitter {
    min-width: 6px;
    background-color: $light-color;
    // border: 1px solid #575757;
    // border-top: none;
    // border-bottom: none;
  }
}
</style>
