<template>
  <div id="graph" />
</template>

<script setup>
import * as d3 from 'd3';
import * as d3Graphviz from 'd3-graphviz';
import { onMounted, watch, ref } from 'vue';
import { jsonToDot } from '@/utils/index';
import { getGrapgvizData } from '@/utils/api';
import pubsub from 'pubsub-js';
const getCode = async () => {
  const data = await getGrapgvizData();
  console.log('-----pub', data)
  pubsub.publish('graph_data', data)
  const dot = JSON.stringify(data.nocycle);
  const cycle = JSON.stringify(data.cycle);
  const codeString = jsonToDot(dot, cycle, data.source);
  return codeString;
};

// const props = defineProps({
//   code: {
//     type: String,
//     default: `digraph G {
//             node [shape="record"];
//             edge [style="dashed"];
//             a -> b
//           }`,
//   },
// });
// console.log(props);

function render() {
  // scale 缩放比例
  // fit(true) 自适应缩放，当节点比较多时可以显示完成的图，但是会看不清楚，节点较少时，会很大，慎用！！默认值false
  d3Graphviz
    .graphviz('#graph')
    .width(window.innerWidth)
    .height(window.innerHeight)
    .scale(0.4)
    .attributer(function (d) {
      // 当节点非常多时，默认将主节点调至视口中间。 适用于数据量差不多的数据，统一调整图表视口，否则数据较少时，图表上移可视窗口会看不见
      /* const px2pt = 3 / 4;
       * if (d.tag === 'svg') {
       *   var selection = d3.select(this);
       *   var width = d.attributes.width;
       *   var height = d.attributes.height;
       *   var w = d.attributes.viewBox.split(" ")[2];
       *   var h = d.attributes.viewBox.split(" ")[3];
       *   var x = (width - w) / 3;
       *   var y = height;
       *   console.log(width, height, w, h, x, y, width * px2pt, height * px2pt);
       *   //   selection.attr("viewBox", -x + " " + y + " " + w + " " + (height * px2pt));
       *   d.attributes.viewBox = 0 + " " + 0 + " " + w + " " + h;
       *  }
       */
      // 当节点非常多时，默认将主节点调至视口中间。比例是我自己估算的， 适用于数据数量不确定，相差较大的数据
      const childNum = 8 / 5;
      if (d.tag === 'g' && d.parent.tag == 'svg') {
        if (d.children.length > 500) {
          d.translation.y = d.children.length * childNum;
        }
      }
    })
    .renderDot(code.value)
    .on('end', () => {
      const path = d3.selectAll('g.node');
      console.log(path);
      path.on('click', clickNode);
      const background = d3.select('polygon');
      background.attr('fill', '#fdfbf5');
      const text = d3.selectAll('g.node text');
      text
        .style('cursor', 'pointer')
        .attr('fill', '#555555')
        .attr('font-family', 'Inter');
    });
}

function clickNode(event) {
  const hightlightnode = d3.select('.hightLightNode');
  if (hightlightnode._groups[0][0]) {
    hightlightnode.classed('hightLightNode', false);
  }
  d3.select(this).attr('class', 'hightLightNode').transition();
  const packagestring = event.target.__data__.parent.key;
  console.log('------click', packagestring);
  pubsub.publish('clickedNode', packagestring);
}
const code = ref();
onMounted(async () => {
  code.value = await getCode();
  render();

  // const svg = d3.select(graph.selectAll);
  // const g = d3.select(svg.node().querySelector('g'));
  // console.log(g);
});
watch(
  () => code,
  () => {
    render();
  }
);
</script>

<style scope lang="scss">
g path {
  cursor: pointer;
}

.hightLightNode {
  // // stroke: steelblue;
  // fill: darkblue;
  // // stroke: darkblue;
  // stroke-width: 4px;
  path {
    fill: $highlight-color;
  }
  text {
    fill: $hover-color;
  }
}
</style>
