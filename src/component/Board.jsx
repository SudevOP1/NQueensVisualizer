import { useState, useEffect } from "react";
import WhiteQueen from "../assets/WhiteQueen.png";

const Board = ({ sequence, size }) => {
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

  if (size === "large") {
    return (
      <div
        className="w-full max-w-[min(60vmin,600px)] aspect-square grid"
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        {pattern.flatMap((row, rowIndex) =>
          row.map((col, colIndex) => {
            const isQueen = pattern[rowIndex][colIndex] === "Q";
            const isAttacked = pattern[rowIndex][colIndex] === ".";
            const isActive =
              activeQueen?.row === rowIndex && activeQueen?.col === colIndex;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex items-center justify-center text-xl 
                  ${
                    (rowIndex + colIndex) % 2 === 0
                      ? "bg-white/20"
                      : "bg-white/40"
                  } 
                  ${isActive ? "bg-yellow-500" : ""}
                  relative`}
                onClick={() => {
                  if (isQueen) {
                    if (isActive) {
                      setActiveQueen(null);
                    } else {
                      setActiveQueen({ row: rowIndex, col: colIndex });
                    }
                  }
                }}
              >
                {isQueen ? (
                  <img src={WhiteQueen} alt="Q" className="w-full h-full" />
                ) : isAttacked ? (
                  <div className="w-full h-full bg-red-500/50"></div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    );
  }

  if (size === "small") {
    return (
      <div>
        {pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((col, colIndex) => {
              const isQueen = pattern[rowIndex][colIndex] === "Q";
              const isAttacked = pattern[rowIndex][colIndex] === ".";
              const isActive =
                activeQueen?.row === rowIndex && activeQueen?.col === colIndex;

              return (
                <div
                  key={colIndex}
                  className={`w-8 h-8 flex items-center justify-center text-xl 
                  ${
                    (rowIndex + colIndex) % 2 === 0
                      ? "bg-white/20"
                      : "bg-white/40"
                  } 
                  ${isActive ? "bg-yellow-500" : ""}`}
                  onClick={() => {
                    if (isQueen) {
                      if (isActive) {
                        setActiveQueen(null);
                      } else {
                        setActiveQueen({ row: rowIndex, col: colIndex });
                      }
                    }
                  }}
                >
                  {isQueen ? (
                    <img src={WhiteQueen} alt="Q" className="w-full h-full" />
                  ) : isAttacked ? (
                    <div className="w-full h-full bg-red-500/50"></div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
};

export default Board;
