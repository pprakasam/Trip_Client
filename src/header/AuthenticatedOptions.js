import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
// import HamburgerButton from '../../src/auth/components/HamburgerButton'
// import Sidebar from './Sidebar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
// import Backdrop from './Backdrop'

class AuthenticatedOptions extends Component {
  constructor () {
    super()
    this.state = {
      sideDrawwerOpen: false
    }
  }
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawwerOpen: !prevState.sideDrawwerOpen }
    })
  }

  render () {
    // let sideDrawer
    // let backdrop
    // const { user } = this.props
    // if (this.state.sideDrawwerOpen) {
    //   sideDrawer = <Sidebar user={user} />
    //   // backdrop = <Backdrop />
    // }

    return (
      <React.Fragment>
        <Navbar bg="dark" fixed="top" variant="dark" className="navbar">
          <DropdownButton variant="dark" id="dropdown-basic-button" title="Trip Planner">
            <Dropdown.Item href="#/create-trip">Create Trip</Dropdown.Item>
            <Dropdown.Item href="#/trips">Show Trips</Dropdown.Item>
            <Dropdown.Item href="#/tripfamilies">My Trips</Dropdown.Item>
            <Dropdown.Item href="#/change-password">Change Password</Dropdown.Item>
            <Dropdown.Item href="#/sign-out">Sign Out</Dropdown.Item>
          </DropdownButton>
        </Navbar>
      </React.Fragment>
    )
  }
}
export default AuthenticatedOptions

// <HamburgerButton drawerClickHandler={this.drawerToggleClickHandler}/>
// { sideDrawer }
