<script setup>
import * as d3 from 'd3';
import { getTreeData } from '../utils/api';

import { onMounted } from 'vue';

const options = {
  animationDuration: 750,
  circleStrokeColor: 'steelblue',
  circleStrokeWidth: 3,
  circleSize: 10,
  linkStrokeColor: '#aaaaaa',
  linkStrokeWidth: 2,
  closedNodeCircleColor: 'lightsteelblue',
  openNodeCircleColor: 'white',
  hightLightNodeColor: '#FF4242',
  missingNodeColor: '#E8F086',
  maxDepthNodeColor: '#A691AE',
  horizontalSpaceBetweenNodes: 180,
  verticalSpaceBetweenNodes: 50,
  textOffset: 13,
  textStyleFont: '12px sans-serif',
  textStyleColor: 'black',
};

const draw = async () => {
  const svg = d3.select('#tree').append('svg');

  // const transition = svg.transition().duration(options.animationDuration);
  // dynamically sets the height of the svg based on how many nodes there are to display

  const data = await getTreeData();
  // d3.json('/src/assets/data_tree.json').then((data) => {
  const reverses = data.reverse;
  const graph = data.graph;
  // Specify the charts’ dimensions. The height is variable, depending on the layout.
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const margin = { top: 0, right: 50, bottom: 0, left: 75 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Rows are separated by dx pixels, columns by dy pixels. These names can be counter-intuitive
  // (dx is a height, and dy a width). This because the tree must be viewed with the root at the
  // “bottom”, in the data domain. The width of a column is based on the tree’s height.
  const root = d3.hierarchy(graph);

  // Define the tree layout and the shape for links.
  const tree = d3
    .tree()
    .size([innerHeight, innerWidth])
    .nodeSize([
      options.verticalSpaceBetweenNodes,
      options.horizontalSpaceBetweenNodes,
    ]);
  const diagonal = d3
    .linkHorizontal()
    .x((d) => d.y)
    .y((d) => d.x);

  // Create the SVG container, a layer for the links and a layer for the nodes.
  const zoomG = svg
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-margin.left, -margin.top, innerWidth, innerHeight])
    .attr(
      'style',
      `max-width: 100%;height:${innerHeight}; font: 10px sans-serif; user-select: none;`
    );
  const g = zoomG
    .append('g')
    .attr('transform', `translate(${innerWidth / 2},${innerHeight / 2})`);
  svg.call(
    d3.zoom().on('zoom', ({ transform }) => {
      zoomG.attr('transform', transform);
    })
  );
  const gLink = zoomG
    .append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5);

  const gNode = zoomG
    .append('g')
    .attr('cursor', 'pointer')
    .attr('pointer-events', 'all');

  function update(event, source) {
    const duration = event?.altKey ? 2500 : 250; // hold the alt key to slow down the transition
    const nodes = root.descendants().reverse();
    const links = root.links();
    const reverseNodes = [];
    reverses.forEach((item) => {
      let reverseNode = {};
      nodes.forEach((node) => {
        if (item.src === node.data.name) {
          reverseNode['source'] = node;
        } else if (item.dst === node.data.name) {
          reverseNode['target'] = node;
        }
      });
      if (reverseNode['source'] && reverseNode['target']) {
        reverseNodes.push(reverseNode);
      }
    });
    // Compute the new tree layout.
    tree(root);

    let left = root;
    let right = root;
    root.eachBefore((node) => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + margin.top + margin.bottom;

    const transition = zoomG
      .transition()
      .duration(duration)
      .attr('height', height)
      .attr('viewBox', [-margin.left, left.x - margin.top, width, height])
      .tween(
        'resize',
        window.ResizeObserver ? null : () => () => zoomG.dispatch('toggle')
      );
    // Update the nodes…
    const node = gNode.selectAll('g').data(nodes, (d) => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
      .on('click', (event, d) => {
        if (d._children !== undefined) {
          d.children = d.children ? null : d._children;
          update(event, d);
        }
      });

    function hightLightNode(event, d) {
      event.preventDefault();
      const hightlightnode = d3.select('.hightLight');

      if (hightlightnode._groups[0][0]) {
        hightlightnode.classed('hightLight', false);
      } else {
        d3.select(this).attr('class', 'hightLight').transition();
      }
    }
    nodeEnter
      .append('circle')
      .attr('r', 10)
      .attr('stroke', options.circleStrokeColor)
      .style('stroke-width', `${options.circleStrokeWidth}px`)
      .attr('fill', (d) => {
        return d._children
          ? options.closedNodeCircleColor
          : options.openNodeCircleColor;
      })
      .on('contextmenu', hightLightNode);

    nodeEnter
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', (d) => (d._children ? -6 : 6))
      .attr('text-anchor', (d) => (d._children ? 'left' : 'start'))
      .text((d) => d.data.name)
      .attr('transform', `translate(${-40},-15)`)
      .attr('fill', options.textStyleColor);
    // .clone(true);
    // .lower()
    // .attr('stroke-linejoin', 'round')
    // .attr('stroke-width', 3);
    // .attr('stroke', 'white');

    // Transition nodes to their new position.
    const nodeUpdate = node
      .merge(nodeEnter)
      .transition(transition)
      .attr('transform', (d) => `translate(${d.y},${d.x})`)
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node
      .exit()
      .transition(transition)
      .remove()
      .attr('transform', (d) => `translate(${source.y},${source.x})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0);

    //define arrow
    const arrow = zoomG
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('orient', 'auto')
      .attr('refX', 12)
      .attr('refY', 4)
      .attr('markerWidth', 16)
      .attr('markerHeight', 13)
      .append('path')
      .attr('d', 'M 0 0 L 4 4 L 0 8')
      .attr('stroke', options.linkStrokeColor)
      .attr('stroke-width', 1)
      .attr('fill', 'none');

    // Update the links…
    const link = gLink.selectAll('path').data(links, (d) => d.target.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link
      .enter()
      .append('path')
      .attr('d', (d) => {
        const o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      });
    // .attr('marker-end', 'url(#arrowhead)');

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition).attr('d', diagonal);

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition(transition)
      .remove()
      .attr('d', (d) => {
        const o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      });

    const reverse = gLink
      .selectAll('.reverse')
      .data(reverseNodes, (d) => d.target.id);

    // Enter any new links at the parent's previous position.
    const reverseEnter = reverse
      .enter()
      .append('path')
      .attr('d', (d) => {
        const o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      })
      .attr('marker-end', 'url(#arrowhead)');

    // // Transition links to their new position.
    reverse.merge(reverseEnter).transition(transition).attr('d', diagonal);

    // // Transition exiting nodes to the parent's new position.
    reverse
      .exit()
      .transition(transition)
      .remove()
      .attr('d', (d) => {
        const o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      });

    // Stash the old positions for transition.
    root.eachBefore((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  // Do the first update to the initial configuration of the tree — where a number of nodes
  // are open (arbitrarily selected as the root, plus nodes with 7 letters).
  root.x0 = innerHeight / 2;
  root.y0 = 0;
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    if (d.depth && d.data.name.length !== 7) d.children = null;
  });

  update(null, root);
  // });
};
onMounted(() => {
  draw();
});
</script>

<template>
  <div id="tree"></div>
</template>

<style scope>
.hightLight {
  fill: #ff4242;
  stroke: #ff4242;
  r: 12;
}
</style>
