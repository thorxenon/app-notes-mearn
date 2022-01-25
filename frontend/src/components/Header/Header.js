import React from 'react';
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
  } from "react-bootstrap";

const Header = () => {
  return (
        <Navbar bg="primary" expand="lg" variant="dark">
        <Container >
        <Navbar.Brand href="/">
          Note Zipper
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto">
            <Form inline>
            <FormControl
                type="search"
                placeholder="Search"
                className="mr-sm-2"
                aria-label="Search"
            />
            </Form>
            </Nav>

            <Nav>
              <Nav.Link href="/mynotes">
                  My Notes
              </Nav.Link>
              <NavDropdown title="Peeh Rangel" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                  Logout
                  </NavDropdown.Item>
              </NavDropdown>
              {/*<Nav.Link href="#" disabled>
                  Link
              </Nav.Link>*/}
            </Nav>
            
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
};

export default Header;
