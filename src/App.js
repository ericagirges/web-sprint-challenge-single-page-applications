import React from "react";
import OrderForm from "./components/OrderForm";
import Home from "./components/Home";
import { Link, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>Lambda Eats</h1>
      <nav>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/order-form">Place an Order</Link>
        </div>
      </nav>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/order-form">
          <OrderForm />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
