import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import { ShowOneTrip, JoinTrip } from './TripAPI'
import './Trip.scss'
import messages from '../auth/messages'
import MapContainer from './Map/MapContainer'

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
      // .then(function (response) {
      //   Geocode.fromAddress(response.data.trip.street + ',' + response.data.trip.city + ',' +
      //   ',' + response.data.trip.state + ',' + response.data.trip.zip).then(
      //     resp => {
      //       const { lat, lng } = resp.results[0].geometry.location
      //       console.log(lat, lng)
      //     },
      //     error => {
      //       console.error(error)
      //     }
      //   )
      // })
      .catch(console.log)
  }
  // deleteTrip (id) {
  //   const { alert } = this.props
  //   const { user } = this.props
  //   DeleteTrip(user, id)
  //     .then(() => this.setState({
  //       shouldRedirect: true
  //     }))
  //     .catch(error => {
  //       console.error(error)
  //       alert(messages.deleteTripFailure, 'danger')
  //     })
  // }

  joinTrip (id, place) {
    const { alert, history } = this.props
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
      .then(() => alert(messages.joinTripSuccess, 'success'))
      .then(() => history.push('/tripfamilies'))
      .catch(error => {
        console.error(error)
        alert(messages.joinTripFailure, 'danger')
      })
  }

  render () {
    const { user } = this.props
    const family = user.email.slice(0, (user.email.indexOf('@')))
    const { id, place, street, city, state, zip, tripfamilies } = this.state.trip
    const address = street + ',' + city + ',' + state + ',' + zip
    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/trips', state: { message: 'Successfully Deleted Trip!' }
      }} />
    }
    if (this.state.trip.length === 0) {
      return <p>Loading......</p>
    }

    // if (this.state.join) {
    //   return <Redirect to={'/trips'} />
    // }

    return (
      <Fragment>
        <div className="create-form">
          <div className="form-header">{place}</div>
          <h6><span className="span-heading">Address</span></h6>
          <h6>{street}</h6>
          <h6>{city}</h6>
          <h6>{state}</h6>
          <h6>{zip}</h6>
          <h6> <span className="span-heading">From:</span> {this.state.trip.from_date} <span className="span-heading">To:</span>  {this.state.trip.to_date}</h6>
          <h6> <span className="span-heading">People who joined the Trip</span></h6>
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
            <Link to={this.props.match.url + '/photos'}><button>Photos</button></Link>
            <Link to={this.props.match.url + '/items'}><button>Add Items</button></Link>
            <Link to={this.props.match.url + '/showtripitems'}><button>Show Items</button></Link>
          </Fragment>
          }
        </div>
        <MapContainer address={ address }/>
      </Fragment>
    )
  }
}

export default withRouter(ShowTrip)
