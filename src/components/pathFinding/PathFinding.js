import React, { useState, useEffect, useRef, useReducer } from "react";
import Table from "../table/Table";
import GridOptions from "./GridOptions";
import { generateNodes } from "../../gridFuncs";
import DropDown from "../dropDown/DropDown";
import dijkstra from "../../algorithms/pathFinding/dijkstra";
import aStar from "../../algorithms/pathFinding/aStar";
import { timeOut } from "../util/util";

const useForceRerender = () => useReducer((state) => !state, false)[1];

////Statics
const deafultConfig = {
  width: 5,
  height: 5,
  startRow: 0,
  startCol: 0,
  finishRow: 4,
  finishCol: 4,
  randomWeights: false,
};
const algoOptions = [
  { label: "Dijkstra", value: "dijkstra" },
  { label: "A*", value: "a*" },
  { label: "BFS", value: "bfs" },
];
const solverSpeedOptions = [
  { label: "fast", value: 0.01 },
  { label: "normal", value: 0.5 },
  { label: "slow", value: 1 },
];

/////////// Component
const PathFinding = () => {
  /////////////////----states----///////////////////
  const [algoSelected, setAlgoSelected] = useState(algoOptions[0]);
  const [nodes, setNodes] = useState([]);
  const [config, setConfig] = useState(deafultConfig);
  const [selectedSolvingSpeed, setSelectedSolvingSpeed] = useState(
    solverSpeedOptions[0]
  );
  const solverSpeed = useRef(solverSpeedOptions[0]);
  /////////////////----states----///////////////////

  const resetGrid = () => {
    setConfig(deafultConfig);
    setNodes(generateNodes(deafultConfig));
  };
  const toggleWall = (node) => {
    editNode({ ...node, isWall: !node.isWall });
  };
  const editNode = (node) => {
    setNodes((prevNodes) =>
      prevNodes.map((currRow) => {
        return currRow.map((currNode) => {
          if (currNode.index === node.index) currNode = node;
          return currNode;
        });
      })
    );
  };
  //componentDidMount
  useEffect(() => {
    setNodes(generateNodes(deafultConfig));
  }, []);

  useEffect(() => {
    setNodes(generateNodes(config));
  }, [config]);

  const colorVisitedNodes = async (visitedNodesByOrder, prev) => {
    for (let i = 0; i < visitedNodesByOrder.length; i++) {
      await timeOut(solverSpeed.current.value);
      editNode({ ...visitedNodesByOrder[i], isVisited: true });
    }
    for (let i = 0; i < visitedNodesByOrder.length; i++) {
      await timeOut(solverSpeed.current.value);
      let node = visitedNodesByOrder[i];
      if (prev.includes(node)) {
        editNode({ ...node, isSolution: true });
      }
    }
  };

  const getSolutionPath = (map, finishNode, height, width) => {
    let path = [];
    let prevNodeIndex = map[finishNode.index];
    while (prevNodeIndex !== undefined) {
      let x = prevNodeIndex % nodes[0].length;
      let y = Math.floor((prevNodeIndex / nodes[0].length) % nodes.length);
      let prevNode = nodes[y][x];
      path.push(prevNode);
      prevNodeIndex = map[prevNode.index];
    }
    return path;
  };
  const onSolveButtonClick = () => {
    let [dist, prev, visitedNodesByOrder] = [[], [], []];
    switch (algoSelected.value) {
      case "dijkstra":
        [dist, prev, visitedNodesByOrder] = dijkstra(
          nodes,
          nodes[config.startRow][config.startCol],
          nodes[config.finishRow][config.finishCol]
        );
        break;
      case "bfs":
        alert("not yet shlomi");
        break;
      case "a*":
        [prev, visitedNodesByOrder] = aStar(
          nodes,
          nodes[config.startRow][config.startCol],
          nodes[config.finishRow][config.finishCol]
        );
        break;
      default:
        alert("select something");
    }
    let path = getSolutionPath(prev, nodes[config.finishRow][config.finishCol]);
    colorVisitedNodes(visitedNodesByOrder, path); //time
  };

  return (
    <div className="pathfinding">
      <GridOptions
        onSubmit={setConfig}
        onReset={resetGrid}
        header={"select the grid options"}
        height={config.height}
        width={config.width}
        startRow={config.startRow}
        startCol={config.startCol}
        finishCol={config.finishCol}
        finishRow={config.finishRow}
        randomWeights={config.randomWeights}
      ></GridOptions>
      <DropDown
        label={"select algo"}
        options={algoOptions}
        selected={algoSelected}
        onSelectedChange={setAlgoSelected}
      ></DropDown>
      {/* TODO FIX - because its not a state - when selecting a solving speed its not rendering */}
      {/* <DropDown label={"select solving speed"} options={solverSpeedOptions} selected={selectedSolvingSpeed} onSelectedChange={setSelectedSolvingSpeed}></DropDown> */}
      <button className="ui button primary" onClick={onSolveButtonClick}>
        Solve
      </button>

      <Table rows={nodes} onNodeClick={toggleWall}></Table>
    </div>
  );
};
export default PathFinding;
