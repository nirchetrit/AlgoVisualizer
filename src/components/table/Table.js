import React from "react";
import Node from "../node/Node";
import "./Table.css";
// import "./TableRow.css";

const TableRow = ({ row, onNodeClick }) => {
    const renderedRows = row.map((node) => {
        return (
            <Node
                className="node"
                node={node}
                key={node.index}
                onNodeClick={onNodeClick}
            ></Node>
        );
    });
    return <div className="table-row">{renderedRows}</div>;
};

const Table = ({ rows, onNodeClick }) => {
    const renderedRows = rows.map((row) => {
        return (
            <TableRow row={row} key={row[0].row} onNodeClick={onNodeClick}></TableRow>
        );
    });
    return <div className="table">{renderedRows}</div>;
};
export default Table;
