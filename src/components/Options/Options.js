import { useQuiz } from "../../hooks/useQuiz";
import "./Options.css";

function Options() {
  const { questions, dispatch, userAnswers, index } = useQuiz();

  const hasAnswered = userAnswers[index] !== undefined;

  return (
    <div className="options">
      {questions[index].options.map((option, optionIndex) => (
        <button
          className={`btn btn-option ${
            optionIndex === userAnswers[index] ? "answer" : ""
          } ${
            hasAnswered
              ? optionIndex === questions[index].correctOptionIndex
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: optionIndex })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
