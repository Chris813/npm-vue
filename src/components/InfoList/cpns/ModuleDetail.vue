<template>
  <div class="detail">
    <div class="title">
      {{ packageInfo.title }}
    </div>
    <div class="desc">
      {{ packageInfo.desc }}
    </div>
    <div class="link">
      <div v-for="(link, name) in packageInfo.link" :key="name">
        <el-link :href="link" :underline="false" target="_blank">
          {{ name }}
          <el-icon size="10">
            <i-ep-link />
          </el-icon>
        </el-link>
      </div>
    </div>
    <el-divider />
    <div class="bundle_title">Bundle Size</div>
    <div class="bundle_size">
      <div v-for="(size, name) in packageInfo.size" :key="name">
        <span class="name">
          {{ `${name}: ` }}
        </span>
        <span class="size">
          {{ `${size} ` }}
        </span>
      </div>
      <div class="size-graph">
        <div class="totalbar"></div>
        <div
          class="minibar"
          :style="{ width: `${packageInfo.percent as number * 0.9}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IDetail } from '../type';

defineProps<{
  packageInfo: IDetail;
}>();

// const barwidth=ref(0)
// barwidth.value=document.querySelector('.bar').offsetWidth
</script>

<style lang="scss" scoped>
.title {
  font-size: 22px;
  font-weight: 800;
}

.desc {
  margin-top: 10px;
  font-size: 14px;
  font-style: italic;
}

.link {
  display: flex;
  margin-top: 10px;
  gap: 10px;
  .el-link {
    color: $light-color;
    font-size: 16px;
  }
  .el-link:hover {
    color: $hover-color;
    font-size: 16px;
  }
}

.el-divider {
  border: solid 2px;

  &--horizontal {
    height: 0;
    margin: 24px 0 12px 0;
  }
}

.bundle_title {
  font-size: 18px;
  font-weight: 800;
}

.bundle_size {
  margin-top: 10px;
  font-size: 14px;
  .size {
    font-weight: 600;
  }
  .size-graph {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    .totalbar {
      margin-top: 10px;
      width: 90%;
      height: 25px;
      background-color: $hover-color;
      border-radius: 5px;
    }
    .minibar {
      position: absolute;
      height: 25px;
      border-radius: 5px 0 0 5px;
      background-color: $highlight-color;
      top: 10px;
      left: 11px;
    }
  }
}
</style>
