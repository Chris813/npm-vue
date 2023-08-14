import axios from 'axios';

export async function getGrapgvizData() {
  const data = await axios.get('http://localhost:3000/getGraphvizData');
  return data.data;
}

export async function getPackageInfo(packageName: string, version: string) {
  const rootUrl = 'https://bundlephobia.com/api/size';
  const data = await axios.get(
    `${rootUrl}?package=${packageName}&version=${version}`
  );
  return data.data;
}

export async function getPackageInfoOthers(packageName: string) {
  const rootUrl = 'https://api.npms.io/v2/package/';
  const data = await axios.get(
    `${rootUrl}${packageName}`
  );
  return data.data;
}


