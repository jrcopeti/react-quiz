function Category({ dispatch }) {
  return (
    <div>
      <select
        onChange={(e) =>
          dispatch({ type: "category", payload: e.target.value })
        }
      >
        <option value="">--Please select a CATEGORY</option>
        <option value="9">General Knowledge</option>
        <option value="10">Books</option>
        <option value="11">Films</option>
        <option value="15">Video Game</option>
        <option value="17">Science and Nature</option>
        <option value="18">Computers</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="30">Gadgets</option>
      </select>
    </div>
  );
}

export default Category;
