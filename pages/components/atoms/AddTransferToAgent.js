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
const AddTransferToAgent = () => {
  const { setNodes, setEdges, getEdges } = useReactFlow();
  const store = useStoreApi();
  const edges = getEdges();

  const { nodeInternals } = store.getState();

  const [botFirstMessage, setBotFirstMessage] = React.useState("");
  const [botSecondMessage, setBotSecondMessage] = React.useState("");
  const [inputs, setInputs] = React.useState([
    {
      id: uniqid(),
      value: "email",
    },
  ]);
  const [inputName, setInputName] = React.useState("");
  const { sideBarStatus, setSideBarStatus, selectedNode } = useBotStore(
    (state) => state
  );
  const messagHandler = async () => {
    if (botFirstMessage === "") return;
    const id = uniqid();

    let newEdges = edges.filter((edge) => edge.target !== selectedNode.id);
    let removedEdges = edges.find((edge) => edge.target === selectedNode.id);
    const newNode = {
      id: id,
      data: {
        source: selectedNode.data.source,

        inputs,
        botFirstMessage: botFirstMessage,
        botSecondMessage: botSecondMessage,
      },
      position: { x: 0, y: 0 },
      type: "transferToAgent",
    };
    const newEdge = {
      ...removedEdges,
      type: removedEdges.type ? removedEdges.type : "smoothstep",
      id: `e${selectedNode.data.source}-${id}`,
      source: selectedNode.data.source,
      target: id,
    };
    newEdges.push(newEdge);
    const oldNodes = Array.from(nodeInternals.values()).filter(
      (item) => item.id !== selectedNode.id
    );
    console.log({ oldNodes: [...oldNodes, newNode], newEdges });
    const { nodes: layoutedNodes, edges: layoutedEdges } =
      await createGraphLayout([...oldNodes, newNode], newEdges);

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    setSideBarStatus(SideBarOptions.default);
    setBotFirstMessage("");
    setBotSecondMessage("");
    setInputs([
      {
        id: uniqid(),
        value: "email",
      },
    ]);
  };
  const addInput = () => {
    if (inputName === "") return;
    setInputs([...inputs, { id: uniqid(), value: inputName }]);
    setInputName("");
  };
  const handleChangeInputs = (value, id) => {
    const newInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, value };
      }
      return input;
    });
    setInputs(newInputs);
  };
  return (
    <div className="w-full">
      <Textarea
        label="Bot First Message"
        onChange={(e) => setBotFirstMessage(e.target.value)}
        value={botFirstMessage}
      />
      <div className="items-center mt-8">
        <Input
          type="text"
          placeholder="Input Name"
          onChange={(e) => setInputName(e.target.value)}
          value={inputName}
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
        {inputs.map((input) => (
          <Button
            onClick={() =>
              setInputs(inputs.filter((item) => item.id !== input.id))
            }
            size="sm"
          >
            {input.value}
          </Button>
        ))}
      </div>
      <Textarea
        label="Bot Second Message"
        onChange={(e) => setBotSecondMessage(e.target.value)}
        value={botSecondMessage}
      />
      <Button onClick={messagHandler} fullWidth className="w-full mt-8">
        Add Step
      </Button>
    </div>
  );
};

export default AddTransferToAgent;
