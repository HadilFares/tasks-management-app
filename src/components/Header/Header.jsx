import React from "react";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Form.Group className="mb-5">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Navbar.Brand href="/">myDesk</Navbar.Brand>
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link>
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none", color: "White" }}
                  >
                    <span>
                      <i class="fas fa-home" /> Home
                    </span>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to={"/login"}
                    style={{ textDecoration: "none", color: "White" }}
                  >
                    <span>
                      <i class="fas fa-sign-in-alt" /> Login
                    </span>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to={"/register"}
                    style={{ textDecoration: "none", color: "White" }}
                  >
                    <span>
                      <i class="fas fa-user-plus" /> SignUp
                    </span>
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Form.Group>
    </>
  );
};

export default Header;
