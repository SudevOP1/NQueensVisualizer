import { useEffect, useState } from "react";
import WhiteQueen from "../assets/WhiteQueen.png";
import { solveNQueens } from "../utils/Logic.js";
import { useParams } from "react-router-dom";

let MainPage = () => {
  let {paramN} = useParams();
  let [n, setN] = useState(paramN || 8);
  let [solutions, setSolutions] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSubmit();
  }, []);

  let handleSubmit = () => {
    setLoading(true);
    setSolutions([]);

    setTimeout(() => {
      try {
        let intN = parseInt(n);
        if (isNaN(intN) || intN < 1) {
          alert("Please enter a valid integer greater than 0");
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
    <div className="flex min-h-screen justify-center bg-gradient-to-br from-[#000261] to-[#800031]">
      <div className="w-[90%] my-5 py-5 mb-6 rounded-2xl bg-white/7 border border-white/50 flex flex-col gap-5 items-center">
        {/* input div */}
        <div className="flex items-center gap-4">
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
            className="px-4 py-2 bg-white/20 hover:bg-white/25 hover:shadow-[0px_0px_41px_0px_rgba(255,_255,_255,_0.2)] active:bg-white/35 transition cursor-pointer rounded border border-white/50 text-white disabled:opacity-50"
          >
            Solve
          </button>
          <p className={`text-white ${loading ? "invisible" : "visible"}`}>
            {solutions.length} solutions found!
          </p>
        </div>

        {/* loader */}
        {loading && (
          <div className="flex items-center justify-center my-8">
            <svg
              className="w-10 h-10 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="ml-2 text-white">Calculating solutions...</span>
          </div>
        )}

        {!loading && (
          <div>
            <div className="flex flex-wrap gap-5 justify-center">
              {solutions.length > 0 ? (
                solutions.map((solution, index) => (
                  <SolutionCard
                    key={index}
                    sequence={solution}
                    solutionNumber={index + 1}
                  />
                ))
              ) : (
                <p className="text-white">No solutions found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

let SolutionCard = ({ sequence, solutionNumber }) => {
  let n = sequence.length;
  let [pattern, setPattern] = useState([...sequence]);
  let [activeQueen, setActiveQueen] = useState(null);

  useEffect(() => {
    if (activeQueen) {
      let newPattern = [...sequence.map((row) => [...row])];

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (
            !(i === activeQueen.row && j === activeQueen.col) &&
            (i === activeQueen.row ||
              j === activeQueen.col ||
              i - j === activeQueen.row - activeQueen.col ||
              i + j === activeQueen.row + activeQueen.col)
          ) {
            newPattern[i][j] = ".";
          }
        }
      }
      setPattern(newPattern);
    } else {
      setPattern([...sequence.map((row) => [...row])]);
    }
  }, [activeQueen]);

  return (
    <div className="p-4 pb-2 rounded-2xl bg-white/10 border border-white/50 shadow-[0_4px_50px_rgba(255,255,255,0.05)]">
      {pattern.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((col, colIndex) => (
            <div
              key={colIndex}
              className={`w-8 h-8 flex items-center justify-center text-xl ${
                (rowIndex + colIndex) % 2 === 0 ? "bg-white/20" : "bg-white/40"
              } ${
                activeQueen &&
                activeQueen.row === rowIndex &&
                activeQueen.col === colIndex
                  ? "bg-yellow-500"
                  : null
              }`}
            >
              {pattern[rowIndex][colIndex] === "Q" ? (
                <img
                  src={WhiteQueen}
                  alt="Q"
                  onClick={() => {
                    if (
                      activeQueen?.row === rowIndex &&
                      activeQueen?.col === colIndex
                    ) {
                      setActiveQueen(null);
                    } else {
                      setActiveQueen({ row: rowIndex, col: colIndex });
                    }
                  }}
                  className="w-full h-full"
                />
              ) : pattern[rowIndex][colIndex] === "." ? (
                <div className="w-full h-full bg-red-500/50"></div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
      <p className="w-full text-center text-white pt-2">
        Solution {solutionNumber}
      </p>
    </div>
  );
};

export default MainPage;
