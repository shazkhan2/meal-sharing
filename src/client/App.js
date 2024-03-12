import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MealsList from "./components/MealsList";
import Header from "./components/Header";
import MealDetails from "./components/MealDetails";
import MealsPreview from "./components/MealsPreview";



function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <div className="home-page">
            <h1>Your gate way to the world of fine dining</h1>
            <div className="meals-preview">
              <h3>Here are some meals to whet your apetite:</h3>
              <MealsPreview />
            </div>
            <Link to="/meals" className="see-more-link">
              See More
            </Link>
          </div>
        </Route>
        <Route exact path="/meals" component={MealsList} />
        <Route exact path="/meals/:id" component={MealDetails} />

      </Switch>
    </Router>
  );
}

export default App;
