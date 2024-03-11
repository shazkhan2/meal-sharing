import { Link } from "react-router-dom";
import "../../styles/MealsList.css";

const Meal = ({ meal }) => {
  return (
    <Link to={`/meals/${meal.id}`} className="meal-link">
      <div className="meal-card">
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        <p>Price: ${meal.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default Meal;
