import Options from "./Options";
function Question({ question, dispatch, answer }) {

  console.log(answer);
  return (
    <div>
      <h4>{question.question.text}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
