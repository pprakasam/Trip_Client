import React from 'react'
// import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import AuthenticatedOptions from './AuthenticatedOptions'

import './Header.scss'

const unauthenticatedOptions = (
  <React.Fragment>
    <Navbar bg="dark" variant="dark" className="navbar">
      <Navbar.Brand href="#home">Trip Planner</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#sign-up">Sign Up</Nav.Link>
        <Nav.Link href="#sign-in">Sign In</Nav.Link>
      </Nav>
    </Navbar>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header>
    <nav>
      { user ? <AuthenticatedOptions user={user} /> : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
