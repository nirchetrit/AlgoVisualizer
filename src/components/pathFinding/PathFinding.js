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
const solverSpeedOptions = [
    { label: 'ultra-fast', value: 0.1 },
    { label: 'fast', value: 1 },
    { label: 'slow', value: 100 }
]


/////////// Component
const PathFinding = () => {
    /////////////////----states----///////////////////
    const [algoSelected, setAlgoSelected] = useState(algoOptions[0]);
    const [nodes, setNodes] = useState([]);
    const [config, setConfig] = useState(deafultConfig);
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
        setNodes(generateNodes(config))
    }, [config])



    const colorVisitedNodes = async (visitedNodesByOrder, prev) => {
        for (let i = 0; i < visitedNodesByOrder.length; i++) {
            console.log(solverSpeed.current.value);

            await new Promise((r) => setTimeout(r, solverSpeed.current.value));
            editNode({ ...visitedNodesByOrder[i], isVisited: true });
        }
        for (let i = 0; i < visitedNodesByOrder.length; i++) {
            await new Promise((r) => setTimeout(r, solverSpeed.current.value));
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
    const addRandomWeights = () => {
        let nodesWithRandomWeights = [...nodes];
        nodesWithRandomWeights.forEach(row => {
            row.forEach(node => {
                node.weight = Math.floor(Math.random() * 100)
            })
        })
        setNodes(nodesWithRandomWeights)
    }

    return (
        <div className="pathfinding">
            <GridOptions
                onSubmit={setConfig}
                onReset={resetGrid}
                header={'select the grid options'}
                height={config.height}
                width={config.width}
                startRow={config.startRow}
                startCol={config.startCol}
                finishCol={config.finishCol}
                finishRow={config.finishRow}
            ></GridOptions>
            <DropDown label={"select algo"} options={algoOptions} selected={algoSelected} onSelectedChange={setAlgoSelected}></DropDown>
            <DropDown label={"select solving speed"} options={solverSpeedOptions} selected={solverSpeed.current} onSelectedChange={v => { solverSpeed.current = v }}></DropDown>
            <button className='ui button primary' onClick={onSolveButtonClick} >Solve</button>
            <button className='ui button' onClick={addRandomWeights}>Random Weights</button>
            <Table rows={nodes} onNodeClick={toggleWall}></Table>
        </div>
    );
}
export default PathFinding