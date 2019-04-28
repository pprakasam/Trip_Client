import React from 'react'
import './sidebar.css'
import Nav from 'react-bootstrap/Nav'

const Sidebar = ({ user }) => (
  <div className="side-drawer">
    <Nav>
      <ul className="links">
        <li><Nav.Link href="#create-trip">Create Trip</Nav.Link></li>
        <li><Nav.Link href="#trips">Show Trips</Nav.Link></li>
        <li><Nav.Link href="#tripfamilies">My Trips</Nav.Link></li>
        <li><Nav.Link href="#change-password">Change Password</Nav.Link></li>
        <li><Nav.Link href="#sign-out">Sign Out</Nav.Link></li>
      </ul>
    </Nav>
  </div>
)

export default Sidebar
