import "./NumQuestions.css";

function NumQuestions({ numQuestions, dispatch }) {
  // const numberRef = useRef(null);
  // const displayRef = useRef(null);

  // function handleRangeChange() {
  //   displayRef.current.textContent = numberRef.current.value;
  // }

  return (
    <div className="category">
      <label>Select the number of questions</label>
      <select
        value={numQuestions}
        onChange={(e) =>
          dispatch({ type: "numQuestions", payload: e.target.value })
        }
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
    </div>

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
  );
}

export default NumQuestions;
