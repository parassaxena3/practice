var reverseArray = function (arr, start, end) {
  let temp,
    iteration = 0;
  for (let i = start; i < (start + end) / 2; i++) {
    temp = arr[i];
    arr[i] = arr[end - iteration];
    arr[end - iteration] = temp;
    iteration++;
  }
};
var rotate = function (nums, k) {
  k = k % nums.length;
  reverseArray(nums, 0, nums.length - 1);
  reverseArray(nums, 0, k - 1);
  reverseArray(nums, k, nums.length - 1);
};

let nums = [1, 2, 3, 4, 5, 6, 7],
  k = 3;

rotate(nums, k);
console.log(nums);
