import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import HamburgerButton from '../../src/auth/components/HamburgerButton'
import Sidebar from './Sidebar'
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
    let sideDrawer
    // let backdrop
    const { user } = this.props
    if (this.state.sideDrawwerOpen) {
      sideDrawer = <Sidebar user={user} />
      // backdrop = <Backdrop />
    }

    return (
      <React.Fragment>
        <Navbar bg="dark" fixed="top" variant="dark" className="navbar">
          <HamburgerButton drawerClickHandler={this.drawerToggleClickHandler}/>
          { sideDrawer }
          <Navbar.Brand className="brand" href="#home">Trip Planner</Navbar.Brand>
        </Navbar>
      </React.Fragment>
    )
  }
}
export default AuthenticatedOptions
