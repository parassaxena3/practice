/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: [1,2,2, 3, 5,6]

// Input: nums1 = [1,2,6,9,0,0,0], m = 4, nums2 = [2,5,6], n = 3
// Output: [1,2,2,5,6,6,9]
//[]

var merge = function (nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1,
    k = m + n - 1;
  while (i >= 0 || j >= 0) {
    if (i < 0) nums1[k--] = nums2[j--];
    else if (j < 0) nums1[k--] = nums1[i--];
    else if (nums1[i] >= nums2[j]) nums1[k--] = nums1[i--];
    else nums1[k--] = nums2[j--];
  }
};
//swap(s, i, j);
// var merge = function (nums1, m, nums2, n) {
//   let result = [],
//     i = 0,
//     j = 0,
//     k = 0;
//   while (i < m || j < n) {
//     if (i == m) result[k++] = nums2[j++];
//     else if (j == n) result[k++] = nums1[i++];
//     else if (nums1[i] <= nums2[j]) result[k++] = nums1[i++];
//     else result[k++] = nums2[j++];
//   }

//   Object.assign(nums1, result);
//   // result.forEach((x, i) => (nums1[i] = x));
// };

let num1 = [1, 2, 3, 0, 0, 0];
merge(num1, 3, [2, 5, 6], 3);
console.log(num1);
