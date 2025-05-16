import { useEffect, useState } from "react";
import { solveNQueens, isRotated, isMirror } from "../utils/Logic.js";
import { useParams } from "react-router-dom";
import SolutionCard from "../component/SolutionCard.jsx";

let NQueen = () => {
  let { paramN } = useParams();
  let [n, setN] = useState(paramN || 8);
  let [solutions, setSolutions] = useState([]);
  let [filteredSolutions, setFilteredSolutions] = useState([]);
  let [stats, setStats] = useState([]);
  let [loading, setLoading] = useState(false);
  let [filters, setFilters] = useState([
    { name: "Rotations", isChecked: false },
    { name: "Mirrors", isChecked: false },
  ]);

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    if (solutions.length > 0)
      setFilteredSolutions(getFilteredSolutions(solutions));
  }, [filters, solutions]);

  let getFilteredSolutions = (solutions) => {
    let n = solutions[0].length;
    let rotationFilter = filters.find((f) => f.name === "Rotations")?.isChecked;
    let mirrorFilter = filters.find((f) => f.name === "Mirrors")?.isChecked;

    // rotations
    let rotationIndependentSolutions = [];
    for (let i = 0; i < solutions.length; i++) {
      let shouldAdd = true;
      if (rotationFilter) {
        for (let s of rotationIndependentSolutions) {
          if (isRotated(s, solutions[i])) {
            shouldAdd = false;
            break;
          }
        }
      }
      if (shouldAdd) {
        rotationIndependentSolutions.push(solutions[i]);
      }
    }

    // mirrors
    let mirrorIndependentSolutions = [];
    if (mirrorFilter) {
      for (let i = 0; i < rotationIndependentSolutions.length; i++) {
        let shouldAdd = true;
        for (let s of mirrorIndependentSolutions) {
          if (isMirror(s, rotationIndependentSolutions[i])) {
            shouldAdd = false;
            break;
          }
        }
        if (shouldAdd) {
          mirrorIndependentSolutions.push(rotationIndependentSolutions[i]);
        }
      }
    } else {
      mirrorIndependentSolutions = rotationIndependentSolutions;
    }

    return mirrorIndependentSolutions;
  };

  let handleSubmit = () => {
    setLoading(true);
    setStats([]);

    setTimeout(() => {
      try {
        let intN = parseInt(n);
        if (isNaN(intN) || intN < 1) {
          alert("Please enter a valid integer greater than 0");
          setLoading(false);
          return;
        }
        let answer = solveNQueens(intN);
        setSolutions(answer.solutions);
        setFilteredSolutions(getFilteredSolutions(answer.solutions));
        setStats([
          {
            name: "Solutions",
            quantity: answer.solutions.length.toLocaleString(),
          },
          {
            name: "Recursive Calls",
            quantity: answer.recursiveCallsCount.toLocaleString(),
          },
          { name: "Time Taken", quantity: answer.totalTimeMs + "ms" },
          {
            name: "Solutions per Second",
            quantity: parseInt(
              (answer.solutions.length / answer.totalTimeMs) * 1000
            ).toLocaleString(),
          },
          {
            name: "Estimated Memory Used",
            quantity: `${((answer.solutions.length * intN * 8) / 1024).toFixed(
              2
            )}KB`,
          },
        ]);
      } catch (error) {
        console.error("Error solving N-Queens:", error);
      } finally {
        setLoading(false);
      }
    }, 50); // small delay to update the UI
  };

  let toggleFilter = (name) => {
    let newFilters = filters.map((f) => {
      if (f.name === name) {
        return { ...f, isChecked: !f.isChecked };
      } else {
        return f;
      }
    });
    setFilters(newFilters);
  };

  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-br from-[#000261] to-[#800031]">
      <div className="w-[90%] my-5 py-5 mb-6 rounded-2xl bg-white/7 border border-white/50 flex flex-col items-center">
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
        </div>

        {/* divider */}
        <div className=" | my-5 w-full h-0 border-sm border-b border-white/50"></div>

        {/* stats section */}
        <div className="w-full text-white text-sm px-4">
          <div
            className={`flex flex-row justify-center gap-4 text-center w-full`}
          >
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white/10 rounded-lg px-2 py-1">
                <span>{stat.quantity} </span>
                <span>{stat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className=" | my-5 w-full h-0 border-sm border-b border-white/50"></div>

        {/* filters */}
        <div className="w-full text-white text-sm px-4">
          <div
            className={`flex flex-row justify-center gap-4 text-center w-full`}
          >
            {filters.map((filter) => (
              <div
                key={filter.name}
                className="bg-white/10 rounded-lg px-2 py-1 flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={!filter.isChecked}
                  onChange={() => toggleFilter(filter.name)}
                  className="accent-white w-4 h-4 rounded-sm border-gray-300 cursor-pointer"
                />
                <span>Show {filter.name}</span>
              </div>
            ))}
            <div className="bg-white/10 rounded-lg px-2 py-1">
              <span>{filteredSolutions.length} Filtered Solutions</span>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className=" | my-5 w-full h-0 border-sm border-b border-white/50"></div>

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

        {/* solutions */}
        {!loading && (
          <div>
            <div className="flex flex-wrap gap-5 justify-center">
              {filteredSolutions.length > 0 ? (
                filteredSolutions.map((solution, index) => (
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

export default NQueen;
