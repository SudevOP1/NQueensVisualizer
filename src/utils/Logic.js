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

export function rotate90(board) {
  let n = board.length;
  let newBoard = [];
  for (let i = 0; i < n; i++) {
    newBoard.push([]);
  }

  // rotate: (i, j) -> (j, n-i-1)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      newBoard[j][n - i - 1] = board[i][j];
    }
  }

  return newBoard;
}

export function getYMirror(board) {
  let n = board.length;
  let newBoard = [];
  for (let i = 0; i < n; i++) {
    newBoard.push([]);
  }

  // vertical mirror: (i, j) -> (n-i-1, j)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      newBoard[n - i - 1][j] = board[i][j];
    }
  }

  return newBoard;
}

export function getXMirror(board) {
  let n = board.length;
  let newBoard = [];
  for (let i = 0; i < n; i++) {
    newBoard.push([]);
  }

  // horizontal mirror: (i, j) -> (i, n-j-1)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      newBoard[i][n - j - 1] = board[i][j];
    }
  }

  return newBoard;
}

export function isSame(s1, s2) {
  let n = s1.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (s1[i][j] !== s2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

export function isRotated(s1, s2) {
  if (
    isSame(s1, rotate90(s2)) ||
    isSame(s1, rotate90(rotate90(s2))) ||
    isSame(s1, rotate90(rotate90(rotate90(s2))))
  ) {
    return true;
  }
  return false;
}

export function isMirror(s1, s2) {
  if (isSame(s1, getXMirror(s2)) || isSame(s1, getYMirror(s2))) {
    return true;
  }
  return false;
}
