import React, { Component, Fragment } from 'react'
import './Trip.scss'
import { Redirect } from 'react-router'
import { createTrip } from './TripAPI'
import messages from '../auth/messages'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateTrip extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      trip: {
        place: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        from_date: '',
        to_date: '',
        families_joining: '',
        user_id: ''
      },
      created: false
    }
  }

  handleChange = (event) => {
    const { user } = this.props
    this.setState({ trip: { ...this.state.trip,
      [event.target.name]: event.target.value,
      user_id: user.id
    } })
  }

  handleSubmit = (event) => {
    const { alert, history } = this.props
    const { trip } = this.state
    const { user } = this.props
    event.preventDefault()
    createTrip(user, trip)
      .then(response => this.setState({
        created: true,
        trip: response.data.trip
      }))
      .then(() => alert(messages.createTripSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ place: '', street: '', city: '', state: '', zip: '', from_date: '', to_date: '', families_joining: '', user_id: '' })
        alert(messages.createTripFailure, 'danger')
      })
  }

  render () {
    const { place, street, city, state, zip } = this.state.trip
    if (this.state.created) {
      return <Redirect to={'/trips'} />
    }

    return (
      <Fragment>
        <div className="create-form">
          <div className="form-header">Enter Trip Details</div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="place">
              <Form.Label>Place</Form.Label>
              <Form.Control type="text" value={place}
                required name="place" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="street">
              <Form.Label>Street</Form.Label>
              <Form.Control type="text" value={street}
                required name="street" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={city}
                required name="city" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" value={state}
                required name="state" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="zip">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" value={zip}
                required name="zip" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="from_date">
              <Form.Label>From</Form.Label>
              <Form.Control type="date"
                required name="from_date" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="to_date">
              <Form.Label>To</Form.Label>
              <Form.Control type="date"
                required name="to_date" onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="dark" type="submit">Submit</Button>
          </Form>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(CreateTrip)
