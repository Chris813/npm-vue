<template id="fold-panel">
  <el-tabs v-model="activeName" type="card" class="tabs">
    <el-tab-pane label="Module" name="Module">
      <div v-if="!packageInfo.title" class="tab_content">
        No module selected. Click a module in the graph to see details.
      </div>
      <div v-else class="tab_content">
        <ModuleDetail :packageInfo="packageInfo" />
      </div>
    </el-tab-pane>
    <el-tab-pane label="Overview" name="Overview">
      <div class="tab_content">
        
      </div>
    </el-tab-pane>
  </el-tabs>
</template>



<script lang='ts' setup>
import ModuleDetail from './cpns/ModuleDetail.vue';
const activeName = ref('Module');
import { getPackageInfo, getPackageInfoOthers } from '@/utils/api';
import pubsub from 'pubsub-js';
import { IDetail } from './type'
import { ElMessage } from 'element-plus'

const packageInfo = ref<IDetail>({});
const loading = ref(false)

const getData = (_:any, packageName: string) => {
  loading.value = true
  Promise.all([getPackageInfoData(packageName),getPackageInfoDataOthers(packageName)])
  .then((res)=>{
    packageInfo.value = {
      title: `${res[0]?.name}@${res[0]?.version}`,
      desc: res[0]?.description,
      link: {
        github: res[1]?.collected.metadata.links.repository,
        npm:res[1]?.collected.metadata.links.npm,
      },
      size: {
        Minified: res[0]?.size,
        Gzipped: res[0]?.gzip
      }
    }
    console.log(res)
  }).catch((err)=>{
    console.log(`${err} Sorry. Please try again!`)
    ElMessage(`Sorry. Please try again!`)
  }).finally(()=>{
    loading.value = false
  })
};

const getPackageInfoData = async (packageName: string) => {
  console.log('-------packageName', packageName)
  const [name, version] = packageName.split('@');
  const data = await getPackageInfo(name, version);
  return data
};

const getPackageInfoDataOthers = (packageName: string) => {
  const [name, version] = packageName.split('@');
  console.log('-----name',name)
  const data = getPackageInfoOthers(name)
  return data
}
onMounted(()=>{
  pubsub.subscribe('clickedNode', getData);
})

onUnmounted(()=>{
  pubsub.unsubscribe('clickedNode', getData);
})
</script>

<style lang='scss'>
.el-tabs {
  margin-left: -1vw;
  --el-tabs-header-height: 30px;
  color: $light-color;

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