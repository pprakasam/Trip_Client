import React, { Component, Fragment } from 'react'
import { ShowMyTrips, DeleteMyTrip } from './TripAPI'
import { Link } from 'react-router-dom'

class MyTrips extends Component {
  constructor () {
    super()

    this.state = {
      mytrips: [],
      deleted: false
    }
  }

  componentDidMount () {
    const { user } = this.props
    ShowMyTrips(user)
      .then(response => this.setState({
        mytrips: response.data.tripfamilies
      }))
      .catch(console.log)
  }

  deleteMyTrip (id) {
    const { user } = this.props
    DeleteMyTrip(user, id)
      .then(() => this.setState({
        deleted: true
      }))
      .catch(console.log)
  }

  render () {
    console.log(this.state.mytrips)
    if (this.state.mytrips.length === 0) {
      return <p>No trips to show</p>
    }
    if (this.state.deleted) {
      return <p>Deleted the trip</p>
    }
    return (
      <Fragment>
        <h4>My Trips:</h4>
        <ul>
          {this.state.mytrips.map(mytrip => (
            <li key={mytrip.id}>
              <h5><Link to={'/trips/' + mytrip.trip_id}>{mytrip.place}</Link></h5>
              <button type="button" onClick={() => this.deleteMyTrip(mytrip.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default MyTrips