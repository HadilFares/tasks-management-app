
import React from 'react' ;
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router ,Route,Switch   } from 'react-router-dom';
import Navbar from './Navbar';
import  AddUser from './AddUser';
import Home from './Home';
import EditUser from './EditUser';
function App() {
  return (
   <Router>
     <div className="App">
     <Navbar/>
     
      <Switch>
      <Route exact path="/" component={Home} />
      < Route path='/users/add' component ={AddUser}/>
      <Route exact path="/users/edit/:id" component={EditUser} />
      </Switch>
    
     </div>
     </Router>
    
  );
}

export default App;
