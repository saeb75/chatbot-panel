import React from "react";
import Logo from "../atoms/Logo";
import { Button, Input, Textarea } from "@material-tailwind/react";
import useBotStore, { SideBarOptions } from "@/store/bot";
import { useReactFlow, useStoreApi, getBezierPath } from "reactflow";
import uniqid from "uniqid";
import { createGraphLayout } from "@/pages/helper/autoLayout";
const SideBar = () => {
  const { setNodes, setEdges, getEdges } = useReactFlow();
  const store = useStoreApi();
  const edges = getEdges();

  const { nodeInternals } = store.getState();

  const [message, setMessage] = React.useState("");
  const { sideBarStatus, setSideBarStatus, selectedNode } = useBotStore(
    (state) => state
  );
  const changeSideBarStatus = (status) => {
    setSideBarStatus(status);
  };

  const messagHandler = async () => {
    if (message === "") return;
    const id = uniqid();

    let newEdges = edges.filter(
      (edge) => edge.source !== selectedNode.data.source
    );
    const newNode = {
      id: id,
      data: {
        label: message,
        source: selectedNode.data.source,
      },
      position: { x: 0, y: 0 },
      type: "message",
    };
    const newEdge = {
      id: `e${selectedNode.data.source}-${id}`,
      source: selectedNode.data.source,
      target: id,
      type: "smoothstep",
    };
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
    <div className="bg-white shadow-lg h-full">
      <Logo />
      <div className="flex justify-center items-center mt-12 px-4">
        {sideBarStatus === "MainOptions" && (
          <ul className=" w-full">
            <Button
              onClick={() => changeSideBarStatus(SideBarOptions.Meassege)}
              color="amber"
              fullWidth
              className="w-full"
            >
              Message
            </Button>
            <Button color="green" fullWidth className="w-full my-4">
              Present Options
            </Button>
            <Button color="blue" fullWidth className="w-full">
              Call API
            </Button>
          </ul>
        )}
        {sideBarStatus === SideBarOptions.Meassege && (
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
        )}
      </div>
    </div>
  );
};

export default SideBar;
