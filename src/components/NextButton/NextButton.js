import { useQuiz } from "../../hooks/useQuiz";
import "./NextButton.css";
function NextButton() {
  const { dispatch, userAnswers, index, numQuestions } = useQuiz();
  if (userAnswers[index] === undefined) return null;

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
