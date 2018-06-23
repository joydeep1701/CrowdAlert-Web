import React, { Component } from 'react';

import {
  Dimmer,
  Grid,
  Loader,
  Modal,
  Button,
  Segment,
  Image as SemanticImage,
  Icon,
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import { Image } from '../../components';

import Webcam from './webcam';

class ImagesTab extends Component {
  render() {
    return (
      <div>
        <Dimmer active={false}>
          <Loader />
        </Dimmer>
        <Segment attached color="brown">

          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <p>Use device camera</p>
                <Modal
                  trigger={<Button
                    icon="camera"
                    fluid
                    size="massive"
                    basic
                    color="green"
                    style={{
                      marginTop: '5vh', marginBottom: '5vh', paddingTop: '8vh', paddingBottom: '8vh',
                      }}
                    disabled={this.state.reportForm.imageSelectDisabled}
                  />}
                  closeIcon
                >
                  <Modal.Header>Click a Photo</Modal.Header>
                  <Modal.Content>
                    <Webcam
                      audio={false}
                      height="100%"
                      ref={this.setWebcamRef}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      front={false}
                    />
                    <Modal.Description>
                      <Grid columns="equal">
                        <Grid.Row textAlign="center">
                          <Grid.Column />
                          <Grid.Column>
                            <Button
                              circular
                              icon="camera"
                              fluid
                              size="massive"
                              basic
                              color="green"
                              onClick={this.captureWebcam}
                              disabled={this.state.reportForm.imageSelectDisabled}
                            />
                          </Grid.Column>
                          <Grid.Column />
                        </Grid.Row>
                      </Grid>

                    </Modal.Description>
                  </Modal.Content>
                </Modal>

              </Grid.Column>
              <Grid.Column>
                <Dropzone
                  ref={(node) => { this.dropzoneRef = node; }}
                  onDrop={this.handleFileSelect}
                  style={{ display: 'none' }} 
                />
                <p>Upload from device</p>
                <Button
                  icon="cloud upload"
                  fluid
                  size="massive"
                  basic
                  color="orange"
                  style={{
                    marginTop: '5vh', marginBottom: '5vh', paddingTop: '8vh', paddingBottom: '8vh',
                    }}
                  onClick={() => { this.dropzoneRef.open(); }}
                  disabled={this.state.reportForm.imageSelectDisabled}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment attached secondary>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <SemanticImage.Group size="tiny">
                  {
                      this.state.eventFormData.images.map(image => (
                        <Image
                          base64={image.base64}
                          key={image.key}
                          isTrusted={image.isVerified}
                        />
                      ))
                    }
                </SemanticImage.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {
                    this.state.eventFormData.images.length ?
                      <Button
                        color="brown"
                        floated="right"
                        onClick={this.handleUpload}
                        loading={this.state.reportForm.uploading}
                        disabled={this.state.reportForm.imageSelectDisabled}
                      >
                        <Icon name="cloud upload" />
                        Upload
                      </Button>
                    : null
                  }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default ImagesTab;
