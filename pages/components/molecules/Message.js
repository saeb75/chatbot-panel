import React from "react";
import { Handle, Position } from "reactflow";

const Meassege = ({ data, id }) => {
  const onEdit = () => {};
  return (
    <>
      <Handle type="target" position={Position.top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="border-t-4 rounded-md border-blue-600 shadow-md bg-white hover:opacity-50 cursor-pointer transition-all flex justify-center items-center font-sans w-48 h-full py-4 px-4">
        <p> {data.label}</p>
      </div>
    </>
  );
};

export default Meassege;
