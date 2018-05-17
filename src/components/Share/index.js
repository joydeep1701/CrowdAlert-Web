import React from 'react'
import { Button, Header, Icon, Modal, Responsive,Grid } from 'semantic-ui-react'

const ShareModal = (props) => (
  <Modal trigger={props.children} basic size='small'>
    <Header icon='external share' content='Share' />
    <Modal.Content>
        <Responsive maxWidth={900}>
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
        </Responsive>
        <Responsive minWidth={900}>
            <Grid columns={3}>
                <Grid.Column>
                    <Button color='facebook' fluid>
                        <Icon name='facebook' /> Facebook
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button color='twitter' fluid>
                        <Icon name='twitter' /> Twitter
                    </Button>
                </Grid.Column>
                <Grid.Column>
                <Button color='google plus' fluid>
                <Icon name='google plus' /> Google Plus
            </Button>

                </Grid.Column>
            </Grid>
            
            

            

        </Responsive>

        
    </Modal.Content>
    <Modal.Actions>

      
    </Modal.Actions>
  </Modal>
)

export default ShareModal;