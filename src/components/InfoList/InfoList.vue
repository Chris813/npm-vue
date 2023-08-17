<template id="fold-panel">
  <el-tabs v-model="activeName" type="card" class="tabs">
    <el-tab-pane label="Module" name="Module">
      <div v-if="!packageInfo.title" class="tab_content">
        No module selected. Click a module in the graph to see details.
      </div>
      <div v-else class="tab_content">
        <ModuleDetail :packageInfo="packageInfo" v-loading="loading" element-loading-background="#666465"/>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Overview" name="Overview">
      <Overview :graph_data="graph_data"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import ModuleDetail from './cpns/ModuleDetail.vue';
import Overview from './cpns/Overview.vue';
const activeName = ref('Module');
import { getPackageInfo, getPackageInfoOthers } from '@/utils/api';
import pubsub from 'pubsub-js';
import { IDetail } from './type';
import { ElMessage } from 'element-plus';
import { formmatSize } from '@/utils/index.js';

const packageInfo = ref<IDetail>({});
const graph_data = ref<{
  cycle: Record<string, string[]>
  nocycle: Record<string, string[]>
  source:string
}>();
const loading = ref(false);

const getpercentage = (minified: string, gzipped: string): number => {
  const total = Number(minified) + Number(gzipped);
  return Math.floor((Number(minified) / total) * 100);
};

const getData = (_: any, packageName: string) => {
  loading.value = true;
  Promise.all([
    getPackageInfoData(packageName),
    getPackageInfoDataOthers(packageName),
  ])
    .then((res) => {
      packageInfo.value = {
        title: `${res[0]?.name}@${res[0]?.version}`,
        desc: res[0]?.description,
        link: {
          github: res[1]?.collected.metadata.links.repository,
          npm: res[1]?.collected.metadata.links.npm,
        },
        size: {
          Minified: formmatSize(res[0]?.size),
          Gzipped: formmatSize(res[0]?.gzip),
        },
        percent: getpercentage(res[0]?.size, res[0]?.gzip),
      };
      console.log(res);
    })
    .catch((err) => {
      console.log(`${err} Sorry. Please try again!`);
      ElMessage(`Sorry. Please try again!`);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getPackageInfoData = async (packageName: string) => {
  const [name, version] = packageName.split('@');
  const data = await getPackageInfo(name, version);
  return data;
};

const getPackageInfoDataOthers = (packageName: string) => {
  const [name, version] = packageName.split('@');
  const data = getPackageInfoOthers(name);
  return data;
};
onMounted(() => {
  pubsub.subscribe('clickedNode', getData);
  pubsub.subscribe('graph_data',(_: any, data:any)=>{
    graph_data.value = data
  })
});

onUnmounted(() => {
  pubsub.unsubscribe('clickedNode');
  pubsub.subscribe('graph_data')
});
</script>

<style lang="scss">
.el-tabs {
  margin-left: -1vw;
  padding: 0 5px;
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
        color: $dark-color;
      }
    }
  }
}
</style>
