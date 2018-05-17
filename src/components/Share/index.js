import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ShareModal = (props) => (
  <Modal trigger={props.children} basic size='small'>
    <Header icon='external share' content='Share' />
    <Modal.Content>
        <Button color='facebook' fluid>
            <Icon name='facebook' /> Facebook
        </Button>
        <br />
        <Button color='twitter' fluid>
            <Icon name='twitter' /> Twitter
        </Button>
        <br />
        <Button color='google plus' fluid>
            <Icon name='google plus' /> Google Plus
        </Button>
        
    </Modal.Content>
    <Modal.Actions>

      
    </Modal.Actions>
  </Modal>
)

export default ShareModal;