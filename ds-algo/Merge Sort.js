function mergeArrays(left, right) {
  let l_index = 0,
    r_index = 0,
    arr = [];
  while (l_index < left.length || r_index < right.length) {
    if (l_index == left.length) arr.push(right[r_index++]);
    else if (r_index == right.length) arr.push(left[l_index++]);
    else if (left[l_index] <= right[r_index]) arr.push(left[l_index++]);
    else arr.push(right[r_index++]);
  }
  console.log("left:" + left + "  right:" + right + "   merged:" + arr);

  return arr;
}
function mergeSort(a, start, end) {
  if (start == end) {
    return a.slice(start, end + 1);
  }
  let mid = Math.floor((start + end) / 2);
  let left = mergeSort(a, start, mid);
  let right = mergeSort(a, mid + 1, end);
  return mergeArrays(left, right);
}

function sort(a) {
  return mergeSort(a, 0, a.length - 1);
}

sort([4, 1, 3, 6, 15, 9, 7, 0]);
