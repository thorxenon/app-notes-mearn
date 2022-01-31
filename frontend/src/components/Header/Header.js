import axios from 'axios';
import React, { useState } from 'react';
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
  } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () =>{
      dispatch(logout());
      navigate('/');
  }


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
                onChange={(e)=>setSearch(e.target.value)}
            />
            </Form>
            </Nav>
          {userInfo ?
            <Nav>
                <Nav.Link href="/mynotes">
                    My Notes
                </Nav.Link>
                <NavDropdown title={ userInfo?.name.firstName } id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>

            :<Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>}
            
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
};

export default Header;
