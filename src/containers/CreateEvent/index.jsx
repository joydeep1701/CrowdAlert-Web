/* global navigator */
import React, { Component } from 'react';
import { Button, Header, Container, Modal, Icon, Step, Segment, Image as SemanticImage, Grid, Form, Input, TextArea, Checkbox, Label, Responsive, Dimmer, Loader } from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { REVERSE_GEOCODE, GET_LOCATION_BY_IP } from '../../utils/apipaths';
import getEventColor from '../../utils/eventcolors';
import {
  Image,
  MapWrapper,
  Sonar,
} from '../../components';
import Dropzone from 'react-dropzone';

import Webcam from './webcam';

const PERMISSION_REQUIRED_TEXT = `We need to access your location & camera  
                                    in order to report an incident`;
const PERMISSION_FAILED_TEXT = `You need to enable location permissions in
                                  order to report an incident`;
const LOCATION_FAILED_TEXT = `You need enable location services in order to 
                                  report an incident. Currently we are using an
                                  approximate location based on your IP. Please 
                                  update the marker & save the location`;
const MEDIA_DEVICES_FAILED = `We need access to your camera. Please enable the 
                                  camera permission.`;

const eventOptions = [
  { key: 'rd', text: 'Road', value: 'road' },
  { key: 'el', text: 'Electric', value: 'electric' },
  { key: 'hl', text: 'Health', value: 'health' },
  { key: 'fr', text: 'Fire', value: 'fire' },
];


const ConfirmationModal = props => (
  <Modal open={props.open} basic size="small">
    <Header icon="archive" content="Permissions Required" />
    <Modal.Content>
      <p>{props.text}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button color="teal" inverted onClick={() => props.closeModal()}>
        <Icon name="checkmark" />
        Okay
      </Button>
    </Modal.Actions>
  </Modal>
);

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: null,
        lng: null,
      },
      confirmationModal: {
        isopen: true,
        text: PERMISSION_REQUIRED_TEXT,
      },
      permissions: {
        location: true,
        camera: false,
      },
      reportForm: {
        activeTab: 2,
        loading: false,
        message: {
          shown: false,
          header: '',
          body: '',
        },
        eventID: null,
        isFreezed: false,
        validationErrors: [],
      },
      eventFormData: {
        location: {
          lat: null,
          lng: null,
          isValid: false,
          text: 'Select Location',
        },
        details: {
          eventType: null,
          title: '',
          description: '',
          isValid: false,
          public: true,
          help: false,

        },
        images: [],
      },
    };
    this.handlePermission = this.handlePermission.bind(this);
    this.handleGeoLoactionPermissionDenied = this.handleGeoLoactionPermissionDenied.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleGetLocation = this.handleGetLocation.bind(this);
    this.handleGeoLocationSuccess = this.handleGeoLocationSuccess.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGeoLocationFailure = this.handleGeoLocationFailure.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setWebcamRef = this.setWebcamRef.bind(this);
    this.captureWebcam = this.captureWebcam.bind(this);
    this.captureWebcam = this.captureWebcam.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  componentWillMount() {
    this.handlePermission();
  }
  handleGeoLocationSuccess(response) {
    console.log('====================================');
    console.log('Got Location');
    console.log('====================================');
    console.log(response);
    this.setState({
      ...this.state,
      location: {
        lat: response.coords.latitude,
        lng: response.coords.longitude,
      },
      permissions: {
        ...this.state.permissions,
        location: true,
      },
      eventFormData: {
        ...this.state.eventFormData,
        location: {
          lat: response.coords.latitude,
          lng: response.coords.longitude,
          isValid: false,
        },
      },
    });
    this.updateLocationReverseGeocode(response.coords.latitude, response.coords.longitude);
  }
  handleMediaSuccess(response) {
    const tracks = response.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    this.setState({
      ...this.state,
      permissions: {
        ...this.state.permissions,
        camera: true,
      },
    });
  }

  handleGeoLocationFailure(err) {
    // fetch ip locations
    console.error('Location Failed, Switching to IP API', err);
    fetch(GET_LOCATION_BY_IP).then(resp => resp.json()).then((resp) => {
      // Store the location
      this.setState({
        ...this.state,
        location: {
          lat: parseFloat(resp.lat),
          lng: parseFloat(resp.lng),
        },
        permissions: {
          ...this.state.permissions,
          location: true,
        },
        eventFormData: {
          ...this.state.eventFormData,
          location: {
            lat: parseFloat(resp.lat),
            lng: parseFloat(resp.lng),
            isValid: false,
          },
        },
        reportForm: {
          activeTab: 0,
        },
      });
    });
  }
  handleGeoLoactionPermissionDenied() {
    this.setState({
      ...this.state,
      permissions: {
        ...this.state.permissions,
        location: false,
      },
      confirmationModal: {
        isopen: true,
        text: PERMISSION_FAILED_TEXT,
      },
    });
  }
  handleMediaPermissionDenied() {
    this.setState({
      ...this.state,
      permissions: {
        ...this.state.permissions,
        camera: false,
      },
      confirmationModal: {
        isopen: true,
        text: MEDIA_DEVICES_FAILED,
      },
    });
  }
  handleGetLocation() {
    navigator
      .geolocation
      .getCurrentPosition(
        this.handleGeoLocationSuccess,
        this.handleGeoLocationFailure, {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 20000,
        },
      );
  }
  closeModal() {
    if (this.state.permissions.location && this.state.permissions.camera) {
      this.setState({
        ...this.state,
        confirmationModal: {
          ...this.state.confirmationModal,
          isopen: false,
        },
      });
    }
  }

  handlePermission() {
    navigator
      .permissions
      .query({ name: 'geolocation' })
      .then((result) => {
        if (result.state === 'granted') {
          this.closeModal();
          this.handleGetLocation();
        } else if (result.state === 'prompt') {
          setTimeout(this.handleGetLocation, 3500);
        } else if (result.state === 'denied') {
          this.handleGeoLoactionPermissionDenied();
        }
        result.onchange = () => {
          // this.handlePermission();
        };
      });
    navigator
      .mediaDevices
      .getUserMedia({ video: true })
      .then((response) => {
        this.handleMediaSuccess(response);
      })
      .catch((err) => {
        this.handleMediaPermissionDenied();
      });
  }
  handleMapLocationChange(e) {
    if (this.state.reportForm.isFreezed) {
      return;
    }
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    this.setState({
      eventFormData: {
        ...this.state.eventFormData,
        location: {
          lat,
          lng,
          isValid: false,
        },
      },
    });
    this.updateLocationReverseGeocode(lat, lng);
  }
  updateLocationReverseGeocode(lat, lng) {
    fetch(`${REVERSE_GEOCODE}?lat=${lat}&long=${lng}&accuracy=high`)
      .then(response => response.json())
      .then((response) => {
        this.setState({
          ...this.state,
          eventFormData: {
            ...this.state.eventFormData,
            text: response[0].formatted_address,
          },
        });
      });
  }
  handleSaveLocation() {
    console.log('====================================');
    console.log('Save Location Called');
    console.log('====================================');
    if (this.state.reportForm.isFreezed) {
      return;
    }
    this.setState(
      {
        ...this.state,
        eventFormData: {
          ...this.state.eventFormData,
          location: {
            ...this.state.eventFormData.location,
            isValid: true,
          },
        },
      },
      () => this.handleTabChange(1),
    );
  }
  handleTabChange(index) {
    this.setState({
      ...this.state,
      reportForm: {
        ...this.state.reportForm,
        activeTab: index,
      },
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('====================================');
    console.log(this.state, name, target);
    console.log('====================================');
    this.setState({
      ...this.state,
      eventFormData: {
        ...this.state.eventFormData,
        details: {
          ...this.state.eventFormData.details,
          [name]: value,
        },
      },
    });
  }
  handleSubmit() {
    const { eventFormData } = this.state;

    if (!eventFormData.location.isValid) {
      alert('Location not saved');
      return;
    }
    if (!eventFormData.details.eventType) {
      alert('Event type not given');
      return;
    }
    if (!eventFormData.title) {
      alert('Short Description not given');
      return;
    }


    this.setState({
      ...this.state,
      reportForm: {
        ...this.state.reportForm,
        loading: true,
      },
      eventFormData: {
        ...this.state.eventFormData,
        details: {
          ...this.state.eventFormData.details,
          isValid: true,
          isFreezed: true,
        },
      },
    });

    
    const eventData = {
      category: eventFormData.details.eventType,
      description: eventFormData.details.description,
      local_assistance: eventFormData.details.help,
      title: eventFormData.details.title,
      public: {
        view: eventFormData.details.public,
        share: eventFormData.details.help,
      },
      location: {
        coords: {
          latitude: eventFormData.location.lat,
          longitude: eventFormData.location.lng,
        },
      },
    };
    const newFormData = new FormData();
    newFormData.append('eventData', JSON.stringify(eventData));
    fetch('https://localhost:8000/api/foo', {
      method: 'post',
      body: newFormData,
    }).then(resp => resp.json())
      .then((resp) => {
        this.setState({
          ...this.state,
          reportForm: {
            ...this.state.reportForm,
            loading: false,
            isFreezed: true,
            eventID: resp.eventID,
          },
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          reportForm: {
            ...this.state.reportForm,
            loading: false,
            isFreezed: false,
          },
        });
      });
  }
  setWebcamRef(webcam) {
    this.webcam = webcam;
  }
  captureWebcam() {
    console.log('OK');
    const src = this.webcam.getScreenshot();
    const newImage = {
      base64: src,
      isVerified: true,
      key: this.state.eventFormData.images.length,
      isUploaded: false,
    };
    this.setState({
      ...this.state,
      eventFormData: {
        ...this.state.eventFormData,
        images: [
          ...this.state.eventFormData.images,
          newImage,
        ],
      },
    });
    // console.log(src);
  }
  handleFileSelect(accepted) {
    accepted.map((imageFile) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const newImage = {
          base64: reader.result,
          isVerified: false,
          isUploaded: false,
          key: this.state.eventFormData.images.length,
        };
        this.setState({
          ...this.state,
          eventFormData: {
            ...this.state.eventFormData,
            images: [
              ...this.state.eventFormData.images,
              newImage,
            ],
          },
        });
      }, false);
      reader.readAsDataURL(imageFile);
      return null;
    });
    // Promise.all(uploadRequests).then(val => console.log(val));
  }
  handleUpload() {
    if (!this.state.reportForm.eventId) {
      return;
    }
    const { images } = this.state.eventFormData;
    const imagesUpload = images.map((image) => {
      const newFormData = new FormData();
      newFormData.append('base64', image.base64);
      newFormData.append('isValid', image.isValid);
      newFormData.append('eventId', this.state.reportForm.eventId);

      return fetch('https://localhost:8000/api/foo', {
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
  }
  render() {
    console.log(this.state);
    return (
      <Container>
        <ConfirmationModal
          open={this.state.confirmationModal.isopen}
          text={this.state.confirmationModal.text}
          closeModal={this.closeModal}
        />

        <br />
        <Step.Group fluid attached="top" widths={3} unstackable>
          <Step
            completed={this.state.eventFormData.location.isValid}
            active={this.state.reportForm.activeTab === 0}
            onClick={() => this.handleTabChange(0)}
          >
            <Icon circular color="yellow" name="map outline" size="small" />
            <Responsive minWidth={901}>
              <Step.Content>
                <Step.Title>Location</Step.Title>
                <Step.Description>{this.state.eventFormData.text}</Step.Description>
              </Step.Content>
            </Responsive>

          </Step>
          <Step
            active={this.state.reportForm.activeTab === 1}
            onClick={() => this.handleTabChange(1)}
            completed={this.state.eventFormData.details.isValid}
          >
            <Icon circular color={getEventColor(this.state.eventFormData.details.eventType)} name="edit" />
            <Responsive minWidth={901}>
              <Step.Content>
                <Step.Title>Description</Step.Title>
                <Step.Description>Enter incident information</Step.Description>
              </Step.Content>
            </Responsive>
          </Step>

          <Step
            active={this.state.reportForm.activeTab === 2}
            onClick={() => this.handleTabChange(2)}
          >
            <Icon circular color="brown" name="camera retro" />
            <Responsive minWidth={901}>
              <Step.Content>
                <Step.Title>Image</Step.Title>
                <Step.Description>Click a photo</Step.Description>
              </Step.Content>
            </Responsive>
          </Step>
        </Step.Group>

        {this.state.reportForm.activeTab === 0 ?
          <Segment attached color="yellow" secondary>
            <Grid>
              <Grid.Row>
                <div
                  style={{
                    width: '100%',
                    height: '50vh',
                    left: '0px',
                  }}
                >
                  {this.state.eventFormData.location.lat ?
                    <MapWrapper
                      location={{
                          lat: this.state.eventFormData.location.lat,
                          lng: this.state.eventFormData.location.lng,
                      }}
                      onClick={e => this.handleMapLocationChange(e)}
                      zoom={16}
                    >
                      <Sonar
                        lat={this.state.eventFormData.location.lat}
                        lng={this.state.eventFormData.location.lng}
                        id={null}
                      />
                    </MapWrapper>
                  : null}
                </div>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>{this.state.eventFormData.text || LOCATION_FAILED_TEXT}</p>
                  <Button floated="right" color="teal" disabled={this.state.eventFormData.location.isValid || this.state.reportForm.isFreezed} onClick={() => this.handleSaveLocation()}>Save Location</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          : null}
        {this.state.reportForm.activeTab === 1 ?
          <Segment attached color={getEventColor(this.state.eventFormData.details.eventType)}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Form loading={this.state.reportForm.loading}>
                    <Form.Field required disabled={this.state.reportForm.isFreezed}>
                      <label>Event Type</label>
                      <Form.Select
                        options={eventOptions}
                        placeholder="Event Type"
                        value={this.state.eventFormData.details.eventType}
                        onChange={(e, { value }) =>
                        this.handleInputChange({
                          target: {
                            value,
                            name: 'eventType',
                          },
                        })
                      }
                      />
                    </Form.Field>
                    <Form.Field required disabled={this.state.reportForm.isFreezed}>
                      <label>Short Description</label>
                      <Input
                        name="title"
                        label={{ basic: true, content: `${this.state.eventFormData.details.title.length}/50` }}
                        labelPosition="right"
                        onChange={this.handleInputChange}
                        value={this.state.eventFormData.details.title}
                        autoComplete="off"
                        maxLength={50}
                      />
                    </Form.Field>
                    <Form.Field disabled={this.state.reportForm.isFreezed}>
                      <TextArea
                        placeholder="Tell us more"
                        style={{ minHeight: 100 }}
                        onChange={this.handleInputChange}
                        value={this.state.eventFormData.details.description}
                        name="description"
                      />
                    </Form.Field>
                    <Form.Field disabled={this.state.reportForm.isFreezed}>
                      <Checkbox
                        label={{ children: 'Make incident publicly visible' }}
                        checked={this.state.eventFormData.details.public}
                        onChange={() => this.handleInputChange({
                          target: {
                            checked: !this.state.eventFormData.details.public,
                            name: 'public',
                            type: 'checkbox',
                          },
                        })}
                      />
                    </Form.Field>
                    <Form.Field disabled={this.state.reportForm.isFreezed}>
                      <Checkbox
                        label={{ children: 'Ask for public help' }}
                        checked={this.state.eventFormData.details.help}
                        name="help"
                        onChange={() => this.handleInputChange({
                          target: {
                            checked: this.state.eventFormData.details.public && !this.state.eventFormData.details.help,
                            name: 'help',
                            type: 'checkbox',
                          },
                        })}
                      />
                    </Form.Field>
                    <Form.Button
                      floated="right"
                      color="orange"
                      onClick={this.handleSubmit}
                      disabled={this.state.reportForm.loading || this.state.reportForm.isFreezed}
                    >
                      <Icon name="check" /> Report Incident
                    </Form.Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          : null}
        {this.state.reportForm.activeTab === 2 ?
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
                        marginTop: '5vh', marginBottom: '5vh', paddingTop: '8vh', paddingBottom: '8vh' 
                        }}
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
                                <Button circular icon="camera" fluid size="massive" basic color="green" onClick={this.captureWebcam} />
                              </Grid.Column>
                              <Grid.Column />
                            </Grid.Row>
                          </Grid>

                        </Modal.Description>
                      </Modal.Content>
                    </Modal>

                  </Grid.Column>
                  <Grid.Column>

                    <Dropzone ref={(node) => { this.dropzoneRef = node; }} onDrop={this.handleFileSelect} style={{ display: 'none' }} />
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
                    />


                  </Grid.Column>
                </Grid.Row>

              </Grid>

              {/*  */}
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
                        <Button icon="cloud upload" loading color="brown" floated="right">Upload</Button>
                      : null
                    }
                  </Grid.Column>
                </Grid.Row>
              </Grid>


            </Segment>
          </div>
          : null}

      </Container>

    );
  }
}

export default CreateEvent;
