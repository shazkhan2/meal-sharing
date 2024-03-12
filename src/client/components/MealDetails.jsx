import React from "react";
import { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import "../styles/ReviewForm.css";

function MealDetails({ match }) {
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mealId = match.params.id;

    const fetchMealDetails = async () => {
      try {
        const mealResponse = await fetch(`/api/meals/${mealId}`);
        const mealData = await mealResponse.json();
        setMeal(mealData);
      } catch (error) {
        setError("Error fetching meal details");
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await fetch(`/api/reviews/${mealId}`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (error) {
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
    fetchReviews();
  }, [match.params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!meal) {
    return <div>Meal not found</div>;
  }

  return (
    <div className="meal-details">
      <h2>{meal.title}</h2>
      <p>{meal.description}</p>
      <p>Price: ${meal.price}</p>

      {meal.max_reservations > 0 && (
        <div className="form-container">
          <ReservationForm mealId={meal.id} />
          <hr />
          <ReviewForm mealId={meal.id} mealTitle={meal.title} />
        </div>
      )}

      <ReviewList reviews={reviews} />
    </div>
  );
}

export default MealDetails;
