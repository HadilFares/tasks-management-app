import React, { useState } from "react";
import { FormContainer } from "../../components";
import { Form, Button } from "react-bootstrap";
import { Message } from "../../components/index";
import axios from "axios";
import { useHistory } from "react-router-dom";
function RegisterScreen() {
  const [name, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [verifPassword, setVerifPassword] = useState();
  let history = useHistory();

  const onRegister = async () => {
    try {
      let isAdmin = false;
      const data = {
        name,
        lastname,
        email,
        password,
        verifPassword,
        isAdmin,
      };
      /* if (data.password.length<7)
     <Message variant="danger">Invalid password</Message>
     console.log(data)
 */
      console.log(data);
      await axios
        .post("http://localhost:3000/api/user/register", data)
        .then((res) => {
          console.log(res);
          history.push("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={() => onRegister()}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastname" className="mb-3">
          <Form.Label>LastName</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Verif password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => setVerifPassword(e.target.value)}
          />
        </Form.Group>
        <div className="text-center">
          <Button onClick={() => onRegister()} variant="primary">
            Sign In
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}
export default RegisterScreen;
