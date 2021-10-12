import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from "./components";
import Routes from "./Routes";
function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Routes />
      </Switch>
    </Router>
  );
}

export default App;
