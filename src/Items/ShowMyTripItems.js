import React, { Component, Fragment } from 'react'
import { ShowMyItems, RemoveItem } from './ItemsAPI'
import { Redirect } from 'react-router'

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
    console.log(tripId)
    const { user } = this.props
    ShowMyItems(user, user.id, tripId)
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
      return <p>Loading......</p>
    }
    return (
      <Fragment>
        <h4>My Items: </h4>
        <ul>
          {this.state.items.map(item => (
            <li key={item.id}>
              <p>
                { item.item_name } { <button type="button" onClick={() => this.removeItem(item.id)}>Remove</button> }
              </p>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default ShowMyTripItems
