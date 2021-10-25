import React from "react";
import { Navbar, Nav, Container, Form, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function ClientHeader() {
  return (
    <Form.Group className="mb-5">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to={"/"} style={{ textDecoration: "none", color: "White" }}>
              MyDesk
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown
              title={
                <span>
                  <i class="fas fa-clipboard-list" /> TASKS
                </span>
              }
              id="TASKS"
            >
              <LinkContainer to="/dashboardClient">
                <NavDropdown.Item>List Tasks</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/client/newticket">
                <NavDropdown.Item>New Tasks</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <Nav.Link
              href="/login"
              style={{ textDecoration: "none", color: "White" }}
            >
              <span>
                <i class="fas fa-sign-out-alt" /> Logout
              </span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Form.Group>
  );
}

export default ClientHeader;
