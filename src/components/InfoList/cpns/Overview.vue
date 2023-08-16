<template>
    <div class="cycle">
        {{ hasCycle? "Cyclic dependency!" : "No Cyclic dependency!"}}
    </div>
    <el-divider />
    <div class="multi_version">

    </div>
</template>

<script setup>
// TODO: 是否有循环
const hasCycle = ref(false)

//TODO: 多版本的包
</script>

<style lang='scss' scoped>
.el-divider {
  border: solid 2px;

  &--horizontal {
    height: 0;
    margin: 24px 0 12px 0;
  }
}
</style>