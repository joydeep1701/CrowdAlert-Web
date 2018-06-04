import React from 'react';
import { Image, Modal, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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

// ImageModal.propTypes = {
//   imageBase64: PropTypes.string.isRequired,
// };

export default ImageModal;
