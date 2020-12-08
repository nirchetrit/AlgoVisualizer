import React from "react";
import Node from "../node/Node";
import "./Table.css";
// import "./TableRow.css";

const TableRow = ({ row, onNodeClick, onNodeHover }) => {
  const renderedRows = row.map((node) => {
    return (
      <Node
        className="node"
        node={node}
        key={node.index}
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
      ></Node>
    );
  });
  return <div className="table-row">{renderedRows}</div>;
};

const Table = ({ rows, onNodeClick, onNodeHover, onMouseDown, onMouseUp }) => {
  const renderedRows = rows.map((row) => {
    return (
      <TableRow
        row={row}
        key={row[0].row}
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
      ></TableRow>
    );
  });
  return (
    <div className="table" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {renderedRows}
    </div>
  );
};
export default Table;
