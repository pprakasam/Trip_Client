import React, { Component, Fragment } from 'react'
import { storage } from './index.js'
import { AddImage, ShowAllImages } from './PhotosAPI'
import Gallery from './Gallery'
// import messages from '../../auth/messages'

class ImageUpload extends Component {
  constructor () {
    super()
    this.state = {
      image: null,
      photos: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    // const tripId = this.props.match.params.id
    ShowAllImages(user)
      .then(response => this.setState({
        photos: response.data.photos
      }))
      .catch(console.log)
  }
  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      this.setState(() => ({ image }))
    }
  }

  handleUpload = () => {
    const photo = {
      image: '',
      trip_id: this.props.match.params.id
    }
    const { user } = this.props
    const { image } = this.state
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on('state_changed',
      (snapshot) => {

      },
      (error) => {
        console.log(error)
      },
      () => {
        storage.ref('images').child(image.name).getDownloadURL()
          // .then(url => {
          //   // this.setState(() => ({ url }))
          .then(function (downloadURL) {
            photo.image = downloadURL
            AddImage(user, photo)
              .then(console.log)
              .catch(console.log)
          })
      }

    )
  }

  // .then(() => alert(messages.createTripSuccess, 'success'))
  // .then(() => history.push('/'))
  // .catch(error => {
  //   console.error(error)
  //   alert(messages.createTripFailure, 'danger')
  // })

  render () {
    const urls = this.state.photos.map(obj => obj.image)
    console.log(urls)
    if (this.state.url) {
      console.log(this.state.url)
      return <Fragment>
        <img src={ this.state.url } width="300" height="300"/>
        <a href={ this.state.url } target="_blank" rel="noopener noreferrer">Photo 1</a>
      </Fragment>
    }
    return (
      <Fragment>
        <div>
          <Gallery imageUrls={ urls } />
        </div>
        <div>
          <h3> Upload Photos </h3>
          <input type="file" onChange={this.handleChange} />
          <button onClick={this.handleUpload}>Upload</button>
        </div>
      </Fragment>
    )
  }
}

export default ImageUpload
