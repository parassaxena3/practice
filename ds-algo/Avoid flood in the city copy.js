const Queue = require("./Queue");

var findNextRainyDayLake = function (rains, upcomingLakesWithRains, rainMap) {
  for (var i = start; i < rains.length; i++) {
    if (rains[i] != 0 && rainMap[rains[i]]) {
      return rains[i];
    }
  }
  return rainMap[Object.keys(rainMap)[0]];
};
var avoidFlood = function (rains) {
  var ans = [];
  var filledLakes = {};
  var upcomingLakesWithRains = new Queue();
  for (i = 0; i < rains.length; i++) {
    if (rains[i] > 0) {
      upcomingLakesWithRains.push(i);
    }
  }
  var rainPresentOverLake = rains.find((x) => x > 0);
  for (i = 0; i < rains.length; i++) {
    if (rains[i] > 0) {
      if (filledLakes[rains[i]]) return [];
      filledLakes[rains[i]] = 1;
      ans.push(-1);
      if (upcomingLakesWithRains.peek() <= i) upcomingLakesWithRains.pop();
    } else {
      if (Object.keys(filledLakes).length) {
        var key = findNextRainyDayLake(
          rains,
          upcomingLakesWithRains,
          filledLakes
        );
        if (filledLakes[key] > 1) {
          filledLakes[key]--;
        } else delete filledLakes[key];
        ans.push(key);
      } else {
        ans.push(rainPresentOverLake);
      }
    }
  }
  let floodCantBeAvoided = false;
  Object.keys(filledLakes).forEach((key) => {
    if (filledLakes[key] > 1) floodCantBeAvoided = true;
  });
  console.log(floodCantBeAvoided);
  return floodCantBeAvoided ? [] : ans;
};

console.log(avoidFlood([1, 2, 3, 4]));

console.log(avoidFlood([1, 2, 0, 0, 2, 1]));
console.log(avoidFlood([1, 2, 0, 1, 2]));
console.log(avoidFlood([69, 0, 0, 0, 69]));
console.log(avoidFlood([1, 1, 0, 0]));
console.log(avoidFlood([1, 2, 0, 2, 3, 0, 1]));
console.log(avoidFlood([1, 0, 2, 0]));
console.log(avoidFlood([1, 0, 2, 0, 2, 1]));

// console.log(avoidFlood([1, 2, 3, 4]));
// console.log(avoidFlood([1, 2, 0, 0, 2, 1]));
// console.log(avoidFlood([1, 2, 0, 1, 2]));
// console.log(avoidFlood([69, 0, 0, 0, 69]));
// console.log(avoidFlood([1, 1, 0, 0]));
// console.log(avoidFlood([1, 2, 0, 2, 3, 0, 1]));
// console.log(avoidFlood([1, 0, 2, 0]));
console.log(avoidFlood([1, 0, 2, 0, 2, 1]));
