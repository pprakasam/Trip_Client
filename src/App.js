import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import CreateTrip from './Trip/CreateTrip'
import ShowTrips from './Trip/ShowTrips'
import ShowTrip from './Trip/ShowTrip'
import TripEdit from './Trip/TripEdit'
import MyTrips from './Trip/MyTrips'
import CreateItem from './Items/CreateItem'
import ShowTripItems from './Items/ShowTripItems'
import ShowMyTripItems from './Items/ShowMyTripItems'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-trip' render={() => (
            <CreateTrip alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/trips' render={() => (
            <ShowTrips alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path="/trips/:id" render={(props) => (
            <ShowTrip alert={this.alert} user={user} {...props}/>
          )} />
          <AuthenticatedRoute user={user} exact path="/trips/:id/edit" render={(props) => (
            <TripEdit alert={this.alert} user={user} {...props}/>
          )} />
          <AuthenticatedRoute user={user} exact path="/tripfamilies" render={(props) => (
            <MyTrips alert={this.alert} user={user} {...props}/>
          )} />
          <AuthenticatedRoute user={user} exact path="/trips/:id/items" render={(props) => (
            <CreateItem alert={this.alert} user={user} {...props}/>
          )} />
          <AuthenticatedRoute user={user} exact path="/trips/:id/showtripitems" render={(props) => (
            <ShowTripItems alert={this.alert} user={user} {...props}/>
          )} />
          <AuthenticatedRoute user={user} exact path="/trips/:id/showmytripitems" render={(props) => (
            <ShowMyTripItems alert={this.alert} user={user} {...props}/>
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
