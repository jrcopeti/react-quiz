import "./PreviousButton.css";
function PreviousButton({ dispatch, index, answer }) {
  if (answer === undefined) return null;
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
