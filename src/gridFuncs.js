const generateNodes = (config) => {
  let nodes = [];
  for (let row = 0; row < config.height; row++) {
    let currentRow = [];
    for (let col = 0; col < config.width; col++) {
      const weightForNode = config.randomWeights
        ? Math.floor(Math.random() * 10)
        : 0;
      const currentNode = {
        index: row * config.width + col,
        row,
        col,
        isStart: !(config.startRow == row && config.startCol == col)
          ? false
          : true,
        isFinish: !(config.finishRow == row && config.finishCol == col)
          ? false
          : true,
        isVisited: false,
        isWall: false,
        isSolution: false,
        weight: weightForNode,
      };
      currentRow.push(currentNode);
    }
    nodes.push(currentRow);
  }
  return nodes;
};

const getNeighbours = (node, grid) => {
  const neighbours = [];
  const height = grid.length;
  const width = grid[0].length;
  if (node.row > 0) {
    const neighbourNode = grid[node.row - 1][node.col];
    neighbours.push(neighbourNode);
  }
  if (node.row + 1 < height) {
    const neighbourNode = grid[node.row + 1][node.col];
    neighbours.push(neighbourNode);
  }
  if (node.col > 0) {
    const neighbourNode = grid[node.row][node.col - 1];
    neighbours.push(neighbourNode);
  }
  if (node.col + 1 < width) {
    const neighbourNode = grid[node.row][node.col + 1];
    neighbours.push(neighbourNode);
  }

  return neighbours;
};

const getGridWithWalls = (startNode, finishNode, grid) => {
  let visited = [];
  let newGrid = [...grid];
  const recAddWallsToNeighbours = (node, grid, visited) => {
    if (!visited[node.index]) {
      visited[node.index] = true;
      getNeighbours(node, grid).forEach((neighbour) => {
        neighbour.isWall = !node.isWall;
        recAddWallsToNeighbours(neighbour, newGrid, visited);
      });
    }
  };
  recAddWallsToNeighbours(
    newGrid[startNode.row][startNode.col],
    newGrid,
    visited
  );
  newGrid[finishNode.row][finishNode.col].isWall = false;
  return newGrid;
};
//newGrid[startNode.row][startNode.col]
//newGrid[startNode.col][startNode.row]

// module.exports = {
//   generateNodes,
//   getNeighbours,
//   getGridWithWalls,
// };
export default generateNodes;
