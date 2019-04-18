import React, { Component, Fragment } from 'react'
import './Trip.scss'
import { Redirect } from 'react-router'
import { createTrip } from './TripAPI'

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
    console.log(user)
    console.log(event.target.name, event.target.value)
    this.setState({ trip: { ...this.state.trip,
      [event.target.name]: event.target.value,
      user_id: user.id
    } })
  }

  handleSubmit = (event) => {
    console.log(this.state.trip)
    const { trip } = this.state
    const { user } = this.props
    event.preventDefault()
    createTrip(user, trip)
      .then(response => this.setState({
        created: true,
        trip: response.data.trip
      }))
      .catch(console.log)
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
              <input value={place} name="place" onChange={this.handleChange}/></label>
            <label htmlFor="street"><span>Street</span>
              <input value={street} name="street" onChange={this.handleChange}/></label>
            <label htmlFor="city"><span>City</span>
              <input value={city} name="city" onChange={this.handleChange}/></label>
            <label htmlFor="state"><span>State</span>
              <input value={state} name="state" onChange={this.handleChange}/></label>
            <label htmlFor="zip"><span>Zip</span>
              <input value={zip} name="zip" onChange={this.handleChange}/></label>
            <label htmlFor="from_date"><span>From</span>
              <input name="from_date" type="date" onChange={this.handleChange} /></label>
            <label htmlFor="to_date"><span>To</span>
              <input name="to_date" type="date" onChange={this.handleChange} /></label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Fragment>

    )
  }
}

export default CreateTrip
