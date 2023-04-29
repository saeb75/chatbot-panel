import React, { FC } from "react";
import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  getSmoothStepPath,
} from "reactflow";

const Label = ({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  borderRadius,
  centerX,
  centerY,
  data,
  offset,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius,
    centerX,
    centerY,
    offset,
  });

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -80%) translate(${targetX}px,${
              targetY - 30
            }px)`,
            padding: 10,
            borderRadius: 5,
            fontSize: 14,
            fontWeight: 700,
          }}
          className="border-2 rounded-2xl border-blue-600 shadow-md bg-blue-50"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default Label;
