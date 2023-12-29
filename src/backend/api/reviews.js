const express = require("express");
const router = express.Router();
const knex = require("../database");


//api/reviews	GET	Returns all reviews.
router.get('/all-reviews', async (req, res) => {
    try {
      const allReviews = await knex("review").select("*");
      res.json(allReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
      }
    });
  
// /api/meals/:meal_id/reviews	GET	Returns all reviews for a specific meal.
router.get("/meals/:meal_id/reviews", async (req, res) => {
    const { meal_id } = req.params;
  
    try {
      // Retrieve all reviews for the specified meal_id
      const reviews = await knex("review").select("*").where({ meal_id });
  
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve reviews for the specified meal" });
    }
  });
  

// /api/reviews	POST	Adds a new review to the database.

router.post('/add-review', async (req, res) => {
    const addReview = req.body;
    addReview.created_date = new Date();

    try {
        await knex("review").insert(addReview);
        res.status(201).json("New review has been added");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add a new review" });
    }
  });

  // /api/reviews/:id	GET	Returns a review by id.
  // The request parameter has to be used like: http://localhost:5000/api/reviews/2
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const reviews = await knex("review").select("*").where({ id }).first();
      if (reviews) {
        res.json(reviews);
      } else {
        res.status(404).json({ error: "Review not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve the review" });
    }
  });

  // /api/reviews/:id	PUT	Updates the review by id.
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedReview = req.body;
  
    try {
     const existingReview = await knex("review").select("*").where({ id }).first();
      if (!existingReview) {
        return res.status(404).json({ error: "Review not found" });
      }
  
      await knex("review").where({ id }).update(updatedReview);
  
      res.json({ message: "Review updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update the review" });
    }
  });

  // /api/reviews/:id	DELETE	Deletes the review by id.
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const review = await knex("review").select("*").where({ id }).first();
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
  
      await knex("review").where({ id }).del();
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error deleting reservation" });
    }
  });

module.exports = router;
