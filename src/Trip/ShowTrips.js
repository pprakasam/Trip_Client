import React, { Component, Fragment } from 'react'
import { ShowAllTrips } from './TripAPI'
import { Link } from 'react-router-dom'
import './Trip.scss'

class ShowTrips extends Component {
  constructor () {
    super()

    this.state = {
      trips: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    ShowAllTrips(user)
      .then(response => this.setState({
        trips: response.data.trips
      }))
      .catch(console.log)
  }

  render () {
    console.log(this.state.trips)
    if (this.state.trips.length === 0) {
      return <p>Loading......</p>
    }
    return (
      <Fragment>
        <div className="trip">
          <div className="form-header">All Trips</div>
          <div>
            <ul>
              {this.state.trips.map(trip => (
                <li key={trip.id}>
                  <h6><Link to={'/trips/' + trip.id}>{trip.place}</Link></h6>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ShowTrips
