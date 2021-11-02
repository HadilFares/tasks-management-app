import React from "react";
import { Container } from "react-bootstrap";
import { LoginScreen , GeneratePassword} from "../screens";
import { Route } from "react-router-dom";

function AuthRoutes() {
  return (
    <Container>
      <Route path="/login" component={LoginScreen} exact />
      <Route path="/generatepassword/:id" component={GeneratePassword} exact />
    </Container>
  );
}

export default AuthRoutes;
