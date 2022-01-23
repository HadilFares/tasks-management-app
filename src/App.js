import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Header, ClientHeader, AdminHeader } from "./components";
import Footer from "./components/Footer/Footer";
import { AdminRoutes, ClientRoutes, AuthRoutes } from "./Routes/index";

function App() {
  const [isAdmin, setIsAdmin] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();

  const getUser = () => {
    let admin = JSON.parse(localStorage.getItem("isAdmin"));
    setIsAdmin(admin);
    setIsLoggedIn(localStorage.getItem("token"));
  };

  useEffect(() => {
    getUser();
    console.log(isAdmin);
  }, []);
  return (
    <Router>
      {isLoggedIn ? (
        isAdmin == true ? (
          <AdminHeader />
        ) : (
          <ClientHeader />
        )
      ) : (
        <Header />
      )}

      {isLoggedIn ? (
        isAdmin == true ? (
          <Switch>
            <AdminRoutes />
          </Switch>
        ) : (
          <Switch>
            <ClientRoutes />
          </Switch>
        )
      ) : (
        <AuthRoutes />
      )}
      <Footer />
    </Router>
  );
}

export default App;
