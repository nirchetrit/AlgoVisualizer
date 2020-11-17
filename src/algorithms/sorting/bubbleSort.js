const bubbleSort = (defaultArr) => {
  const arr = [...defaultArr];
  const solution = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      solution.push({ type: "paint", objects: [j, j + 1] });
      if (arr[j].value > arr[j + 1].value) {
        //swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        //saving the step
        solution.push({ type: "swap", objects: [j, j + 1] });
      }
    }
  }
  return [arr, solution];
};
module.exports = { bubbleSort };

