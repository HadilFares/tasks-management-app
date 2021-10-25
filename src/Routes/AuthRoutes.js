import React from "react";
import { Container } from "react-bootstrap";
import { LoginScreen, RegisterScreen } from "../screens";
import { Route } from "react-router-dom";

function AuthRoutes() {
  return (
    <Container>
      <Route path="/login" component={LoginScreen} exact />
      <Route path="/register" component={RegisterScreen} exact />
    </Container>
  );
}

export default AuthRoutes;
