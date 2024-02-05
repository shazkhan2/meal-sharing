const express = require("express");
const router = express.Router();
const knex = require("../database");


//Returns all meals that are cheaper than maxPrice. Data type Number. api/meals?maxPrice=90

router.get('/maxPrice', async (req, res) => {
  try {
    const maxPrice = req.query.maxPrice;

    if (maxPrice !== undefined && isNaN(maxPrice)) {
      return res.status(400).json({ error: 'The maxPrice parameter accepts numbers only' });
    }

    const cheaperMeals = await knex('meal').where('price', '<', maxPrice);

    res.json(cheaperMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});


//Returns all meals that still have available spots left, if true. 
//If false, return meals that have no available spots left.1	api/meals?availableReservations=true

router.get('/available', async (req, res) => {
  try {
    const availableReservations = req.query.availableReservations;

    if (availableReservations !== undefined && availableReservations !== 'true' && availableReservations !== 'false') {
      return res.status(400).json({ error: 'The availableReservations parameter accepts true or false only' });
    }

    // Convert the string 'true' or 'false' to a boolean
    const isAvailable = availableReservations === 'true' || availableReservations === true;

    // Use the boolean value in the query
    const meals = await knex('reservation').where('number_of_guests', '<', isAvailable ? 0 : Number.MAX_VALUE);

    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});

//Returns all meals that partially match the given title.	api/meals?title=Indian%20platter

router.get('/title', async (req, res) => {
  try {
    const title = req.query.title;

    if (!title) {
      return res.status(400).json({ error: 'The title parameter is required' });
    }

    const titleMatch = await knex('meal').where('title', 'like', `%${title}%`);

    res.json(titleMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});

//Returns all meals where the date for when is after the given date.	api/meals?dateAfter=2022-10-01
router.get('/dateAfter', async (req, res) => {
  try {
    const dateAfter = req.query.dateAfter;

    if (!dateAfter) {
      return res.status(400).json({ error: 'The dateAfter parameter is required' });
    }

    const meals = await knex('meal').where('when', '>', dateAfter);

    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});

// Returns all meals where the date for when is before the given date.	api/meals?dateBefore=2022-08-08
router.get('/dateBefore', async (req, res) => {
  try {
    const dateBefore = req.query.dateBefore;

    if (typeof dateBefore !== 'string' || dateBefore.trim() === '') {
      return res.status(400).json({ error: 'The dateBefore parameter is required and must be a non-empty string' });
    }

    const earlyMeals = await knex('meal').where('when', '<', dateBefore);

    res.json(earlyMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});



//Returns the given number of meals.	api/meals?limit=7
router.get('/limit', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);

    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ error: 'The limit parameter must be a positive number' });
    }

    const limitedMeals = await knex('meal').select('*').limit(limit);

    res.json(limitedMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});

//Returns all meals sorted by the given key. Allows when, max_reservations and price as keys. 
//Default sorting order is asc(ending).	api/meals?sortKey=price

router.get('/sortedMeals', async (req, res) => {
  try {
    const sortKey = req.query.sortKey || 'price';
    const sortDir = req.query.sortDir && req.query.sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const allowedKeys = ['when', 'max_reservations', 'price'];

    if (!allowedKeys.includes(sortKey)) {
      return res.status(400).json({ error: 'Invalid sortKey parameter' });
    }

    const sortedMeals = await knex('meal').orderBy(sortKey, sortDir);

    res.json(sortedMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});

//Returns all meals sorted in the given direction. Only works combined with the sortKey and allows asc or desc.	
//api/meals?sortKey=price&sortDir=desc
router.get('/sort', async (req, res) => {
  try {
    const sortKey = req.query.sortKey;
    const sortDir = req.query.sortDir;

    if (!sortKey) {
      return res.status(400).json({ error: 'The sortKey parameter is required' });
    }

    const allowedKeys = ['when', 'max_reservations', 'price'];

    if (!allowedKeys.includes(sortKey)) {
      return res.status(400).json({ error: 'Invalid sortKey parameter' });
    }

    const sortedMeals = await knex('meal').orderBy(sortKey, sortDir || 'asc');

    res.json(sortedMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred while processing your request.' });
  }
});


module.exports = router;
