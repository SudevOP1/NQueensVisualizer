import { useEffect, useState } from "react";
import WhiteQueen from "../assets/WhiteQueen.png";
import {solveNQueens} from "../utils/Logic.js"

let MainPage = () => {
  let [n, setN] = useState(5);
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
      <div className="w-[90%] my-5 rounded-2xl bg-white/7 border border-white/50 flex flex-col gap-5 items-center mb-6">
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
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded border border-white/50 text-white disabled:opacity-50"
          >
            Solve
          </button>
          <br />
          {!loading && (
            <p className="text-white">{solutions.length} solutions found!</p>
          )}
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
                  <SolutionCard key={index} sequence={solution} />
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

let SolutionCard = ({ sequence }) => {
  return (
    <div className="p-4 rounded-2xl bg-white/10 border border-white/50 shadow-[0_4px_50px_rgba(255,255,255,0.05)]">
      {sequence.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((col, colIndex) => (
            <div
              key={colIndex}
              className={`w-8 h-8 flex items-center justify-center text-xl ${
                (rowIndex + colIndex) % 2 === 0 ? "bg-white/20" : "bg-white/40"
              }`}
            >
              {sequence[rowIndex][colIndex] === "Q" ? (
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
