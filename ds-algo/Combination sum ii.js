var calculate = function (
  candidates,
  target,
  start,
  currentSum,
  selected,
  result
) {
  for (let i = start; i < candidates.length; i++) {
    if (currentSum + candidates[i] > target) continue;
    else if (currentSum + candidates[i] == target) {
      selected.push(candidates[i]);
      result.push([...selected]);
      console.log(selected);
      selected.length--;
      continue;
    } else {
      selected.push(candidates[i]);
      calculate(
        candidates,
        target,
        i + 1,
        currentSum + candidates[i],
        selected,
        result
      );
      selected.length--;
    }
  }
  return result;
};

var combinationSum2 = function (candidates, target) {
  return calculate(candidates, target, 0, 0, [], []);
};

//console.table(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
console.table(combinationSum2([1, 1, 2, 5, 6, 7, 10], 8));
//combinationSum2([2,5,2,1,2],5);
