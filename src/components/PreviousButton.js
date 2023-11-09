function PreviousButton({ dispatch, index }) {
  if (index === 0) return null;

  if (index !== 0)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "previousQuestion" })}
      >
        Previous
      </button>
    );

}
export default PreviousButton;
