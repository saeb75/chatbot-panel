import useBotStore, { SideBarOptions } from "@/store/bot";
import React from "react";
import { Handle, Position } from "reactflow";

const EmptyNode = (data) => {
  const { setSelectedNode, setSideBarStatus } = useBotStore((state) => state);
  const HandleEmptyNode = () => {
    setSelectedNode(data);
    setSideBarStatus(SideBarOptions.MainOptions);
  };
  return (
    <>
      <Handle type="target" position={Position.Top} id="empty" />
      <button
        onClick={HandleEmptyNode}
        className="border-4 rounded-md border-blue-600 shadow-md bg-blue-50 hover:opacity-50 cursor-pointer transition-all flex justify-center items-center font-sans w-48 h-20"
      >
        <h1>+ Add Step</h1>
      </button>
    </>
  );
};

export default EmptyNode;
