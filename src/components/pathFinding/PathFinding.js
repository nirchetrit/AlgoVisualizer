import React, { useState, useEffect, useRef } from 'react'
import Table from '../table/Table'
import GridOptions from './GridOptions'
import { generateNodes } from '../../gridFuncs'
import DropDown from '../dropDown/DropDown';
import dijkstra from '../../algorithms/pathFinding/dijkstra'
import aStar from '../../algorithms/pathFinding/aStar'



////Statics
const deafultConfig = {
    width: 5,
    height: 5,
    startRow: 0,
    startCol: 0,
    finishRow: 4,
    finishCol: 4,
    SOLVERSPEED: 0.5,
};
const algoOptions = [
    { label: "Dijkstra", value: "dijkstra" },
    { label: "A*", value: "a*" },
    { label: "BFS", value: "bfs" },
];


/////////// Component
const PathFinding = () => {
    /////////////////----states----///////////////////
    const [algoSelected, setAlgoSelected] = useState(algoOptions[0]);
    const [nodes, setNodes] = useState([]);
    const [config, setConfig] = useState(deafultConfig);
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
        setNodes(generateNodes(config))
    }, [config])



    const colorVisitedNodes = async (visitedNodesByOrder, prev, ms) => {
        for (let i = 0; i < visitedNodesByOrder.length; i++) {
            await new Promise((r) => setTimeout(r, ms));
            editNode({ ...visitedNodesByOrder[i], isVisited: true });
        }
        for (let i = 0; i < visitedNodesByOrder.length; i++) {
            await new Promise((r) => setTimeout(r, ms));
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
        let [dist, prev, visitedNodesByOrder] = [];
        switch (algoSelected.value) {
            case "dijkstra":
                /////TODO FIX what happens if someone changes the form without saving it?
                [dist, prev, visitedNodesByOrder] = dijkstra(
                    nodes,
                    nodes[config.startRow][config.startCol],
                    nodes[config.finishRow][config.finishCol]
                ); //time
                console.log('solved');
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
        colorVisitedNodes(visitedNodesByOrder, path, 100.5); //time
    };
    return (
        <div className="pathfinding">
            <GridOptions
                onSubmit={(data) => {
                    console.log(data);
                    setConfig(data)
                }}
                onReset={resetGrid}
                header={'select the grid options'}
                height={{ val: config.height }}
                width={{ val: config.width }}
                startRow={{ val: config.startRow }}
                startCol={{ val: config.startCol }}
                finishCol={config.finishCol}
                finishRow={config.finishRow}
            ></GridOptions>
            <DropDown label={"select algo"} options={algoOptions} selected={algoSelected} onSelectedChange={setAlgoSelected}></DropDown>
            <button className='ui button primary' onClick={onSolveButtonClick} >Solve</button>
            <button className='ui button'>Random Weights</button>
            <Table rows={nodes} onNodeClick={toggleWall}></Table>
        </div>
    );
}
export default PathFinding