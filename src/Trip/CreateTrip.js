import React, { Component, Fragment } from 'react'
import './Trip.scss'
import { Redirect } from 'react-router'
import { createTrip } from './TripAPI'
import messages from '../auth/messages'
import { withRouter } from 'react-router-dom'

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
              <input name="from_date" required type="date" onChange={this.handleChange} /></label>
            <label htmlFor="to_date"><span>To</span>
              <input name="to_date" required type="date" onChange={this.handleChange} /></label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Fragment>

    )
  }
}

export default withRouter(CreateTrip)
