const express = require("express");
const app = express();
const path = require("path");

const knex = require("./database");
const port = process.env.PORT || 3000;
const cors = require("cors");

const buildPath = path.join(__dirname, "../../dist");

// For week4 no need to look into this!
// Serve the built client HTML
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

// All meals sorted by ID
app.get("/all-meals", async (request, response) => {
  try {
    const titles = await knex("meal").orderBy('id', 'desc').select("title");
    response.json(titles);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "An unexpected error occurred while processing your request." });
  }
});

// Future meals
app.get("/future-meals", async (request, response) => {
  try {
    const currentDate = new Date();
    const result = await knex("meal").where('when', '>', currentDate.toISOString());
    response.json(result);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "An unexpected error occurred while processing your request." });
  }
});

// Last meal
app.get("/last-meal", async (request, response) => {
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
app.get("/first-meal", async (request, response) => {
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

// ... Add more routes as needed

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;

