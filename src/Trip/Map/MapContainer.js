import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import Geocode from 'react-geocode'

const API_KEY = `${process.env.REACT_APP_GOOGLE_API_KEY}`
Geocode.setApiKey(API_KEY)

const mapStyles = {
  width: '50%',
  height: '50%',
  marginLeft: '20%'
}

export class MapContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      latitude: 0,
      longitude: 0,
      rendered: false
    }
  }
  componentDidMount () {
    console.log(this.props.address)
    console.log(process.env.REACT_APP_GOOGLE_API_KEY)
    Geocode.fromAddress(this.props.address)
      .then(response => {
        this.setState({
          latitude: response.results[0].geometry.location.lat,
          longitude: response.results[0].geometry.location.lng,
          rendered: true
        })
        // const { lat, lng } = response.results[0].geometry.location
        // console.log(this.state.latitude, this.state.longitude)
      },
      error => {
        console.error(error)
      }
      )
  }
  render () {
    const { latitude, longitude, rendered } = this.state
    // console.log(this.state.latitude, this.state.longitude)
    if (!rendered) return <h1>Loading...</h1>
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: latitude,
          lng: longitude
        }} >
        <Marker title={'My Home'}
          position={{ lat: latitude, lng: longitude }} />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer)
