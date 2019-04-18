import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { AddItem } from './ItemsAPI'

class CreateItem extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
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
    const { user } = this.props
    console.log(user)
    console.log(event.target.name, event.target.value)
    this.setState({ items: { ...this.state.items,
      [event.target.name]: event.target.value,
      trip_id: id
    } })
  }

  handleSubmit = (event) => {
    console.log(this.state.items)
    const { user } = this.props
    event.preventDefault()
    AddItem(user, this.state.items)
      .then(response => this.setState({
        created: true,
        items: response.data.item
      }))
      .catch(error => {
        console.error(error)
      })
  }

  render () {
    const { item } = this.state.items
    if (this.state.created) {
      return (
        <Redirect to={{
          pathname: '/trips', state: { message: 'Successfully Added Item!' }
        }} />
      )
    }
    return (
      <Fragment>
        <div className="create-form">
          <div className="form-header">Enter Item to Add</div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="item_name"><span>Item</span>
              <input value={item} name="item_name" required onChange={this.handleChange}/></label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Fragment>

    )
  }
}

export default CreateItem
