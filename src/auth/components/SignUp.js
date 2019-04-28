import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (

      <Form className='auth-form' onSubmit={this.onSignIn}>
        <h3>Sign Up</h3>
        <Form.Group controlId="signin">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={email}
            placeholder="Enter Email" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="passowrd" name="password" value={password}
            placeholder="Password" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="passowrd" name="passwordConfirmation" value={passwordConfirmation}
            placeholder="Password" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="dark" type="submit">Sign Up</Button>
      </Form>
    )
  }
}

export default withRouter(SignUp)
