import useBotStore, { SideBarOptions } from "@/store/bot";
import {
  Button,
  Chip,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import React from "react";
import uniqid from "uniqid";
import { useReactFlow, useStoreApi } from "reactflow";
import { createGraphLayout } from "@/pages/helper/autoLayout";
import { BiPlus } from "react-icons/bi";
const AddOptions = () => {
  const { setNodes, setEdges, getEdges } = useReactFlow();
  const store = useStoreApi();
  const edges = getEdges();

  const { nodeInternals } = store.getState();

  const [message, setMessage] = React.useState("");

  const [options, setOptions] = React.useState([
    {
      id: uniqid(),
      value: "email",
    },
  ]);
  const [optionsName, setOptionsName] = React.useState("");
  const { sideBarStatus, setSideBarStatus, selectedNode } = useBotStore(
    (state) => state
  );
  const messagHandler = async () => {
    if (message === "") return;
    const id = uniqid();
    console.log(selectedNode);
    let newEdges = edges.filter((edge) => edge.target !== selectedNode.id);
    let removedEdges = edges.find((edge) => edge.target === selectedNode.id);
    let oldNodes = Array.from(nodeInternals.values()).filter(
      (item) => item.id !== selectedNode.id
    );
    const newNode = {
      id: id,
      data: {
        label: message,
        source: selectedNode.data.source,
        options,
      },
      position: { x: 0, y: 0 },
      type: "options",
    };
    oldNodes.push(newNode);
    const newEdge = {
      ...removedEdges,
      id: `e${selectedNode.data.source}-${id}`,
      source: selectedNode.data.source,
      target: id,

      type: removedEdges.type ? removedEdges.type : "smoothstep",
    };
    newEdges.push(newEdge);
    options.forEach((option) => {
      const newNodeId = uniqid();
      const newNode = {
        id: newNodeId,
        position: { x: 0, y: 0 },
        data: { label: `2`, source: id },
        type: "empty",
      };
      const newEdge = {
        id: `e${id}-${newNodeId}`,
        source: id,
        target: newNodeId,
        type: "smoothstep",
        data: {
          label: option.value,
        },
        type: "label",
      };
      newEdges.push(newEdge);
      oldNodes.push(newNode);
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } =
      await createGraphLayout(oldNodes, newEdges);
    console.log({
      nodes: layoutedNodes,
      edges: layoutedEdges,
    });
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    setSideBarStatus(SideBarOptions.default);
    setMessage("");
  };
  const addInput = () => {
    if (optionsName === "") return;
    setOptions([...options, { id: uniqid(), value: optionsName }]);
    setOptionsName("");
  };
  const handleChangeInputs = (value, id) => {
    const newOption = options.map((input) => {
      if (input.id === id) {
        return { ...input, value };
      }
      return input;
    });
    setOptions(newOption);
  };
  return (
    <div className="w-full">
      <Textarea
        label="Message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <div className="items-center mt-8">
        <Input
          type="text"
          placeholder="Input Name"
          onChange={(e) => setOptionsName(e.target.value)}
          value={optionsName}
        />
        <IconButton
          className="flex-shrink-0 my-4 "
          size="sm"
          onClick={addInput}
        >
          <BiPlus className="text-xl font-bold" color="white" />
        </IconButton>
      </div>
      <div className="gap-2 flex flex-wrap my-4">
        {options.map((option) => (
          <Button
            onClick={() =>
              setInputs(options.filter((item) => item.id !== input.id))
            }
            size="sm"
          >
            {option.value}
          </Button>
        ))}
      </div>

      <Button onClick={messagHandler} fullWidth className="w-full mt-8">
        Add Step
      </Button>
    </div>
  );
};

export default AddOptions;
