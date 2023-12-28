const express = require("express");
const router = express.Router();
const knex = require("../database");


// All meals sorted by ID
router.get("/all-meals", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").orderBy('id', 'desc').select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

// Future meals
router.get("/future-meals", async (request, response) => {
  try {
    const currentDate = new Date();
    const result = await knex("meal").where('when', '>', currentDate.toISOString());
    response.json(result);
  } catch (error) {
    throw error;
  }
});

// Last meal
router.get("/last-meal", async (request, response) => {
  try {
    const lastMeal = await knex("meal").orderBy('id', 'desc').first();

    if (!lastMeal) {
      return response.status(404).json({ error: "No meals available." });
    }

    response.json(lastMeal);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "An unexpected error occurred while processing your request." });
  }
});


// First meal
router.get("/first-meal", async (request, response) => {
  try {
    const firstMeal = await knex("meal").orderBy('id').first();
    
    if (!firstMeal) {
      return response.status(404).json({ error: "No meals available." });
    }

    response.json(firstMeal);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "An unexpected error occurred while processing your request." });
  }
});

module.exports = router;

