import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { ShowOneTrip, EditTrip } from './TripAPI'
import messages from '../auth/messages'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class TripEdit extends Component {
  constructor () {
    super()

    this.state = {
      trip: null,
      updated: false,
      message: null
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    ShowOneTrip(user, id)
      .then(response => this.setState({ trip: response.data.trip }))
      .catch(console.log)
  }

  handleSubmit = (event) => {
    const { alert, history } = this.props
    const { trip } = this.state
    const { user } = this.props
    event.preventDefault()
    EditTrip(user, trip.id, trip)
      .then(() => this.setState({ updated: true }))
      .then(() => alert(messages.EditTripSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ place: '', street: '', city: '', state: '', zip: '', from_date: '', to_date: '', families_joining: '', user_id: '' })
        alert(messages.EditTripFailure, 'danger')
      })
  }

  handleChange = (event) => {
    this.setState({ trip: { ...this.state.trip, [event.target.name]: event.target.value } })
  }

  render () {
    const { trip, updated } = this.state

    if (!trip) {
      return <p>Loading.......</p>
    }

    if (updated) {
      return <Redirect to={`/trips/${trip.id}`} />
    }

    const { place, street, city, state, zip } = trip
    return (
      <Fragment>
        <div className="create-form">
          <div className="form-header">Edit Trip Details</div>
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
                required name="from_date" value={this.state.trip.from_date} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="to_date">
              <Form.Label>To</Form.Label>
              <Form.Control type="date"
                required name="to_date" value={this.state.trip.to_date} onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="dark" type="submit">Submit</Button>
          </Form>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(TripEdit)
