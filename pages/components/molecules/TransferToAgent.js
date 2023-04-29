import { Button } from "@material-tailwind/react";
import React from "react";
import { Handle, Position } from "reactflow";

const TransferToAgent = ({ data }) => {
  console.log("====================================", data);
  return (
    <>
      <Handle type="target" position={Position.top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="border-t-4 rounded-md border-blue-600 shadow-md bg-white hover:opacity-50 cursor-pointer transition-all flex justify-center items-center font-sans w-48 h-full py-4 px-4">
        <div>
          <p className="mb-3"> {data.botFirstMessage}</p>
          <h1 className="font-bold">Inputs:</h1>
          <div className="gap-2 flex flex-wrap my-4">
            {data.inputs.map((input) => (
              <>
                <Button size="sm">{input.value}</Button>
              </>
            ))}
          </div>
          <p className="mt-3"> {data.botSecondMessage}</p>
        </div>
      </div>
    </>
  );
};

export default TransferToAgent;
