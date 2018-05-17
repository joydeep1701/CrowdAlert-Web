import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ImageModal = (props) => (
  <Modal trigger={<Image src={`data:image/png;base64,${props.image_base64}`} size='small' />}>
    <Modal.Header>Photo</Modal.Header>
    <Modal.Content image>
      <Image fluid src={`data:image/png;base64,${props.image_base64}`} />
    </Modal.Content>
  </Modal>
)

export default ImageModal;