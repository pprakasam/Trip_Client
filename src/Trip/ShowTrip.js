import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { ShowOneTrip, DeleteTrip, JoinTrip } from './TripAPI'
import './Trip.scss'
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

class ShowTrip extends Component {
  constructor () {
    super()

    this.state = {
      trip: '',
      shouldRedirect: false,
      join: false,
      trip_id: '',
      family: ''
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    ShowOneTrip(user, id)
      .then(response => this.setState({
        trip: response.data.trip
      }))
      .catch(console.log)
  }
  deleteTrip (id) {
    const { user } = this.props
    DeleteTrip(user, id)
      .then(() => this.setState({
        shouldRedirect: true
      }))
      .catch(console.log)
  }

  joinTrip (id, place) {
    console.log('IN JOIN TRIP------')
    const { user } = this.props
    const tripfamily = {
      trip_id: id,
      family: user.email.slice(0, (user.email.indexOf('@'))),
      place: place,
      user_id: user.id
    }
    JoinTrip(user, tripfamily)
      .then(response => this.setState({
        join: true
      }))
      .catch(console.log)
  }

  render () {
    const { user } = this.props
    const family = user.email.slice(0, (user.email.indexOf('@')))
    const { id, place, street, city, state, zip, tripfamilies } = this.state.trip
    console.log(tripfamilies)
    if (this.state.shouldRedirect) {
      //      return <Redirect to="/movies" />
      return <Redirect to={{
        pathname: '/trips', state: { message: 'Successfully Deleted Trip!' }
      }} />
    }
    if (this.state.trip.length === 0) {
      return <p>Loading......</p>
    }

    if (this.state.join) {
      return <Redirect to={'/trips'} />
    }

    return (
      <Fragment>
        <div className="show-trip">
          <h2>{place}</h2>
          <h6>{street}</h6>
          <h6>{city}</h6>
          <h6>{state}</h6>
          <h6>{zip}</h6>
          <h6>{this.state.trip.from_date}</h6>
          <h6>{this.state.trip.to_date}</h6>
          <ul>
            {tripfamilies.map(trip => (
              <li key={trip.id}>
                <h6>{trip.family}</h6>
              </li>
            ))}
          </ul>
          { this.state.join === false &&
        <Fragment>
          { !tripfamilies.find(ele => (
            ele.family === family
          )) &&
          <Fragment>
            <div>
              <span>Would you like to join the trip?</span>< br/>
              <button type="button" onClick={() => this.joinTrip(id, place)}>Yes</button>
            </div>
          </Fragment>
          }
        </Fragment>
          }
          { tripfamilies.find(ele => (
            ele.family === family
          )) &&
          <Fragment>
            <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>
            <button type="button" onClick={() => this.deleteTrip(id)}>Delete</button>
          </Fragment>
          }
        </div>
      </Fragment>
    )
  }
}

export default ShowTrip