import "./PreviousButton.css";
function PreviousButton({ dispatch, index }) {
  if (index === 0) return null;

  if (index !== 0)
    return (
      <button
        className="next-previous-button"
        onClick={() => dispatch({ type: "previousQuestion" })}
      >
        &larr;
      </button>
    );
}
export default PreviousButton;
