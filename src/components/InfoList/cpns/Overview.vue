<template>
    <div class="title" :class="hasCycle? 'red': 'green'">
        {{ hasCycle? "Cyclic dependency!" : "No Cyclic dependency!"}}
    </div>
    <el-divider />
    <div class="title"> Multi-version Packages: </div>
      <div class="multi">
        <el-row v-for="(value,key) in multiVersionList" :key="key">
          <el-tag v-for="item in value" :key="item">
            {{ item }}
          </el-tag>
      </el-row>
    </div>
</template>

<script lang='ts' setup>
import type { IGraph } from '../type'
import { getVersionPackage } from '../../../utils/api'
import { getPort } from '../../../utils/index.js'

const props = defineProps<{
  graph_data?: IGraph
}>()

const hasCycle = computed(()=>{
  const cycleList = props.graph_data?.cycle;
  for(let k in cycleList){
    if(cycleList[k].length>0) return true;
  }
  return false;
})

//TODO: 多版本的包
const multiVersionList = ref<any[]>([])
onMounted(async ()=>{
  const port = getPort()
  const res = await getVersionPackage(port)
  for(let pkg in res){
    const pkg_version = res[pkg].map((v:string)=>`${pkg}@${v}`)
    multiVersionList.value.push(pkg_version)
  }
})
</script>

<style lang='scss' scoped>
.el-divider {
  border: solid 2px;

  &--horizontal {
    height: 0;
    margin: 24px 0 12px 0;
  }
}

.multi{
  margin-top: 10px;
}
.el-row {
  margin-bottom: 8px;
}

.title {
  font-weight: 800;
}
.green {
  color: rgb(158, 243, 31);
}

.red {
  color:rgb(249, 66, 0);
}
</style>