import React from "react";
import { Link } from "react-router-dom";
import "../styles/MealsStyles.css";

const Meal = ({ meal }) => {
  
  return (
    <Link to={`/meals/${meal.id}`} className="meal-link">
      <div className="meal-card">
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        <p>Price: Kr. {meal.price}</p>
      </div>
    </Link>
  );
};

export default Meal;