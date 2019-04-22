import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { ShowOneTrip, EditTrip } from './TripAPI'
import messages from '../auth/messages'
import { withRouter } from 'react-router-dom'

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
          <div className="form-header">Edit Trip</div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="place"><span>Place</span>
              <input value={place} required name="place" onChange={this.handleChange}/></label>
            <label htmlFor="street"><span>Street</span>
              <input value={street} required name="street" onChange={this.handleChange}/></label>
            <label htmlFor="city"><span>City</span>
              <input value={city} required name="city" onChange={this.handleChange}/></label>
            <label htmlFor="state"><span>State</span>
              <input value={state} required name="state" onChange={this.handleChange}/></label>
            <label htmlFor="zip"><span>Zip</span>
              <input value={zip} required name="zip" onChange={this.handleChange}/></label>
            <label htmlFor="from_date"><span>From</span>
              <input name="from_date" required value={this.state.trip.from_date} type="date" onChange={this.handleChange} /></label>
            <label htmlFor="to_date"><span>To</span>
              <input name="to_date" required value={this.state.trip.to_date} type="date" onChange={this.handleChange} /></label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(TripEdit)
