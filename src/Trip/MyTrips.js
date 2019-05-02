import React, { Component, Fragment } from 'react'
import { ShowMyTrips, DeleteMyTrip } from './TripAPI'
import { Link, withRouter } from 'react-router-dom'
import messages from '../auth/messages'
import './Trip.scss'

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
    const { alert, history } = this.props
    const { user } = this.props
    DeleteMyTrip(user, id)
      .then(() => this.setState({
        deleted: true
      }))
      .then(() => alert(messages.RemoveTripSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        alert(messages.RemoveTripFailure, 'danger')
      })
  }

  render () {
    if (this.state.mytrips.length === 0) {
      return <div className="no-data">
        <h3>No trips to show</h3>
      </div>
    }
    if (this.state.deleted) {
      return <p>Deleted the trip</p>
    }
    return (
      <Fragment>
        <div className="create-form trip">
          <div className="form-header">My Trips</div>
          <ul>
            {this.state.mytrips.map(mytrip => (
              <li key={mytrip.id}>
                <div>
                  <button type="button" onClick={() => this.deleteMyTrip(mytrip.id)}>X</button>
                  <Link to={'/trips/' + mytrip.trip_id}>{mytrip.place}</Link>
                  <Link to={`/trips/${mytrip.trip_id}/showmytripitems`} className="list-btn"><button >My List</button></Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(MyTrips)
