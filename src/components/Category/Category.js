import { useQuiz } from "../../hooks/useQuiz";
import "./Category.css";
function Category() {
  
  const { dispatch } = useQuiz();
  return (
    <div className="category">
      <label>Select a category</label>
      <select
        onChange={(e) =>
          dispatch({ type: "category", payload: e.target.value })
        }
      >
        <option value="">-----------------------</option>
        <option value="general_knowledge">General Knowledge</option>
        <option value="music">Music</option>
        <option value="sport_and_leisure">Sport and Leisure</option>
        <option value="film_and_tv">Film and TV</option>
        <option value="arts_and_literature">Arts and Literature</option>
        <option value="history">History</option>
        <option value="society_and_culture">Society and Culture</option>
        <option value="science">Science</option>
        <option value="geography">Geography</option>
        <option value="food_and_drink">Food and Drink</option>
      </select>
    </div>
  );
}

export default Category;
