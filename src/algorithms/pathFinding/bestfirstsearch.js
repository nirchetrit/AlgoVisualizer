const bfs = (grid, startNode, finishNode) => {
  console.log("bfs");
  if (!grid || !startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let solution = grid.slice();
  let pq = [];
  //   solution.forEach((row) => {
  //     row.nodes.forEach((v) => {
  //       v.dist = Infinity;
  //       v.prev = undefined;
  //       pq.push(v);
  //     });
  //   });

  //todo need to fix the algo !
  pq.push(startNode);
  while (pq.length) {
    let u = pq.shift();
    u.isVisited = true;
    if (u === finishNode) {
      return solution;
    }
    var neighbours = getNeighbours(u, solution);
    for (let index = 0; index < neighbours.length; index++) {
      const v = neighbours[index];
      if (!v.isVisited) {
        v.isVisited = true;
        v.prev = u;
        pq.push(v);
        pq.sort((a, b) => {
          return a.dist - b.dist;
        });
      }
    }
  }

  return solution;
};
export default bfs;
const getNeighbours = (node, grid) => {
  const neighbours = [];
  const height = grid.length;
  const width = grid[0].nodes.length;
  if (node.row - 1 >= 0 && !grid[node.row - 1].nodes[node.col].isVisited) {
    const neighbourNode = grid[node.row - 1].nodes[node.col];
    neighbours.push(neighbourNode);
  }
  if (node.row + 1 < height && !grid[node.row + 1].nodes[node.col].isVisited) {
    const neighbourNode = grid[node.row + 1].nodes[node.col];
    neighbours.push(neighbourNode);
  }
  if (node.col - 1 >= 0 && !grid[node.row].nodes[node.col - 1].isVisited) {
    const neighbourNode = grid[node.row].nodes[node.col - 1];
    neighbours.push(neighbourNode);
  }
  if (node.col + 1 < width && !grid[node.row].nodes[node.col + 1].isVisited) {
    const neighbourNode = grid[node.row].nodes[node.col + 1];
    neighbours.push(neighbourNode);
  }
  return neighbours;
};
