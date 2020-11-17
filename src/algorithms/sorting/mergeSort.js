const { mod } = require("mathjs");

const mergeSort = (unsortedArr) => {
  const sortingSteps = [];
  const merge = (arr1, arr2) => {
    let sorted = [];
    while (arr1.length && arr2.length) {
      sortingSteps.push({ type: "compare", objects: [arr1[0], arr2[0]] });
      if (arr1[0].value < arr2[0].value) sorted.push(arr1.shift());
      else sorted.push(arr2.shift());
    }
    return sorted.concat(arr1.slice().concat(arr2.slice()));
  };

  const recMergeSort = (unsortedArr) => {
    const arr = [...unsortedArr];
    if (arr.length <= 1) {
      return arr;
    }
    let mid = Math.floor(arr.length / 2);
    let leftArr = arr.slice(0, mid);
    let rightArr = arr.slice(mid);
    sortingSteps.push({
      type: "cutInHalf",
      objects: [leftArr, rightArr],
    });

    return merge(recMergeSort(leftArr), recMergeSort(rightArr));
  };
  return [recMergeSort(unsortedArr), sortingSteps];
};

module.exports = { mergeSort };
