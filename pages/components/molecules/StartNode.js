import React from "react";
import { Handle, Position } from "reactflow";

const StartNode = ({ data, id }) => {
  return (
    <>
      <Handle type="source" position={Position.Bottom} />

      <div className="border-t-4 rounded-md border-blue-600 shadow-md bg-white hover:opacity-50 cursor-pointer transition-all flex justify-center items-center font-sans w-48 h-20">
        {data.label}
      </div>
    </>
  );
};

export default StartNode;
