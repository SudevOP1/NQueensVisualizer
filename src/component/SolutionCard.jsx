import { useEffect, useState } from "react";
import WhiteQueen from "../assets/WhiteQueen.png"

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

export default SolutionCard;