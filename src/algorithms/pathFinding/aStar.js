import { FibonacciHeap } from "@tyriar/fibonacci-heap";
import { getNeighbours } from "../../components/gridFuncs";
import { removeFromArray } from "../../components/util";
///todo - move to a folder -- globalFuncs

const h = (a, b) => {
  let dist = Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  return dist;
};
///todo-move to something realted to the grids

const aStar = (gridc, startNode, finishNode) => {
  let grid = gridc.slice();
  let visitedNodesByOrder = [];
  let prev = {};
  let openSet = [];
  let fib = new FibonacciHeap();
  let closedSet = [];
  let gScore = {};

  grid.forEach((row) => {
    row.forEach((node) => {
      gScore[node.index] = Infinity;
    });
  });
  gScore[startNode.index] = 0;

  openSet.push(startNode);
  fib.insert(h(startNode, finishNode), startNode);

  while (openSet.length) {
    let current = fib.extractMinimum();
    visitedNodesByOrder.push(current.value);
    if (!openSet.includes(current.value)) {
      continue;
    }
    if (current.value === finishNode) {
      return [prev, visitedNodesByOrder];
    }

    removeFromArray(openSet, current.value);
    closedSet.push(current.value);

    var neighbours = getNeighbours(current.value, grid);
    // console.log(current.value, neighbours);
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!neighbour.isWall) {
        let tentative_gScore = gScore[current.value.index] + 1;
        if (tentative_gScore < gScore[neighbour.index]) {
          prev[neighbour.index] = current.value.index;
          gScore[neighbour.index] = tentative_gScore;
          fib.insert(
            gScore[neighbour.index] + h(neighbour, finishNode),
            neighbour
          );
          if (!openSet.includes(neighbour)) {
            openSet.push(neighbour);
          }
        }
      }
    }
  }

  return [prev, visitedNodesByOrder];
};
export default aStar;
