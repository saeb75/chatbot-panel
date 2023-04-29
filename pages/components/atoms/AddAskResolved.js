import useBotStore, { SideBarOptions } from "@/store/bot";
import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import uniqid from "uniqid";
import { useReactFlow, useStoreApi } from "reactflow";
import { createGraphLayout } from "@/pages/helper/autoLayout";

const AddAskResolved = () => {
  const { setNodes, setEdges, getEdges } = useReactFlow();
  const store = useStoreApi();
  const edges = getEdges();

  const { nodeInternals } = store.getState();

  const [botMessage, setBotMessage] = React.useState("was this helpful?");
  const [resolvedMessage, setResolvedMessage] = React.useState(
    "Yes, problem solved"
  );
  const [unresolvedMessage, setUnresolvedMessage] = React.useState(
    "No, i still need help"
  );
  const { sideBarStatus, setSideBarStatus, selectedNode } = useBotStore(
    (state) => state
  );
  const messagHandler = async () => {
    if (
      botMessage === "" ||
      resolvedMessage === "" ||
      unresolvedMessage === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    const id = uniqid();
    const id2 = uniqid();
    const id3 = uniqid();
    let newEdges = edges.filter((edge) => edge.target !== selectedNode.id);
    let removedEdges = edges.find((edge) => edge.target === selectedNode.id);
    const newNodes = [
      {
        id: id,
        data: {
          label: botMessage,
        },
        position: { x: 0, y: 0 },
        type: "if",
      },
      {
        id: id2,
        data: {
          label: "Great! Glad to hear it!",
        },
        position: { x: 0, y: 0 },
        type: "message",
      },
      {
        id: id3,
        data: {
          label: "Sorry to hear that. Let me help you further",
        },
        position: { x: 0, y: 0 },
        type: "message",
      },
    ];
    let newEdgesList = [
      {
        ...removedEdges,
        type: removedEdges.type ? removedEdges.type : "smoothstep",
        id: `e${selectedNode.data.source}-${id}`,
        source: selectedNode.data.source,
        target: id,
      },
      {
        id: `e${id}-${id2}`,
        source: id,
        target: id2,
        type: "label",
        data: {
          label: resolvedMessage,
        },
      },
      {
        id: `e${id}-${id3}`,
        source: id,
        data: {
          label: unresolvedMessage,
        },
        target: id3,
        type: "label",
      },
    ];
    newEdges.push(...newEdgesList);
    const oldNodes = Array.from(nodeInternals.values()).filter(
      (item) => item.id !== selectedNode.id
    );
    const { nodes: layoutedNodes, edges: layoutedEdges } =
      await createGraphLayout([...oldNodes, ...newNodes], newEdges);

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    setSideBarStatus(SideBarOptions.default);
    setBotMessage("");
    setResolvedMessage("");
    setUnresolvedMessage("");
  };

  return (
    <div className=" w-full">
      <Input
        label="Bot message"
        onChange={(e) => setBotMessage(e.target.value)}
        value={botMessage}
      />
      <div className="my-4">
        <Input
          label="Resolved message"
          onChange={(e) => setResolvedMessage(e.target.value)}
          value={resolvedMessage}
        />
      </div>

      <Input
        label="Unresolved message"
        onChange={(e) => setUnresolvedMessage(e.target.value)}
        value={unresolvedMessage}
      />
      <Button onClick={messagHandler} fullWidth className="w-full mt-4">
        Add Step
      </Button>
    </div>
  );
};

export default AddAskResolved;
