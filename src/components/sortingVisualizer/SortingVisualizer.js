import React, { useEffect, useRef, useState } from "react";
import DropDown from "../dropDown/DropDown";
import BarGraph from "../bars/BarGraph";
import { bubbleSort } from "../../algorithms/sorting/bubbleSort";
import { timeOut } from "../util/util";
import "./SortingVisualizer.css";
const generateBars = (count, range) => {
  let bars = [];
  for (let i = 0; i < count; i++) {
    bars.push({
      id: i,
      value: Math.floor(Math.random() * range) + 1,
      color: "#aaa",
    });
  }
  return bars;
};
const animationSpeedOptions = [
  { label: "fast", value: 0.01 },
  { label: "normal", value: 0.5 },
  { label: "slow", value: 1 },
];

const sortAlgoOptions = [
  { label: "bubbleSort", value: "bubblesort" },
  { label: "Merge Sort", value: "mergesort" },
];
const getSwappedArrayElementsByIndices = (arr, index1, index2) => {
  let newState = [...arr];
  const temp = newState[index1];
  newState[index1] = newState[index2];
  newState[index2] = temp;
  return newState;
};
const SortingVisualizer = () => {
  //------------------------------states---------------------------------------/////
  const [sortAlgo, setSortAlgo] = useState(sortAlgoOptions[0]);
  const [barsAmount, setBarsAmount] = useState(50);
  const [bars, setBars] = useState(generateBars(barsAmount, 100));
  const [animationSpeed, setAnimationSpeed] = useState(
    animationSpeedOptions[0]
  );
  const solverSpeed = useRef(animationSpeed);

  //------------------------------states---------------------------------------/////
  useEffect(() => {
    solverSpeed.current = animationSpeed;
  }, [animationSpeed]);

  const paintBars = (indices, color) => {
    setBars((prevState) => {
      let newState = [...prevState];
      indices.forEach((index) => {
        newState[index].color = color;
      });
      return newState;
    });
  };
  const swapBars = (i, j) => {
    setBars((prevState) => {
      return getSwappedArrayElementsByIndices(prevState, i, j);
    });
  };
  useEffect(() => {
    setBars(generateBars(barsAmount, 100));
  }, [barsAmount]);
  const onSolveButtonClick = async () => {
    let [sortedArr, solutionSteps] = bubbleSort(bars);
    let updatedSolutionSteps = solutionSteps.reduce((acc, curr) => {
      if (curr.type === "paint") {
        return acc
          .concat({ ...curr, color: "rgb(209,170,170)" })
          .concat({ ...curr, color: "#aaa" });
      } else {
        return acc.concat(curr);
      }
    }, []);
    for (let i = 0; i < updatedSolutionSteps.length; i++) {
      let step = updatedSolutionSteps[i];
      await timeOut(solverSpeed.current.value);
      switch (step.type) {
        case "paint":
          paintBars(step.objects, step.color);
          break;
        case "swap":
          swapBars(step.objects[0], step.objects[1]);
          break;
        default:
          console.log("def");
          break;
      }
    }
  };
  return (
    <div className="sorting-visualizer">
      <div className="left-column">
        <DropDown
          label={"select algo"}
          options={sortAlgoOptions}
          selected={sortAlgo}
          onSelectedChange={setSortAlgo}
        ></DropDown>
        <DropDown
          label={"select animation speed"}
          options={animationSpeedOptions}
          selected={animationSpeed}
          onSelectedChange={setAnimationSpeed}
        ></DropDown>
        <div>
          <label>How Many bars to draw ?</label>
          <input
            value={barsAmount}
            onChange={(e) => {
              setBarsAmount(parseInt(e.target.value));
            }}
          ></input>
        </div>
        <button className="ui button primary" onClick={onSolveButtonClick}>
          Solve
        </button>
      </div>
      <div className="right-column">
        <div className="bar-graph">
          <BarGraph bars={bars}></BarGraph>
        </div>
      </div>
    </div>
  );
};
export default SortingVisualizer;
