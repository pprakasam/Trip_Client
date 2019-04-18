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
        <div className="create-form">
          <div className="form-header">Edit Trip</div>
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
              <input name="from_date" value={this.state.trip.from_date} type="date" onChange={this.handleChange} /></label>
            <label htmlFor="to_date"><span>To</span>
              <input name="to_date" value={this.state.trip.to_date} type="date" onChange={this.handleChange} /></label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default TripEdit
