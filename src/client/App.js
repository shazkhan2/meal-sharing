import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MealsList from "./components/MealsList";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <div className="home-page">
            <h1>Meal Sharing App</h1>
          </div>
        </Route>
        <Route exact path="/meals" component={MealsList} />
      </Switch>
    </Router>
  );
}

export default App;
