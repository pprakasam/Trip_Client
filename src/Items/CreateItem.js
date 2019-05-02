import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { AddItem } from './ItemsAPI'

class CreateItem extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      moreItems: [{
        item_name: '',
        trip_id: ''
      }],
      items: {
        item_name: '',
        assigned_to: '',
        trip_id: ''
      },
      created: false
    }
  }

  handleChange = (event) => {
    const id = this.props.match.params.id
    const tripId = 'trip_id'

    if (['item_name'].includes(event.target.className)) {
      const items = [...this.state.moreItems]
      items[event.target.dataset.id][event.target.className] = event.target.value
      items[event.target.dataset.id][tripId] = id
      // this.setState({ items }, () => console.log(this.state.items))
      this.setState({ items })
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }
    // this.setState({ items: { ...this.state.items,
    //   [event.target.name]: event.target.value,
    //   trip_id: id
    // } })
  }

  handleSubmit = (event) => {
    const { user } = this.props
    event.preventDefault()
    AddItem(user, this.state.moreItems)
      .then(response => this.setState({
        created: true
        // items: response.data.item
      }))
      .catch(error => {
        console.error(error)
      })
  }
  addItems = (event) => {
    this.setState({
      moreItems: [...this.state.moreItems, { item_name: '' }]
    })
  }

  render () {
    const id = this.props.match.params.id
    // const { item } = this.state.items

    if (this.state.created) {
      return (
        <Redirect to={{
          pathname: `/trips/${id}`, state: { message: 'Successfully Added Item!' }
        }} />
      )
    }
    return (
      <Fragment>
        <div className="create-form">
          <div className="form-header">Enter Item to Add</div>
          <form onSubmit={this.handleSubmit}>
            {
              this.state.moreItems.map((item, index) => {
                const itemId = `item${index}`
                return (
                  <div key={index}>
                    <label htmlFor={itemId}><span>Item</span>
                      <input data-id={index} name={itemId} className="item_name"required onChange={this.handleChange}/></label>
                  </div>
                )
              })
            }
            <button type="button" onClick={this.addItems}>Add Items</button>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Fragment>

    )
  }
}

export default CreateItem
