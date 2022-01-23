import React from "react";
import { Container } from "react-bootstrap";
import { LoginScreen ,RegisterScreen, GeneratePassword,Home} from "../screens";
import { Route } from "react-router-dom";

function AuthRoutes() {
  return (
    <Container>
      <Route path="/login" component={LoginScreen} exact />
      <Route path="/register" component={RegisterScreen} exact />
      <Route path="/generatepassword/:id" component={GeneratePassword} exact />
      <Route path="/" component={Home} exact />
    </Container>
  );
}

export default AuthRoutes;
