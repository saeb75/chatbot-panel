import Elk from "elkjs";
const elk = new Elk({
  defaultLayoutOptions: {
    "elk.algorithm": "layered",
    "elk.direction": "DOWN",
    "elk.spacing.nodeNode": "600",
    "elk.layered.spacing.nodeNodeBetweenLayers": "200",
    "elk.layered.spacing": "50",
    "elk.layered.mergeEdges": "true",
    "elk.spacing": "50",
    "elk.spacing.individual": "50",
    "elk.edgeRouting": "SPLINES",
  },
});
const isNode = (el) => el.position;
const DEFAULT_WIDTH = 172;
const DEFAULT_HEIGHT = 36;

export const createGraphLayout = async (elements) => {
  console.log(
    "🚀 ~ file: autoLayout.js:20 ~ createGraphLayout ~ elements:",
    elements
  );
  const nodes = [];
  const edges = [];

  elements.forEach((el) => {
    if (isNode(el)) {
      nodes.push({
        id: el.id,
        width: el.__rf?.width ?? DEFAULT_WIDTH,
        height: el.__rf?.height ?? DEFAULT_HEIGHT,
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

  return elements.map((el) => {
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
};
