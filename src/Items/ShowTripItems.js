import React, { Component, Fragment } from 'react'
import { ShowItems, UpdateTripItems } from './ItemsAPI'

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
    console.log(this.state.itemsArray)
  }

  handleSubmit = (event) => {
    const tripId = this.props.match.params.id
    const { user } = this.props
    const item = {
      assigned_to: user.id
    }
    this.setState({ itemsArray: [ ...this.state.itemsArray, event.target.name ] })
    console.log(this.state.itemsArray)
    event.preventDefault()
    UpdateTripItems(user, tripId, this.state.itemsArray, item)
      .then(console.log)
      .catch(console.log)
  }

  render () {
    const { user } = this.props
    if (this.state.items.length === 0) {
      return <p>Loading......</p>
    }
    return (
      <Fragment>
        <h4>Items:</h4>
        <form onSubmit={this.handleSubmit}>
          <ul>
            {this.state.items.map(item => (
              <li key={item.id}>
                <p>{ item.item_name }
                  { item.assigned_to ? item.assigned_to
                    : <input type="checkbox" onChange={this.handleChange} name={item.item_name} value={user.id} /> }
                </p>
              </li>
            ))}
          </ul>
          <button type="submit">Add Items to my list</button>
        </form>
      </Fragment>
    )
  }
}

export default ShowTripItems
