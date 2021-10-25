import React from "react";
import { Container } from "react-bootstrap";
import { ListTasks, GeneratePassword, DashboardClientScreen } from "../screens";
import { Route } from "react-router-dom";
import NewTask from "../screens/Client/NewTask";

function ClientRoutes() {
  return (
    <Container>
     
      <Route path="/client/newticket" component={NewTask} exact />
      <Route path="/generatepassword/:id" component={GeneratePassword} exact />
      <Route path="/dashboardClient" component={DashboardClientScreen} exact />
    </Container>
  );
}

export default ClientRoutes;
