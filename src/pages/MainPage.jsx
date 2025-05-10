import { useEffect, useState } from "react";
import WhiteQueen from "../assets/WhiteQueen.png";

let MainPage = () => {
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

  let solveNQueens = (n) => {
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

  let handleSubmit = () => {
    setLoading(true);
    setSolutions([]);
    
    setTimeout(() => {
      try {
        let intN = parseInt(n);
        if (isNaN(intN) || intN < 1) {
          alert("Please enter a valid number greater than 0");
          setLoading(false);
          return;
        }
        let sols = solveNQueens(intN);
        setSolutions(sols);
      } catch (error) {
        console.error("Error solving N-Queens:", error);
      } finally {
        setLoading(false);
      }
    }, 50); // small delay to update the UI
  };

  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-br from-blue-600 to-fuchsia-500">
      <div className="w-[90%] my-5 p-6 rounded-2xl bg-white/10 border border-white/50">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-4 mb-4">
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              id="inputN"
              min="1"
              className="p-2 rounded bg-white/20 border border-white/50 text-white"
            />
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded border border-white/50 text-white disabled:opacity-50"
            >
              Solve
            </button>
          </div>
          
          {loading && (
            <div className="flex items-center justify-center my-8">
              <svg className="w-10 h-10 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-2 text-white">Calculating solutions...</span>
            </div>
          )}
        </div>
        
        {!loading && (
          <div className="flex flex-wrap gap-4 justify-center">
            {solutions.length > 0 ? (
              solutions.map((solution, index) => (
                <SolutionCard key={index} sequence={solution} />
              ))
            ) : (
              <p className="text-white">No solutions found</p>
            )}
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
    <div className="p-4 rounded-2xl bg-white/10 border border-white/50">
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