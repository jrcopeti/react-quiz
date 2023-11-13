import "./NextButton.css";
function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === undefined) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="next-previous-button"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        &rarr;
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="next-previous-button"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
