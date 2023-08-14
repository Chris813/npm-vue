# npm-vue npm 包依赖关系可视化界面

## pubsub 组件通信

components\Dependency\Dependency_Graphviz.vue 内 79 行

```javascript
function clickNode(event) {
  const hightlightnode = d3.select('.hightLightNode');
  if (hightlightnode._groups[0][0]) {
    hightlightnode.classed('hightLightNode', false);
  }
  d3.select(this).attr('class', 'hightLightNode').transition();
  //发布
  const packagestring = event.target.textContent;
  pubsub.publish('clickedNode', packagestring);
}
```

components\PackageInfo\SizeBar.vue 23 行

```javascript
onMounted(() => {
  pubsub.subscribe('clickedNode', getData);
});
```
