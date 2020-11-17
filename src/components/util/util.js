const removeFromArray = (array, obj) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            array.splice(i, 1);
        }
    }
};
const swapElemsByIndex = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};
const timeOut = async (seconds) => {
    return new Promise((r) => setTimeout(r, seconds * 1000));
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
module.exports = {
    removeFromArray,
    swapElemsByIndex,
    timeOut,
    getNeighbours
};
