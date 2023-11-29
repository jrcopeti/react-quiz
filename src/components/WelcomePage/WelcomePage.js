import { useQuiz } from "../../hooks/useQuiz";
import "./WelcomePage.css";

function WelcomePage() {
  const { dispatch } = useQuiz();
  return (
    <div className="welcome">
      <h2>Welcome to the Quiz Game</h2>
      <button onClick={() => dispatch({ type: "startCategorySelection" })}>
        Let's start
      </button>
    </div>
  );
}

export default WelcomePage;
