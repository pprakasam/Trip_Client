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
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="place">Place</label> <br />
            <input value={place} name="place" onChange={this.handleChange}/> <br />
            <label htmlFor="street">Street</label> <br />
            <input value={street} name="street" onChange={this.handleChange}/> <br />
            <label htmlFor="city">City</label> <br />
            <input value={city} name="city" onChange={this.handleChange}/> <br />
            <label htmlFor="state">State</label> <br />
            <input value={state} name="state" onChange={this.handleChange}/> <br />
            <label htmlFor="zip">Zip</label> <br />
            <input value={zip} name="zip" onChange={this.handleChange}/> <br />
            <label htmlFor="from_date">From</label> <br />
            <input name="from_date" type="date" onChange={this.handleChange} /> <br />
            <label htmlFor="to_date">To</label> <br />
            <input name="to_date" type="date" onChange={this.handleChange} /> <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </Fragment>

    )
  }
}

export default CreateTrip
