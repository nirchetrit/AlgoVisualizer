import React from "react";
import "./Node.css";
const Node = ({ node, onNodeClick }) => {
  //   console.log("asdokj", node);
  const isStart = node.isStart ? "start" : "";
  const isFinish = node.isFinish ? "finish" : "";
  const isWall = node.isWall ? "wall" : "";
  const isSolution = node.isSolution ? "solution" : "";
  const isVisited = node.isVisited ? "visited" : "";
  const className = `node ${isStart} ${isFinish} ${isWall} ${isVisited} ${isSolution}`;
  return (
    <div className={className} onClick={() => onNodeClick(node)}>
      {node.weight}
    </div>
  );
};
export default Node;
