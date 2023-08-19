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
    `digraph G { ranksep = 2.0; graph [rankdir=LR,bb="0,0,412.05,372.8"];node [margin=".2,.1",fontsize=20,shape=box,height=.3, style="rounded,filled", color="#aaaaaa", fillcolor="#e9d1d1"]; edge [style=solid,arrowhead=normal,arrowtail=dot,penwidth=2,fillcolor="#666465"]; {rank = same; "${source}"}\n`
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
    }, '') + '}';
  return dotstring + cyclestring;
}

export function formmatSize(size) {
  const num = Number(size);
  if (num < 1024) {
    return `${num}B`;
  } else if (num < 1024 * 1024) {
    return `${(num / 1024).toFixed(2)}KB`;
  } else if (num < 1024 * 1024 * 1024) {
    return `${(num / 1024 / 1024).toFixed(2)}MB`;
  } else {
    return `${(num / 1024 / 1024 / 1024).toFixed(2)}GB`;
  }
}

export function getTranslate(svg, zoomClassName) {
  let zoomObj = svg.getElementsByClassName(zoomClassName.replace(/\./g, ''))[0];
  const transformMath = zoomObj.getAttribute('transform');
  if (transformMath) {
    const transformObj = transformMath.match(/translate\(([^,]*),([^,)]*)\)/);
    const translateX = transformObj[1];
    const translateY = transformObj[2];
    return { translateX, translateY };
  }
}
export function handelSvgZoom(svg, zoomClassName, translate) {
  //得到svg的真实大小
  const graph = document.querySelector('#graph');
  console.log(graph);
  const box = graph.getBoundingClientRect();
  //查找zoomObj
  let zoomObj = svg.getElementsByClassName(zoomClassName.replace(/\./g, ''))[0];
  let zoombox = zoomObj.getBoundingClientRect();
  if (!zoomObj) {
    alert('zoomObj不存在');
    return false;
  }
  /*------这里是处理svg缩放的--------*/

  let scale = 1;
  //获取缩放比例
  const scaleMath = zoomObj.getAttribute('transform');
  if (scaleMath) {
    const scaleObj = scaleMath.match(/scale\((.*)\)/);
    if (scaleObj) {
      //匹配到缩放
      scale = scaleObj[1];
      console.log(`scale:${scale}`);
    }
  }
  console.log(
    `box.width:${box.width},box.height:${box.height},zoombox.width:${zoombox.width},zoombox.height:${zoombox.height}`
  );
  const scaleX = (box.width / zoombox.width) * scale;
  const scaleY = ((box.height * 0.9) / zoombox.height) * scale;
  const scalenum = scaleX > scaleY ? scaleY : scaleX;
  console.log(scalenum);
  /*----------------------------------*/

  //克隆svg
  const node = svg.cloneNode(true);
  const newtransform = node.getElementsByClassName(
    zoomClassName.replace(/\./g, '')
  )[0];

  newtransform.setAttribute(
    'transform',
    `translate(${translate.translateX},${translate.translateY}) scale(${scalenum})`
  );
  // zoomObj.setAttribute(
  //   'transform',
  //   `translate(${translate.translateX},${translate.translateY}) scale(${scalenum})`
  // );
  const newtransformbox = newtransform.getBoundingClientRect();
  const percent = 33 / 17;
  const fittranslateY =
    parseFloat(translate.translateY) +
    (parseFloat(box.top) - parseFloat(newtransformbox.top)) * percent;

  // console.log(
  //   `translateY:${parseFloat(translate.translateY)},box.y:${parseFloat(
  //     box.top
  //   )},zoombox.y:${parseFloat(zoombox.top)},percent:${percent}`
  // );
  // console.log(`fittranslateY:${fittranslateY}`);
  // zoomObj.setAttribute(
  //   'transform',
  //   `translate(${translate.translateX},${fittranslateY}) scale(${scalenum})`
  // );
  newtransform.setAttribute(
    'transform',
    `translate(${translate.translateX},${fittranslateY}) scale(${scalenum})`
  );

  /*-------------清楚缩放元素的缩放-------------*/

  return node;
}

export function getPort() {
  const port = location.port;
  console.log('---port',port)
  return port;
}
