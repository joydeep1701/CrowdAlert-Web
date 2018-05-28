import React from 'react';
import { Image, Modal, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ImageModal = props => (
  <Modal trigger={
    <Image
      src={
          `data:image/png;base64,${props.imageBase64}`
        }
      size="small"
    />
  }
  >
    <Modal.Header>Photo</Modal.Header>
    <Modal.Content image>
      <Responsive maxWidth={900}>
        <Image fluid src={`data:image/png;base64,${props.imageBase64}`} />
      </Responsive>
      <Responsive minWidth={900}>
        <Image size="massive" src={`data:image/png;base64,${props.imageBase64}`} />
      </Responsive>
    </Modal.Content>
  </Modal>
);

ImageModal.propTypes = {
  imageBase64: PropTypes.string.isRequired,
};

export default ImageModal;
