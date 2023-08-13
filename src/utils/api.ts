import axios from 'axios';

export async function getTreeData() {
  const data = await axios.get('http://localhost:3000/getTreeData');
  return data.data;
}

export async function getGrapgvizData() {
  const data = await axios.get('http://localhost:3000/getGraphvizData');
  return data.data;
}

