export function isSafe(solution, row, col) {
  for (let i = 0; i < row; i++) {
    if (
      solution[i] === col ||
      solution[i] - i === col - row ||
      solution[i] + i === col + row
    ) {
      return false;
    }
  }
  return true;
}

export function solveNQueens(n) {
  let results = [];
  let solution = [];

  let backtrack = (row) => {
    if (row === n) {
      // Convert solution to board pattern
      let board = [];
      for (let i = 0; i < n; i++) {
        let rowPattern = [];
        for (let j = 0; j < n; j++) {
          rowPattern.push(solution[i] === j ? "Q" : "");
        }
        board.push(rowPattern);
      }
      results.push(board);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(solution, row, col)) {
        solution[row] = col;
        backtrack(row + 1);
      }
    }
  };

  backtrack(0);
  return results;
}
