import axios from "axios";
import React, { useEffect, useId } from "react";
import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useStoreApi,
} from "reactflow";
import uniqid from "uniqid";

// import { createGraphLayout } from "./autoLayout";
import "reactflow/dist/style.css";

import EmptyNode from "../molecules/EmptyNode";
import StartNode from "../molecules/StartNode";
import { createGraphLayout } from "@/pages/helper/autoLayout";
import Meassege from "../molecules/Message";
import Label from "../edges/label";
import { useMemo } from "react";
import TransferToAgent from "../molecules/TransferToAgent";
import Options from "../molecules/Options";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "asdsdddwwd" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "asdasdasd" } },
];
const initialEdges = [];
const nodeTypes = {
  transferToAgent: TransferToAgent,
  start: StartNode,
  empty: EmptyNode,
  message: Meassege,
  options: Options,
};

export default function BotFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const store = useStoreApi();
  const { zoomIn, zoomOut, setCenter } = useReactFlow();
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
            position: { x: 0, y: 0 },
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
          });
        });

        const { nodes: layoutedNodes, edges: layoutedEdges } =
          await createGraphLayout(
            [...myNodes],

            [...myEdges]
          );
        setNodes(layoutedNodes);

        setEdges(layoutedEdges);
        // console.log(res.data);
        //   // setNodes(res.data.nodes);
        //   // setEdges(res.data.edges);
      });
  }, []);
  useEffect(() => {
    addPressableEmptyNode();
  }, [nodes, edges]);
  const addPressableEmptyNode = async () => {
    let checkNodes = nodes.filter((node) => node.type !== "empty");
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
        if (item.type === "transferToAgent") return;
        const uId = uniqid();
        const newNode = {
          id: uId,
          position: { x: 0, y: 0 },
          data: { label: `2`, source: item.id },
          type: "empty",
        };
        const newEdge = {
          id: `e${item.id}-${uId}`,
          source: item.id,
          target: uId,
          data: { label: "label" },
        };
        const { nodes: layoutedNodes, edges: layoutedEdges } =
          await createGraphLayout([...nodes, newNode], [...edges, newEdge]);

        setNodes(layoutedNodes);

        setEdges(layoutedEdges);
        // focusNode();
        // console.log(res.data);
      });
    }
  };
  const focusNode = () => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);

    if (nodes.length > 0) {
      const node = nodes[0];

      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;
      let zoom = 0.5;

      setCenter(x, y, { zoom, duration: 1000 });
    }
  };
  const edgeTypes = useMemo(() => {
    return {
      label: Label,
    };
  }, []);
  const addNode = () => {
    const newNode = {
      id: `3`,
      position: { x: 0, y: 0 },
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
  const onPaneClick = (event) => {
    console.log(event);
  };
  return (
    <>
      {Bot && (
        <>
          <ReactFlow
            fitView={true}
            fitViewOptions={{
              padding: 0.1,
              maxZoom: 0.7,
            }}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onPaneClick={onPaneClick}
            edgeTypes={edgeTypes}
          >
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </>
      )}
    </>
  );
}
