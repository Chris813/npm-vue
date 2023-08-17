<template>
    <div class="cycle">
        {{ hasCycle? "Cyclic dependency!" : "No Cyclic dependency!"}}
    </div>
    <el-divider />
    Multi-version Packages: 
    {{  }}
    <div class="multi_version">

    </div>
</template>

<script lang='ts' setup>
import type { IGraph } from '../type'
const props = defineProps<{
  graph_data: IGraph
}>()

const hasCycle = computed(()=>{
  const cycleList = props.graph_data?.cycle;
  for(let k in cycleList){
    if(cycleList[k].length>0) return true;
  }
  return false;
})

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