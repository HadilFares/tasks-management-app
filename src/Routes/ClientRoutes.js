import React from "react";
import { Container } from "react-bootstrap";
import { NewTask, GeneratePassword, DashboardClientScreen } from "../screens";
import { Route } from "react-router-dom";

function ClientRoutes() {
  return (
    <Container>
     
      <Route path="/client/newticket" component={NewTask} exact />
      <Route path="/generatepassword/:id" component={GeneratePassword} exact />
      <Route path="/dashboard" component={DashboardClientScreen} exact />
    </Container>
  );
}

export default ClientRoutes;
