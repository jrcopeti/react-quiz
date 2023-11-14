import "./Difficulty.css";
function Difficulty({ dispatch }) {
  return (
    <div className="category">
      <label>Select a Level</label>
      <select
        onChange={(e) =>
          dispatch({ type: "difficulty", payload: e.target.value })
        }
      >
        <option value="">-----------------------</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default Difficulty;
