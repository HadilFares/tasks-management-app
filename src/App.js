
import React from 'react' ;
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router ,Switch   } from 'react-router-dom';
import {Header} from './components';
import Routes from './Routes';
function App() {
  return (
   <Router>
     <div className="App">
     <Header/>
     
      <Switch>
      <Routes/>
      </Switch>
    
     </div>
     </Router>
    
  );
}

export default App;
