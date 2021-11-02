import React from "react";
import { Container } from "react-bootstrap";
import { NewTask, GeneratePassword, DashboardClientScreen, Profil } from "../screens";
import { Route } from "react-router-dom";

function ClientRoutes() {
  return (
    <Container>
     
      <Route path="/client/newticket" component={NewTask} exact />
     
      <Route path="/dashboard" component={DashboardClientScreen} exact />
      <Route path="/client/profile" component={Profil} exact />
    </Container>
  );
}

export default ClientRoutes;
