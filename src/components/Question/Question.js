import "./Question.css";
import Options from "../Options/Options";
import { useQuiz } from "../../hooks/useQuiz";
function Question() {
  const { questions, index } = useQuiz();

  return (
    <div className="question">
      <h4>{questions[index].question.text}</h4>
      <Options />
    </div>
  );
}

export default Question;
