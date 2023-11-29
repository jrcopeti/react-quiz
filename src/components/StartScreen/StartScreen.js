import { useQuiz } from "../../hooks/useQuiz";
import "./StartScreen.css";

function StartScreen() {
  const { numQuestions, category, difficulty, dispatch } = useQuiz();

  const categoryNames = () => {
    switch (category) {
      case "general_knowledge":
        return "General Knowledge";
      case "music":
        return "Music";
      case "sport_and_leisure":
        return "Sport and Leisure";
      case "film_and_tv":
        return "Film and TV";
      case "arts_and_literature":
        return "Arts and Literature";
      case "history":
        return "History";
      case "society_and_culture":
        return "Society and Culture";
      case "science":
        return "Science";
      case "geography":
        return "Geography";
      case "food_and_drink":
        return "Food and Drink";
      default:
        return null;
    }
  };

  const difficultyNames = () => {
    switch (difficulty) {
      case "easy":
        return "Easy";
      case "medium":
        return "Medium";
      case "hard":
        return "Hard";
      default:
        return null;
    }
  };

  return (
    <div className="confirm">
      <h3>{numQuestions} questions</h3>
      <h3>{difficultyNames()}</h3>
      <h3>{categoryNames()}</h3>
      <button className="" onClick={() => dispatch({ type: "start" })}>
        Play
      </button>
    </div>
  );
}

export default StartScreen;
