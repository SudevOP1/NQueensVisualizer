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
  let recursiveCallsCount = 0;
  let startTime = performance.now();

  let backtrack = (row) => {
    recursiveCallsCount++;
    if (row === n) {
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
  let endTime = performance.now();
  let totalTimeMs = (endTime - startTime).toFixed(2);
  return {
    solutions: results,
    recursiveCallsCount: recursiveCallsCount,
    totalTimeMs: totalTimeMs,
  };
}
