import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Gallery extends Component {
  renderImage (imageUrl) {
    return (
      <p>
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          <img src={imageUrl} width="500" height="500" /></a>
      </p>
    )
  }

  render () {
    return (
      <div className="gallery">
        <div className="images">
          {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
        </div>
      </div>
    )
  }
}
Gallery.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired
}
export default Gallery
