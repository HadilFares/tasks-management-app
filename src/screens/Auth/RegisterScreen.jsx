import React, { useState } from "react";
import { FormContainer } from "../../components";
import { Form, Button, Card,Spinner } from "react-bootstrap";
import { Message } from "../../components/index";
import axios from "axios";
import { useHistory } from "react-router-dom";
import loginImg from "./login.svg";
import "./style.css";
function RegisterScreen() {
  const [name, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [verifPassword, setVerifPassword] = useState();
  const [invalidLogin, setInvalidLogin] = useState(null);
  const [isLoading , setIsLoading] = useState(false)
  let history = useHistory();

  const onRegister = async () => {
    try {
      setIsLoading(true)
      let isAdmin = false;
      const data = {
        name,
        lastname,
        email,
        password,
        verifPassword,
        isAdmin,
      };
      if (data.password.length< 7)
     <Message variant="danger">Invalid password</Message>
     console.log(data);
 

     
      await axios
        .post("http://localhost:3000/api/user/register", data)
        .then((res) => {
          setIsLoading(false);
          console.log(res.data);
         history.push("/login");
        });
    } catch (error) {
      setInvalidLogin(error.response.data.msg);
      console.log(error.response.data.msg);
      setIsLoading(true)
    }
  };

  return (
    <Card className="card" style={{ width: "35rem" }}>
      <div className="base-container">
        {invalidLogin && <Message variant="danger">{invalidLogin}</Message>}
        <div className="image">
          <img src={loginImg} alt="login" width="400" height="200" />
        </div>
        <div className="form" onSubmit={() => onRegister()}>
          <Form.Group controlId="name" className="form-group">
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              name="name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="lastname" className="form-group">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              name="lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              size="sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              size="sm"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Verif password</Form.Label>
            <Form.Control
              type="password"
              size="sm"
              name="password"
              onChange={(e) => setVerifPassword(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="footer">
          <div className="text-center">
            {isLoading ?
            ( <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>) : (
            <Button onClick={() => onRegister()} variant="primary">
              Sign In
            </Button>)}
          </div>
        </div>
      </div>
    </Card>
  );
}
export default RegisterScreen;
