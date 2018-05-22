import React from 'react'
import {
  Button,
  Header,
  Icon,
  Modal,
  Responsive,
  Grid
} from 'semantic-ui-react'

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

const ShareModal = (props) => {
  const shareUrl = document.URL;
  const title = props.title;
  return (<Modal trigger={props.children} basic={true} size='small'>
    <Header icon='external share' content='Share'/>
    <Modal.Content>
      <Responsive maxWidth={900}>
        <FacebookShareButton url={shareUrl} quote={title}>
          <Button color='facebook' fluid={true}>
            <Icon name='facebook'/>
            Facebook
          </Button>
        </FacebookShareButton>
        <br/>
        <TwitterShareButton url={shareUrl} title={title}>
          <Button color='twitter' fluid={true}>
            <Icon name='twitter'/>
            Twitter
          </Button>
        </TwitterShareButton>
        <br/>
        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
          <Button color='green' fluid={true}>
            <Icon name='whatsapp'/>
            WhatsApp
          </Button>
        </WhatsappShareButton>
      </Responsive>
      <Responsive minWidth={900}>
        <Grid columns={3}>
          <Grid.Column>
            <FacebookShareButton url={shareUrl} quote={title}>
              <Button color='facebook' fluid={true}>
                <Icon name='facebook'/>
                Facebook
              </Button>
            </FacebookShareButton>
          </Grid.Column>
          <Grid.Column>
            <TwitterShareButton url={shareUrl} title={title}>
              <Button color='twitter' fluid={true}>
                <Icon name='twitter'/>
                Twitter
              </Button>
            </TwitterShareButton>
          </Grid.Column>
          <Grid.Column>
            <Button color='google plus' fluid={true}>
              <Icon name='google plus'/>
              Google Plus
            </Button>
          </Grid.Column>
        </Grid>

      </Responsive>
    </Modal.Content>
    <Modal.Actions></Modal.Actions>
  </Modal>)
}

export default ShareModal;
