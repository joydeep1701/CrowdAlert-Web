import React from 'react';
import PropTypes from 'prop-types';
import { Image, Modal, Responsive } from 'semantic-ui-react';

/**
 * [ImageModal Displays a small thumbnail & opens a large modal onclick]
 * @param {[type]} props [description]
 */
const ImageModal = (props) => {
  if (props.imageUrls) {
    return (
      <Modal trigger={
        <Image
          src={`${props.imageUrls.url}`}
          size="small"
          style={{ backgroundImage: `url(${props.imageUrls.thumbnail})` }}
        />
      }
      >
        <Modal.Header>Photo</Modal.Header>
        <Modal.Content image>
          <Responsive maxWidth={900}>
            <Image fluid src={`${props.imageUrls.url}`} />
          </Responsive>
          <Responsive minWidth={900}>
            <Image size="massive"src={`${props.imageUrls.url}`} />
          </Responsive>
        </Modal.Content>
      </Modal>
    );
  }
  return null;
};

ImageModal.propTypes = {
  imageUrls: PropTypes.shape({
    /* SVG url for the image thumbnail */
    thumbnail: PropTypes.string,
    /* Original image thumbnail */
    url: PropTypes.string,
  }),
};
ImageModal.defaultProps = {
  imageUrls: false,
};

export default ImageModal;
