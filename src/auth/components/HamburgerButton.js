import React from 'react'

const HamburgerButton = props => (
  <button className="toggle-button" onClick={props.drawerClickHandler}>
    <div className="toggle-button_line" />
    <div className="toggle-button_line" />
    <div className="toggle-button_line" />
  </button>
)

export default HamburgerButton
