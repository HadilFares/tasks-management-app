import React from 'react'
import { Container } from 'react-bootstrap'
import {Home,AddUser,EditUser,LoginScreen,RegisterScreen,ListTasks, GeneratePassword} from './screens'
import {Route}from 'react-router-dom'

function Routes(){
    return (
        <Container>
      <Route exact path="/" component={Home} />
      < Route path='/users/add' component ={AddUser}/>
      <Route exact path="/users/edit/:id" component={EditUser} />
      <Route path='/login' component={LoginScreen} exact/>
        <Route path='/register' component={RegisterScreen} exact/>
        <Route path='/tasks' component={ListTasks} exact />
        <Route path="/generatepassword/:id" component={GeneratePassword} exact/>
        </Container>

    )

}
export default Routes