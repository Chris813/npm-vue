<template>
  <div></div>
</template>

<script setup>
import { getPackgeInfo } from '@/utils/api';
import { ref } from 'vue';

import pubsub from 'pubsub-js';
const packageName = ref('');
const packageInfo = ref({});
const getPackageInfoData = async () => {
  const [name, version] = packageName.value.split('@');
  const data = await getPackgeInfo(name, version);
  packageInfo.value = data;
  console.log(packageInfo.value);
};
getPackageInfoData();
const getData = (messageName, obj) => {
  console.log('click');
  packageName.value = obj;
};
onMounted(() => {
  pubsub.subscribe('clickedNode', getData);
});
</script>

<style scoped></style>
