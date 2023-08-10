export function jsonToDot(dot, cycle, source) {
  // 处理数据格式为 插件可以解析的格式
  const dotjson = JSON.parse(dot);
  const cyclejson = JSON.parse(cycle);
  const dotstring = Object.entries(dotjson).reduce(
    (acc, [node, dependencies]) => {
      return dependencies.reduce(
        /**
         * 此处为单个节点关系，设置样式
         * arrowsize: 箭头尺寸
         * color：连接线的颜色
         * style：节点边框形状，rounded 圆角
         */
        (acc, dependency) =>
          acc +
          `  "${node}" -> "${dependency}"\n [arrowsize=.8, color=grey, style="rounded"]`,
        acc
      );
      /**
       * 此处设置graph图所有点线关系的统一样式
       * ranksep: node之间的间距
       * graph - rankdir: 布局方向，LR从左到右，TB从上到下(默认)
       * graph - bb: 以点为单位的绘图边界框
       * node - margin: 节点内边距
       * node - shape: 节点形状
       * node - height: 节点高度
       * node - style:  节点样式，圆角，填充色
       * node - color:  颜色
       * node - fillcolor:  背景填充色
       * edge - style: 连线样式 solid实线
       * edge - arrowhead: 连线箭头样式
       * edge - arrowtail: 连线箭尾样式
       * ......
       * 还有很多属性，可参考下方提供的参考文档
       */
    },
    `digraph G { ranksep = 2.0; graph [rankdir=LR,bb="0,0,412.05,372.8"];node [margin=".2,.1",fontsize=20,shape=box,height=.3, style="rounded,filled", color="#aaaaaa", fillcolor="lightsteelblue"]; edge [style=solid,arrowhead=normal,arrowtail=dot,penwidth=2]; {rank = same; "${source}"}\n`
  );
  const cyclestring =
    Object.entries(cyclejson).reduce((acc, [node, dependencies]) => {
      return dependencies.reduce(
        /**
         * 此处为单个节点关系，设置样式
         * arrowsize: 箭头尺寸
         * color：连接线的颜色
         * style：节点边框形状，rounded 圆角
         */
        (acc, dependency) =>
          acc +
          `  "${node}" -> "${dependency}"\n [arrowsize=.4, color=red, style="rounded"]`,
        acc
      );
      /**
       * 此处设置graph图所有点线关系的统一样式
       * ranksep: node之间的间距
       * graph - rankdir: 布局方向，LR从左到右，TB从上到下(默认)
       * graph - bb: 以点为单位的绘图边界框
       * node - margin: 节点内边距
       * node - shape: 节点形状
       * node - height: 节点高度
       * node - style:  节点样式，圆角，填充色
       * node - color:  颜色
       * node - fillcolor:  背景填充色
       * edge - style: 连线样式 solid实线
       * edge - arrowhead: 连线箭头样式
       * edge - arrowtail: 连线箭尾样式
       * ......
       * 还有很多属性，可参考下方提供的参考文档
       */
    }, '') + '}';
  return dotstring + cyclestring;
}
