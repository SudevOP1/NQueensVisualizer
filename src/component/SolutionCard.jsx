import { Maximize2, Minimize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Board from "./Board";

let SolutionCard = ({ sequence, solutionNumber, fullscreenToggle }) => {
  let n = sequence.length;
  let navigate = useNavigate();

  return (
    <div className="p-4 pb-2 rounded-2xl bg-white/10 border border-white/50 shadow-[0_4px_50px_rgba(255,255,255,0.05)]">
      <Board
        sequence={sequence}
        size={fullscreenToggle === "maximize" ? "small" : "large"}
      />
      <div className="flex items-center text-white pt-2">
        <p className="w-full text-center">Solution {solutionNumber}</p>

        {fullscreenToggle === "maximize" ? (
          <Maximize2
            onClick={() => navigate(`/?n=${n}&solution=${solutionNumber}`)}
            className="w-7 h-7 p-1 cursor-pointer hover:bg-white/10 rounded-lg transition"
          />
        ) : (
          <Minimize2
            onClick={() => navigate(`/?n=${n}`)}
            className="w-7 h-7 p-1 cursor-pointer hover:bg-white/10 rounded-lg transition"
          />
        )}
      </div>
    </div>
  );
};

export default SolutionCard;
