import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Modal, Responsive, Label } from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { GET_IMAGE_URLS } from '../../utils/apipaths';

/**
 * [ImageModal Displays a small thumbnail & opens a large modal onclick]
 * @param {[type]} props [description]
 */

const undefinedURL = 'https://firebasestorage.googleapis.com/v0/b/crowdalert-4fa46.appspot.com/o/images%2Fundefined?alt=media';

export default class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: this.props.uuid,
      loading: !!this.props.uuid,
      base64: this.props.base64,
    };
  }
  componentWillMount() {
    if (this.state.uuid) {
      fetch(`${GET_IMAGE_URLS}?uuid=${this.state.uuid}`)
      // Decode json
        .then(response => response.json())
        .then((response) => {
          // reject if something bad happens
          if (response === null) {
            throw Error('Image not found');
          }
          this.setState({
            ...this.state,
            imageUrls: response,
            loading: false,
          });
        });
    } else if (!!this.state.base64 === true) {
      this.setState({
        ...this.state,
        imageUrls: {
          url: this.state.base64,
          thumbnail: this.state.base64,
        },
        loading: false,
      });
    }
  }
  render() {
    // console.log(props.imageUrls.url,undefinedURL, props.imageUrls.url === undefinedURL);
    if (this.state.loading !== true
      && this.state.imageUrls.url !== ''
      && this.state.imageUrls.url !== undefinedURL) {
      return (
        <Modal
          trigger={
            <Image
              src={`${this.props.isTrusted
                ? this.state.imageUrls.url
                : this.state.imageUrls.thumbnail}`}
              size="small"
              style={{ backgroundImage: `url(${this.state.imageUrls.thumbnail})` }}
            />
          }
          closeIcon
        >
          <Modal.Header>
            <div>
              <p>Photo</p>
            </div>
          </Modal.Header>
          <Modal.Content image>
            <Responsive maxWidth={900}>
              <Image
                fluid
                src={`${this.state.imageUrls.url}`}
                style={{
                  backgroundImage: `url(${this.state.imageUrls.thumbnail})`,
                }}
              />
            </Responsive>
            <Responsive minWidth={900}>
              <Image size="massive"src={`${this.state.imageUrls.url}`} />
            </Responsive>
            <Modal.Description>
              <Modal.Header>
                {this.props.isTrusted ? null :
                <Label basic color="red">UNVERIFIED</Label>}
              </Modal.Header>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      );
    }
    return (
      <p>Image not available</p>
    );
  }
}

ImageModal.propTypes = {
  uuid: PropTypes.string,
  base64: PropTypes.string,
  isTrusted: PropTypes.bool,
};
ImageModal.defaultProps = {
  uuid: null,
  base64: null,
  isTrusted: false,
};
