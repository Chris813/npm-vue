import axios from 'axios';

export async function getGrapgvizData(port: string) {
  const url = `http://localhost:${port}/getGraphvizData`;
  console.log(url);
  const data = await axios.get(url);
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
  const data = await axios.get(`${rootUrl}${packageName}`);
  return data.data;
}

export async function getVersionPackage(port: string) {
  const url = `http://localhost:${port}/getVersionPackage`;
  const data = await axios.get(url);
  return data.data;
}

