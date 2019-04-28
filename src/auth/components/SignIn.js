import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { signIn } from '../api'
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <Form className='auth-form' onSubmit={this.onSignIn}>
        <h3>Sign In</h3>
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
        <Button variant="dark" type="submit">Sign In</Button>
      </Form>

    )
  }
}

export default withRouter(SignIn)
