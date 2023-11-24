import "./NumQuestions.css";

function NumQuestions({ numQuestions, dispatch }) {
  return (
    <div className="category">
      <label>Select the number of questions</label>
      <select
        value={numQuestions}
        onChange={(e) =>
          dispatch({ type: "numQuestions", payload: e.target.value })
        }
      >
        <option value="">-----------------------</option>
        {Array.from({ length: 18 }, (_, i) => i + 3).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
}

// If you want to use input range, you can do it like this:
// import { useRef } from "react";

// const numberRef = useRef(null);
// const displayRef = useRef(null);

// function handleRangeChange() {
//   displayRef.current.textContent = numberRef.current.value;
// }

// <div>
//   <input
//     ref={numberRef}
//     type="range"
//     min="3"
//     max="20"
//     step="1"
//     defaultValue="1"
//     onChange={handleRangeChange}
//   />
//   <span ref={displayRef}>1</span>
//   <button
//     onClick={() =>
//       dispatch({ type: "numQuestions", payload: numberRef.current.value })
//     }
//   >
//     Confirm
//   </button>
// </div>

export default NumQuestions;
