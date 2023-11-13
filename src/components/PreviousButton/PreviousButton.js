import "./PreviousButton.css";
function PreviousButton({ dispatch, index }) {
  if (index === 0) return null;

  if (index !== 0)
    return (
      <button
        className="previous-button"
        onClick={() => dispatch({ type: "previousQuestion" })}
      >
        Previous
      </button>
    );
}
export default PreviousButton;
