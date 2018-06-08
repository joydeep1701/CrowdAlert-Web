/* global navigator */
import React, { Component } from 'react';
import { Button, Header, Container, Modal, Icon, Step, Segment, Image, Grid, Form, Input, Label, TextArea } from 'semantic-ui-react';

import fetch from 'isomorphic-fetch';
import { MapWrapper, Sonar } from '../../components/Map';
import { REVERSE_GEOCODE } from '../../utils/apipaths';
// import Webcam from 'react-webcam';

const PERMISSION_REQUIRED_TEXT = `We need to access your location & camera  
                                    in order to report an incident`;
const PERMISSION_FAILED_TEXT = `You need to enable location permissions in
                                  order to report an incident`;
const LOCATION_FAILED_TEXT = `You need enable location services in order to 
                                  report an incident`;
const MEDIA_DEVICES_FAILED = `We need access to your camera. Please enable the 
                                  camera permission.`;

const eventOptions = [
  { key: 'rd', text: 'Road', value: 'rd' },
  { key: 'el', text: 'Electric', value: 'el' },
  { key: 'hl', text: 'Health', value: 'hl' },
  { key: 'fr', text: 'Fire', value: 'fr' },
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
        activeTab: 0,
      },
      eventFormData: {
        location: {
          lat: null,
          lng: null,
          isValid: false,
          text: 'Select Location',
        },
        details: {
          eventType: '',
          title: '',
          description: '',
        },
        image: {
          is_verified: false,
          image: '',
        },
      },
    };
    this.handlePermission = this.handlePermission.bind(this);
    this.handleGeoLoactionPermissionDenied = this.handleGeoLoactionPermissionDenied.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleGetLocation = this.handleGetLocation.bind(this);
    this.handleGeoLocationSuccess = this.handleGeoLocationSuccess.bind(this);
  }

  componentWillMount() {
    // setTimeout( ,500);
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
          this.handleGetLocation();
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
    console.log("Save Location Called");
    console.log('====================================');
    this.setState({
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
        <Step.Group ordered fluid attached="top" widths={3}>
          <Step
            completed={this.state.eventFormData.location.isValid}
            active={this.state.reportForm.activeTab === 0}
            onClick={() => this.handleTabChange(0)}
          >
            <Step.Content>
              <Step.Title>Location</Step.Title>
              <Step.Description>{this.state.eventFormData.text}</Step.Description>
            </Step.Content>
          </Step>
          <Step
            active={this.state.reportForm.activeTab === 1}
            onClick={() => this.handleTabChange(1)}
          >
            <Step.Content>
              <Step.Title>Description</Step.Title>
              <Step.Description>Enter incident information</Step.Description>
            </Step.Content>
          </Step>

          <Step
            active={this.state.reportForm.activeTab === 2}
            onClick={() => this.handleTabChange(2)}
          >
            <Step.Content>
              <Step.Title>Image</Step.Title>
              <Step.Description>Click a photo</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>

        {this.state.reportForm.activeTab === 0 ?
          <Segment attached>
            <Grid>
              <Grid.Row>
                <div 
                  style={{
                    width: '100%',
                    height: '50vh',
                    left: '0px',
                  }}
                >
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
                </div>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>{this.state.eventFormData.text}</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button floated="right" color="teal" disabled={this.state.eventFormData.location.isValid} onClick={() => this.handleSaveLocation()}>Save Location</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          : null}
        {this.state.reportForm.activeTab === 1 ?
          <Segment attached>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Form>
                    <Form.Field required>
                      <label>Event Type</label>
                      <Form.Select options={eventOptions} placeholder="Event Type" />
                    </Form.Field>
                    <Form.Field required>
                      <label>Short Description</label>
                      <Input label={{ basic: true, content: '25/50' }} labelPosition="right" />
                    </Form.Field>
                    <Form.Field>
                      <TextArea placeholder="Tell us more" style={{ minHeight: 100 }} />
                    </Form.Field>
                    <Button floated="right" color="orange">Report Incident</Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          : null}
        {this.state.reportForm.activeTab === 2 ?
          <Segment attached>
            <p>Image Here</p>
            {/* <Webcam
                      audio={false}
                      height={350}
                      // ref={this.setRef}
                      screenshotFormat="image/jpeg"
                      width={350}
                    /> */}
          </Segment>
          : null}

      </Container>

    );
  }
}

export default CreateEvent;
