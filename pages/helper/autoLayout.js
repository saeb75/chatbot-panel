// import dagre from "dagre";
// const dagreGraph = new dagre.graphlib.Graph();
// dagreGraph.setDefaultEdgeLabel(() => ({}));
// const DEFAULT_WIDTH = 200;
// const DEFAULT_HEIGHT = 80;
// export const createGraphLayout = (nodes, edges, direction = "TB") => {
//   const isHorizontal = direction === "LR";
//   dagreGraph.setGraph({ rankdir: direction });

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, {
//       width: DEFAULT_WIDTH,
//       height: DEFAULT_HEIGHT,
//     });
//   });

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   nodes.forEach((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id);
//     // node.targetPosition = isHorizontal ? "left" : "top";
//     // node.sourcePosition = isHorizontal ? "right" : "bottom";

//     // We are shifting the dagre node position (anchor=center center) to the top left
//     // so it matches the React Flow node anchor point (top left).
//     node.position = {
//       x: nodeWithPosition.x - DEFAULT_WIDTH / 2,
//       y: nodeWithPosition.y - DEFAULT_HEIGHT / 2,
//     };

//     return node;
//   });

//   return { nodes, edges };
// };

import Elk from "elkjs";
const elk = new Elk({
  defaultLayoutOptions: {
    "elk.algorithm": "layered",
    "elk.direction": "DOWN",
    "elk.spacing.nodeNode": "100",
    "elk.layered.spacing.nodeNodeBetweenLayers": "200",
    "elk.layered.spacing": "50",
    "elk.layered.mergeEdges": "true",
    "elk.spacing": "50",
    "elk.spacing.individual": "50",
    "elk.edgeRouting": "SPLINES",
  },
});
const isNode = (el) => el.position;
const DEFAULT_WIDTH = 350;
const DEFAULT_HEIGHT = 106;
const widths = {
  empty: DEFAULT_WIDTH,
  start: DEFAULT_WIDTH,
  notStart: DEFAULT_WIDTH,
  message: DEFAULT_WIDTH,
};
export const createGraphLayout = async (_nodes, _edges) => {
  const nodes = [];
  const edges = [];
  let elements = [..._nodes, ..._edges];

  elements.forEach((el) => {
    if (isNode(el)) {
      nodes.push({
        id: el.id,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      });
    } else {
      edges.push({
        id: el.id,
        target: el.target,
        source: el.source,
      });
    }
  });

  const newGraph = await elk.layout(
    {
      id: "root",
      children: nodes,
      edges: edges,
    },
    { direction: "DOWN" }
  );
  console.log("====================");
  console.log(elements);
  elements.map((el) => {
    if (isNode(el)) {
      const node = newGraph?.children?.find((n) => n.id === el.id);
      if (node?.x && node?.y && node?.width && node?.height) {
        el.position = {
          x: node.x - node.width / 2 + Math.random() / 1000,
          y: node.y - node.height / 2,
        };
      }
    }
    return el;
  });

  return {
    nodes: elements.filter((el) => isNode(el)),
    edges: elements.filter((el) => !isNode(el)),
  };
};
