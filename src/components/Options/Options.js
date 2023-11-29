import { useQuiz } from "../../hooks/useQuiz";
import "./Options.css";

function Options() {
  const { questions, dispatch, userAnswers, index } = useQuiz();

  const hasAnswered = userAnswers[index] !== undefined;

  return (
    <div className="options">
      {questions[index].options.map((option, index) => (
        <button
          className={`btn btn-option ${
            index === userAnswers[index] ? "answer" : ""
          } ${
            hasAnswered
              ? index === questions[index].correctOptionIndex
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
