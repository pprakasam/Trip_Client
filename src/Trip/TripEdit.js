import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { ShowOneTrip, EditTrip } from './TripAPI'

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
    // axios.get(`${apiUrl}/trips/${id}`)
      .then(response => this.setState({ trip: response.data.trip }))
      .catch(console.log)
  }

  handleSubmit = (event) => {
    const { trip } = this.state
    const { user } = this.props
    event.preventDefault()
    EditTrip(user, trip.id, trip)
    // axios({
    //   url: `${apiUrl}/trips/${trip.id}`,
    //   method: 'patch',
    //   data: { trip }
    // })
      .then(() => this.setState({ updated: true }))
      .catch(() => this.setState({
        trip: { ...trip, title: '', director: '', year: '' },
        message: 'Update failed. Please fill out all fields and try again'
      }))
  }

  handleChange = (event) => {
    console.log(event.target.name, event.target.value)
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
          <input name="from_date" value={this.state.trip.from_date} type="date" onChange={this.handleChange} /> <br />
          <label htmlFor="to_date">To</label> <br />
          <input name="to_date" type="date" value={this.state.trip.to_date} onChange={this.handleChange} /> <br />
          <button type="submit">Submit</button>
        </form>
      </Fragment>
    )
  }
}

export default TripEdit
