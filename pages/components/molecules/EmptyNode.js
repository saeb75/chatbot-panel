import React from "react";
import { Handle, Position } from "reactflow";

const EmptyNode = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} id="empty" />
      <div className="border-4 rounded-md border-blue-600 shadow-md bg-blue-50 hover:opacity-50 cursor-pointer transition-all flex justify-center items-center font-sans w-48 h-20">
        <h1>+ Add Node</h1>
      </div>
    </>
  );
};

export default EmptyNode;
