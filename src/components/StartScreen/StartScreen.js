function StartScreen({numQuestions, dispatch}) {
  return (
    <div>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({type: "start"})}>Start Quiz</button>
    </div>
  )
}

export default StartScreen
