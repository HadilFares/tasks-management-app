import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col ,container} from "react-bootstrap";
import { FormContainer } from "../../components";
import axios from "axios";
import { useHistory } from "react-router";
import signUp from "../../assets/login1.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showpassword, setshowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const history = useHistory();
  const eye = <FontAwesomeIcon icon={faEye} />;
const togglePasswordVisibility=()=>{
  setshowPassword(showpassword?false:true)
};
  const login = async () => {
    const data = { email, password };
    try {

      localStorage.clear();
      setIsLoading(true);
      await axios.post("http://localhost:3000/api/user/login", data).then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("name", response.data.name);
        
        if(response.data.isAdmin) history.push('/dashboardAdmin');
        else history.push('/dashboard');
        window.location.reload();
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.msg);
      setMessageError(error.response.data.msg);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const clearStorage = () =>{ return localStorage.clear()};
    clearStorage();
  }, [])


  return (
    <container>
      <Row>
    <Col style={{marginRight:'10%'}}>
   
      <h1>Sign In</h1>
      <Form>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter Email" 
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            
            type={showpassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            
          />
           
        </Form.Group>

        <div class="text-center">
          <Button  color="black" onClick={()=> login()}>
            Sign In
          </Button>
        </div>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          
          <Link to="/register">Register</Link>
        </Col>
      </Row>
   
    </Col>
    <Col  >
    <img src={signUp} alt="logo"  width={"600px"} height={"400px"} />
    </Col>
    </Row>
    </container>
  );
}//style={{marginLeft:'50%' ,marginTop:'5%'}}

export default LoginScreen;