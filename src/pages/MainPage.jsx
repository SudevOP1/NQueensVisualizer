import { useEffect, useState } from "react";
import WhiteQueen from "../assets/WhiteQueen.png";

const MainPage = () => {
  let [n, setN] = useState(8);
  let [solutions, setSolutions] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSubmit();
  }, []);

  let isSafe = (solution, row, col) => {
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
  };

  let solveNQueens = async (n) => {
    let results = [];
    let solution = [];

    let backtrack = (row) => {
      if (row === n) {
        results.push([...solution]);
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
  };

  let handleSubmit = async () => {
    setLoading(true);
    let intN = parseInt(n);
    let sols = await solveNQueens(intN);
    setSolutions(sols);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-fuchsia-500">
      <div className="w-[90%] my-5 p-6 rounded-2xl bg-white/10 border border-white/50">
        <input
          type="number"
          value={n}
          onChange={(e) => setN(e.target.value)}
          id="inputN"
          min="1"
        />
        <button onClick={handleSubmit}>Solve</button>
        {loading ? (
          <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {solutions.map((solution) => (
              <SolutionCard sequence={solution} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

let SolutionCard = ({ sequence }) => {
  let pattern = [];
  for (let i = 0; i < sequence.length; i++) {
    pattern[i] = [];
    for (let j = 0; j < sequence.length; j++) {
      pattern[i][j] = sequence[i] === j ? "Q" : "";
    }
  }

  return (
    <div className="p-4 w-fit h-fit rounded-2xl bg-white/10 border border-white/50">
      {pattern.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((col, colIndex) => (
            <div
              key={colIndex}
              className={`w-8 h-8 flex items-center justify-center text-xl ${
                (rowIndex + colIndex) % 2 === 0 ? "bg-white/20" : "bg-white/40"
              }`}
            >
              {pattern[rowIndex][colIndex] === "Q" ? (
                <img src={WhiteQueen} alt="Q" className="w-full h-full" />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MainPage;
