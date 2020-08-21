import React from "react";
import OrderForm from "./components/OrderForm";
import Home from "./components/Home";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div `
  background-color: #E83703;
  height: 150px;
  display: flex;
  justify-content: space-evenly;

  h1{
    font-family: "Courgette";
    font-size: 4.0em;
    color: white;
    align-self: flex-end;
  }

`

const Nav = styled.nav `
    font-family: "Noto Sans KR";
    font-size: 1.4em;
    align-self: center;
    color: white;
    display: flex;
    flex-direction: column;
`

const App = () => {
  return (
    <div>
      <Header>
      <h1>Lambda Eats</h1>
      <Nav>
        <div className="nav-links">
          <Link to="/">Home</Link>
         <Link to="/order-form">Place an Order</Link>
        </div>   
      </Nav>
      </Header>
      <Switch>
        <Route exact path="/">
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
