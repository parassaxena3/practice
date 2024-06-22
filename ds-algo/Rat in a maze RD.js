function getPath(matrix, i, j, m, n, path) {
  if (i == m - 1 && j == n - 1) {
    console.log(path.join(""));
    return;
  }
  if (i < m - 1 && matrix[i + 1][j])
    getPath(matrix, i + 1, j, m, n, [...path, "D"]);

  if (j < n - 1 && matrix[i][j + 1])
    getPath(matrix, i, j + 1, m, n, [...path, "R"]);
}
function ratInAMaze(matrix) {
  let n = matrix.length,
    m = matrix[0]?.length;
  if (m) getPath(matrix, 0, 0, m, n, []);
}

ratInAMaze([
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [1, 1, 0, 0],
  [0, 1, 1, 1],
]);

// ratInAMaze([
//   [1, 0],
//   [1, 0],
// ]);
