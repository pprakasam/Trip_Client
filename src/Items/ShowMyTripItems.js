import React, { Component, Fragment } from 'react'
import { ShowMyItems, RemoveItem } from './ItemsAPI'
import { Redirect } from 'react-router'
import '../Trip/Trip.scss'

class ShowMyTripItems extends Component {
  constructor () {
    super()

    this.state = {
      items: [],
      shouldRedirect: false
    }
  }

  componentDidMount () {
    const tripId = this.props.match.params.id
    const { user } = this.props
    const userName = user.email.slice(0, (user.email.indexOf('@')))
    ShowMyItems(user, userName, tripId)
      .then(response => this.setState({
        items: response.data.items
      }))
      .catch(console.log)
  }

  removeItem (id) {
    const { user } = this.props
    const item = {
      assigned_to: ''
    }
    RemoveItem(user, id, item)
      .then(() => this.setState({
        shouldRedirect: true
      }))
      .catch(console.log)
  }

  render () {
    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/tripfamilies', state: { message: 'Successfully Deleted Item!' }
      }} />
    }

    if (this.state.items.length === 0) {
      return <div className="no-data">
        <h3>No items to show. Select items you like to bring to the Trip</h3>
      </div>
    }

    return (
      <Fragment>
        <div className="create-form">
          <div className="form-header">My Items</div>
          <ul>
            {this.state.items.map(item => (
              <li key={item.id}>
                <p>
                  { item.item_name } { <button type="button" onClick={() => this.removeItem(item.id)}>Remove</button> }
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default ShowMyTripItems
