import "./WelcomePage.css";
function WelcomePage({ dispatch }) {
  return (
    <div className="welcome">
      <h2>Welcome to the quiz game</h2>
      <button
        onClick={() => dispatch({ type: "startCategorySelection" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default WelcomePage;
