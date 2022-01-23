import React from "react";
import { Container } from "react-bootstrap";
import {
  Home,
  AddUser,
  EditUser,
  LoginScreen,
  
  ListTasks,
  GeneratePassword,
  DashboardClientScreen,
  AdminHome,NewTask
} from "../screens";
import { About } from "../components";
import { Route } from "react-router-dom";
import Users from "../screens/Admin/Users";

function AdminRoutes() {
    return (
        <Container>
        <Route exact path="/users" component={Users} />
        <Route exact path="/dashboardAdmin" component={AdminHome} />
        <Route path="/users/add" component={AddUser} />
        <Route exact path="/users/edit/:id" component={EditUser} />
        <Route path="/login" component={LoginScreen} exact />
      
        <Route path="list/tasks" component={ListTasks} exact />
       
        <Route path="/dashboard" component={DashboardClientScreen} exact />
      <Route path="/client/newticket" component={NewTask} exact />

      </Container>   
    )
}

export default AdminRoutes
