import axios from "axios";
import React, { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
// import { createGraphLayout } from "./autoLayout";
import "reactflow/dist/style.css";

import EmptyNode from "../molecules/EmptyNode";
import StartNode from "../molecules/StartNode";
import { createGraphLayout } from "@/pages/helper/autoLayout";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "asdsdddwwd" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "asdasdasd" } },
];
const initialEdges = [];
const nodeTypes = {
  start: StartNode,
  empty: EmptyNode,
};
export default function BotFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [Bot, setBot] = React.useState({});
  const reactFlowRef = React.useRef(null);
  useEffect(() => {
    axios
      .get("http://localhost:6060/api/bot/get/644246083814bf48dbfcf13e")
      .then(async (res) => {
        setBot(res.data.data);
        // { id: "1", position: { x: 0, y: 0 }, data: { label: "asdsdddwwd" } },

        const myNodes = res.data.data.nodes.map((node, index) => {
          return {
            id: node.step.toString(),
            _id: node._id,

            position: { x: node.position.x, y: node.position.y },
            data: {
              label: node.content + node.step.toString(),
              name: node.name,
            },
            type: index === 0 ? "start" : "notStart",
          };
        });

        let myEdges = [];
        res.data.data.edges?.map((edge) => {
          myEdges.push({
            id: `e${edge.source}-${edge.target}`,
            source: edge.source,
            target: edge.target,
            type: "smoothstep",
          });
        });

        const layout = await createGraphLayout([...myEdges, ...myNodes]);
        setNodes(layout?.filter((el) => el.position));

        setEdges(layout?.filter((el) => !el.position));
        // console.log(res.data);
        //   // setNodes(res.data.nodes);
        //   // setEdges(res.data.edges);
      });
  }, []);
  useEffect(() => {
    addPressableEmptyNode();
  }, [nodes, edges]);
  const addPressableEmptyNode = async () => {
    let checkNodes = nodes.filter((node) => node.id !== "empty");
    let notHaveEdgeList = [];
    checkNodes = checkNodes.map((item) => {
      let check = edges.find((edge) => edge.source === item.id);
      if (!check) {
        notHaveEdgeList.push(item);
      }
      return item;
    });
    if (notHaveEdgeList.length > 0) {
      notHaveEdgeList.map(async (item) => {
        const newNode = {
          id: `empty`,
          position: { x: 0, y: 0 },
          data: { label: `2` },
          type: "empty",
        };
        const newEdge = {
          id: `e${item.id}-empty`,
          source: item.id,
          target: "empty",

          type: "smoothstep",
        };
        const layout = await createGraphLayout([
          ...edges,
          newEdge,
          ...nodes,
          newNode,
        ]);

        setNodes(layout?.filter((el) => el.position));

        setEdges(layout?.filter((el) => !el.position));
        // console.log(res.data);
      });
    }
  };
  const addNode = () => {
    const newNode = {
      id: `3`,
      position: { x: 300, y: 100 },
      data: { label: `asdasdasdsa` },
    };
    setNodes([...nodes, newNode]);

    setEdges([
      ...edges,
      {
        id: `e1-3`,
        source: "1",
        target: "3",
      },
    ]);
  };
  const onLoad = (reactFlowInstance) => {
    reactFlowRef.current = reactFlowInstance;
  };

  return (
    <>
      {Bot && (
        <>
          <ReactFlow
            fitViewOptions={{ padding: 0.1, maxZoom: 1 }}
            fitView={true}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
          >
            <Controls showInteractive={false} />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </>
      )}
    </>
  );
}
