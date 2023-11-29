import { useQuiz } from "../../hooks/useQuiz";
import "./Progress.css";

function Progress() {
  const { index, numQuestions, points, maxPossiblePoints, userAnswers } =
    useQuiz();

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(userAnswers[index] !== null)}
      />
      <p>
        Question <strong>{index + 1}</strong>
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
