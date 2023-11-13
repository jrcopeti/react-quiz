import "./Question.css";
import Options from "../Options/Options";
function Question({ question, dispatch, answer }) {


  return (
    <div className="question">
      <h4>{question.question.text}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
