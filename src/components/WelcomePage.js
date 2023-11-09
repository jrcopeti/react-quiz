function WelcomePage({dispatch}) {
  return (
    <div>
      <h2>
        Welcome to quiz
        </h2>
        <button className="btn btn-ui" onClick={() => dispatch({type: "startCategorySelection"})}>
          Let's start
        </button>
    </div>
  )
}

export default WelcomePage
