import useBotStore, { SideBarOptions } from "@/store/bot";
import { Button, Textarea } from "@material-tailwind/react";
import React from "react";
import uniqid from "uniqid";
import { useReactFlow, useStoreApi } from "reactflow";
import { createGraphLayout } from "@/pages/helper/autoLayout";

const AddMessage = () => {
  const { setNodes, setEdges, getEdges } = useReactFlow();
  const store = useStoreApi();
  const edges = getEdges();

  const { nodeInternals } = store.getState();

  const [message, setMessage] = React.useState("");
  const { sideBarStatus, setSideBarStatus, selectedNode } = useBotStore(
    (state) => state
  );
  const messagHandler = async () => {
    if (message === "") return;
    const id = uniqid();
    console.log(selectedNode);
    let newEdges = edges.filter((edge) => edge.target !== selectedNode.id);
    let removedEdges = edges.find((edge) => edge.target === selectedNode.id);
    console.log({
      edges,
      newEdges,
      selectedNode,
    });
    const newNode = {
      id: id,
      data: {
        label: message,
        source: selectedNode.data.source,
      },
      position: { x: 0, y: 0 },
      type: "message",
    };
    console.log({
      removedEdges,
    });
    const newEdge = {
      ...removedEdges,
      type: removedEdges.type ? removedEdges.type : "smoothstep",
      id: `e${selectedNode.data.source}-${id}`,
      source: selectedNode.data.source,
      target: id,
    };
    console.log({ newEdge });
    newEdges.push(newEdge);
    const oldNodes = Array.from(nodeInternals.values()).filter(
      (item) => item.id !== selectedNode.id
    );
    const { nodes: layoutedNodes, edges: layoutedEdges } =
      await createGraphLayout([...oldNodes, newNode], newEdges);

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    setSideBarStatus(SideBarOptions.default);
    setMessage("");
  };

  return (
    <div className=" w-full">
      <Textarea
        label="Message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <Button onClick={messagHandler} fullWidth className="w-full">
        Add Step
      </Button>
    </div>
  );
};

export default AddMessage;
