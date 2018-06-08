import React, {Component} from 'react';
import {Button, Header, Container, Modal, Icon, Step, Segment, Image, Grid , Form, Input, Label, TextArea} from 'semantic-ui-react';
import MapContainer from '../../components/Map';
import Webcam from 'react-webcam';

const PERMISSION_REQUIRED_TEXT = `We need to access your location & camera  
                                    in order to report an incident`;
const PERMISSION_FAILED_TEXT = `You need to enable location permissions in
                                  order to report an incident`;
const LOCATION_FAILED_TEXT = `You need enable location services in order to 
                                  report an incident`;
const MEDIA_DEVICES_FAILED = `We need access to your camera. Please enable the 
                                  camera permission.`

const eventOptions = [
  {key:'rd', text:'Road', value:'rd'},
  {key:'el', text:'Electric', value:'el'},
  {key:'hl', text:'Health', value:'hl'},
  {key:'fr', text:'Fire', value:'fr'},
];


const ConfirmationModal = props => (
    <Modal open={props.open} basic size='small'>
        <Header icon='archive' content='Permissions Required'/>
        <Modal.Content>
            <p>{props.text}</p>
        </Modal.Content>
        <Modal.Actions>
            <Button color='teal' inverted onClick={() => props.closeModal()}>
                <Icon name='checkmark'/>
                Okay
            </Button>
        </Modal.Actions>
    </Modal>
)

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {          
          lat: null,
          lng: null
      },
      confirmationModal: {
        isopen: true,
        text: PERMISSION_REQUIRED_TEXT,
      },
      permissions: {
        location: false,
        camera: false,
      }
    }
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
          lat:response.coords.latitude,
          lng: response.coords.longitude,
        },
        permissions: {
          ...this.state.permissions,
          location: true,
        },        
      })
    }
    handleMediaSuccess(response) {
      const tracks = response.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
      this.setState({
        ...this.state,
        permissions: {
          ...this.state.permissions,
          camera: true,
        }
      })
    }

    handleGeoLocationFailure(err) {
      // fetch ip locations      
      console.error("Location Failed",err);
      
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
          timeout: 20000
      });
    }
    closeModal() {
      if(this.state.permissions.location && this.state.permissions.camera) {
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
          .query({name: 'geolocation'})
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
                  //this.handlePermission();
              }
          });        
          navigator
          .mediaDevices
          .getUserMedia({video: true})
          .then((response) => {           
            this.handleMediaSuccess(response);
          })
          .catch((err) => {
            this.handleMediaPermissionDenied();
          })
         
       
    }
    render() {
        return (
            <Container>
                <ConfirmationModal 
                  open={this.state.confirmationModal.isopen}
                  text={this.state.confirmationModal.text}
                  closeModal={this.closeModal} 
                />
                <br />
                 <Step.Group ordered fluid attached='top'>
                  <Step>
                    <Step.Content>
                      <Step.Title>Location</Step.Title>
                      <Step.Description>Choose incident location</Step.Description>
                    </Step.Content>
                  </Step>

                  <Step>
                    <Step.Content>
                      <Step.Title>Description</Step.Title>
                      <Step.Description>Enter incident information</Step.Description>
                    </Step.Content>
                  </Step>

                  <Step active>
                    <Step.Content>
                      <Step.Title>Image</Step.Title>
                      <Step.Description>Click a photo</Step.Description>
                    </Step.Content>
                  </Step>
                </Step.Group>
                <Segment attached>
                  <Grid>
                    <Grid.Row>
                    <div style={{height: '50vh', width:'500px' }}>
                        {(this.state.location.lat && this.state.location.lng)?
                          <MapContainer style={{height: '90%', width:'80%', padding: '20px'}} 
                          location={
                            {
                              lat: this.state.location.lat,
                              lng: this.state.location.lng
                            }
                            }
                            zoom={16}
                          />:null
                        }
                      </div>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <p>Location Data</p>                 
                      </Grid.Column>                           
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                       <Button floated='right' color='teal'>Save Location</Button>
                      </Grid.Column>
                      
                    </Grid.Row>
                  </Grid>
                  
                 
                </Segment>
                <Segment attached>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>

                    <Form>
                      <Form.Field required>
                        <label>Event Type</label>
                        <Form.Select options={eventOptions} placeholder='Event Type' />
                      </Form.Field>
                      <Form.Field required>
                          <label>Short Description</label>
                          <Input label={{ basic: true, content: '25/50' }} labelPosition='right' />                  
                      </Form.Field>
                      <Form.Field>
                        <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />
                      </Form.Field>                   
                      <Button floated='right' color='orange'>Report Incident</Button>                    
                    </Form>
                    </Grid.Column>
                    
                  </Grid.Row>

                </Grid>
                  
                  
                </Segment>
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

            </Container>

        );
    }
}

export default CreateEvent;