import { useQuiz } from "../../hooks/useQuiz";
import "./PreviousButton.css";

function PreviousButton() {
  const { dispatch, userAnswers, index } = useQuiz();

  if (userAnswers[index] === undefined) return null;
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
