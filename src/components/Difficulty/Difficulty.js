import "./Difficulty.css";
function Difficulty({ dispatch }) {
  return (
    <div className="category">
      <select
        onChange={(e) =>
          dispatch({ type: "difficulty", payload: e.target.value })
        }
      >
        <option value="">--Please choose a LEVEL--</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default Difficulty;
