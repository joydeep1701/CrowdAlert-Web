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
  handleUpload() {
    if (!this.state.reportForm.eventID) {
      return;
    }
    this.setState({
      ...this.state,
      reportForm: {
        ...this.state.reportForm,
        uploading: true,
        imageSelectDisabled: true,
      },
    });


    const { images } = this.state.eventFormData;
    const imagesUpload = images.map((image) => {
      console.log(image);
      if (image.isUploaded) {
        return null;
      }
      const newFormData = new FormData();
      newFormData.append('isValid', image.isVerified);
      newFormData.append('eventId', this.state.reportForm.eventID);
      newFormData.append('base64', image.base64);


      return fetch('UPLOAD_IMAGES', {
        method: 'post',
        body: newFormData,
      }).then(resp => resp.json())
        .then((resp) => {
          const newImage = { ...image };
          newImage.isUploaded = true;
          const newState = {
            ...this.state,
            eventFormData: {
              ...this.state.eventFormData,
            },
          };
          newState.eventFormData.images[image.key] = image;
          this.setState(newState);
        })
        .catch(() => {});
    });
    Promise.all(imagesUpload).then(() => {
      this.setState({
        ...this.state,
        reportForm: {
          ...this.state.reportForm,
          uploading: false,
          imageSelectDisabled: true,
          uploadComplete: true,
        },
      });
      // Navigate to view events
    }).then(() => {
      // history.push(`/view/${this.state.reportForm.eventID}`)
    });
  }
  render() {
    return (
      <div>
        <Dimmer active={false}>
          <Loader />
        </Dimmer>
        <Segment attached color="brown">

          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column textAlign="center">
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
                    // disabled={this.state.reportForm.imageSelectDisabled}
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
                              // disabled={this.state.reportForm.imageSelectDisabled}
                            />
                          </Grid.Column>
                          <Grid.Column />
                        </Grid.Row>
                      </Grid>

                    </Modal.Description>
                  </Modal.Content>
                </Modal>

              </Grid.Column>
              <Grid.Column textAlign="center">
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
                  // disabled={this.state.reportForm.imageSelectDisabled}
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
                  {/* {
                      this.state.eventFormData.images.map(image => (
                        <Image
                          base64={image.base64}
                          key={image.key}
                          isTrusted={image.isVerified}
                        />
                      ))
                    } */}
                </SemanticImage.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {/* {
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
                  } */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default ImagesTab;
