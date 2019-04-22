import React, { Component, Fragment } from 'react'
import { ShowItems, UpdateTripItems } from './ItemsAPI'
import messages from '../auth/messages'
import { withRouter } from 'react-router-dom'

class ShowTripItems extends Component {
  constructor () {
    super()

    this.state = {
      items: [],
      itemsArray: []
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    ShowItems(user, id)
      .then(response => this.setState({
        items: response.data.items
      }))
      .catch(console.log)
  }

  handleChange = (event) => {
    this.setState({ itemsArray: [ ...this.state.itemsArray, event.target.name ] })
  }

  handleSubmit = (event) => {
    const { alert, history } = this.props
    const tripId = this.props.match.params.id
    const { user } = this.props
    const userName = user.email.slice(0, (user.email.indexOf('@')))
    const item = {
      assigned_to: user.email.slice(0, (user.email.indexOf('@')))
    }
    this.setState({ itemsArray: [ ...this.state.itemsArray, event.target.name ] })
    event.preventDefault()
    UpdateTripItems(user, tripId, this.state.itemsArray, userName, item)
      .then(() => alert(messages.updateTripItemsSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        alert(messages.updateTripItemsFailure, 'danger')
      })
  }

  render () {
    const { user } = this.props
    const submitFlag = this.state.items.some(item => (
      item.assigned_to === null
    ))
    if (this.state.items.length === 0) {
      return <h2>Items not added yet. Start adding items to the Trip</h2>
    }
    return (
      <Fragment>
        <div className="create-form">
          <div className="form-header">Items:</div>
          <form onSubmit={this.handleSubmit}>
            <ul>
              {this.state.items.map(item => (
                <li key={item.id}>
                  <p><label><span>{ item.item_name }</span></label>
                    { item.assigned_to ? item.assigned_to
                      : <input type="checkbox" onChange={this.handleChange} name={item.item_name} value={user.id} /> }
                  </p>
                </li>
              ))}
            </ul>
            { submitFlag && <button type="submit">Add Items to my list</button> }
          </form>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(ShowTripItems)
