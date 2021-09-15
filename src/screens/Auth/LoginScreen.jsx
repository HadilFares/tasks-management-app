import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer } from "../../components";

function LoginScreen() {
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter Email" />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
          />
        </Form.Group>

        <div class="text-center">
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </div>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          {/*<Link to={redirect ? `/register?redirect=${redirect} ` : '/register'>}>*/}
          <Link>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;