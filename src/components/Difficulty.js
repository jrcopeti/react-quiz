function Difficulty({dispatch, difficulty}) {
  return (
    <div>
      <p>Please select a difficulty</p>
      <select onChange={(e)=> dispatch({type: "difficulty", payload: e.target.value})}>
        <option value="">--Please choose an option--</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default Difficulty;
