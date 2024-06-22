let a = 1;
function getPath(matrix, i, j, m, n, path) {
  if (i == m - 1 && j == n - 1) {
   // console.log(path.join(""), a++);
    return;
  }
 // matrix[i][j] = 0;
  if (i < m - 1 && matrix[i + 1][j])
    getPath(matrix, i + 1, j, m, n, [...path, "D"]);

  if (j < n - 1 && matrix[i][j + 1])
    getPath(matrix, i, j + 1, m, n, [...path, "R"]);

  if (i > 0 && matrix[i - 1][j])
    getPath(matrix, i - 1, j, m, n, [...path, "U"]);

  if (j > 0 && matrix[i][j - 1])
    getPath(matrix, i, j - 1, m, n, [...path, "L"]);

 // matrix[i][j] = 1;
}
function ratInAMaze(matrix) {
  let m = matrix.length,
    n = matrix[0]?.length;
  if (n) getPath(matrix, 0, 0, m, n, []);
}

// ratInAMaze([
//   [1, 1, 1],
//   [1, 1, 1],
// ]);
ratInAMaze([
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
]);
// ratInAMaze([
//   [1, 1, 1],
//   [1, 1, 1],
// ]);


[[]]