function findRow(matrix, target, totalCols) {
  var start = 0,
    end = matrix.length - 1,
    mid;

  while (end >= start) {
    mid = Math.floor((start + end) / 2);
    if (target < matrix[mid][0]) end = mid - 1;
    else if (target <= matrix[mid][totalCols - 1]) return mid;
    else start = mid + 1;
  }
  return mid;
}

function findCol(target, matrix, row, totalCols) {
  var start = 0,
    end = totalCols - 1,
    mid;
 
  while (end >= start) {
    mid = Math.floor((start + end) / 2);
    if (target < matrix[row][mid]) end = mid - 1;
    else if (target == matrix[row][mid]) return mid;
    else start = mid + 1;
  }
  return null;
}

var searchMatrix = function (matrix, target) {
  var totalCols = matrix[0]?.length ?? 0;
  var row = findRow(matrix, target, totalCols);
  var col = findCol(target, matrix, row, totalCols);
  console.log(row, " ", col, row != null && col != null);
return row != null && col != null;
};

searchMatrix(
  [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ],
  60
);
