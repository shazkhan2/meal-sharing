import React from "react";
import { useState, useEffect } from "react";
import Meal from "./Meal";
import "../styles/MealsStyles.css";

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/meals")
      .then((response) => response.json())
      .then((data) => {
        setMeals(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerList">
      <div className="titleContainer">
        <h2>Meals List</h2>
        <h4>Cuisine tailored for aficionados!</h4>
      </div>
      <div className="meals-grid">
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealsList;
