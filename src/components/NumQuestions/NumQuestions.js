import React, { useRef } from "react";

function NumQuestions({ dispatch }) {
  const numberRef = useRef(null);
  const displayRef = useRef(null);

  function handleRangeChange() {
    displayRef.current.textContent = numberRef.current.value;
  }

  return (
    <div>
      <input
        ref={numberRef}
        type="range"
        min="3"
        max="20"
        step="1"
        defaultValue="1"
        onChange={handleRangeChange}
      />
      <span ref={displayRef}>1</span>
      <button
        onClick={() =>
          dispatch({ type: "numQuestions", payload: numberRef.current.value })
        }
      >
        Confirm
      </button>
    </div>
  );
}

export default NumQuestions;
