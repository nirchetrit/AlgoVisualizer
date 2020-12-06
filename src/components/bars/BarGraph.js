import React from "react";
import "./BarGraph.css";

const Bar = ({ bar }) => {
  return (
    <div
      className="bar"
      style={{
        height: `${bar.value}%`,
        background: `${bar.color}`,
      }}
    ></div>
  );
};

const BarGraph = ({ bars }) => {
  return bars.map((bar) => {
    return <Bar key={bar.id} bar={bar}></Bar>;
  });
};
export default BarGraph;
