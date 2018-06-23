/* global navigator */
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { REVERSE_GEOCODE, UPLOAD_IMAGES, GET_EVENT_BY_ID } from '../../utils/apipaths';
import Tab from './tabs';
import MapTab from './mapstab';
import FormTab from './formtab';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: null,
        lng: null,
      },
      reportForm: {
        activeTab: 0,
        loading: false,
        message: {
          header: '',
          body: '',
        },
        eventID: 'Some Random ID',
        isFreezed: false,
        validationErrors: false,
        uploading: false,
        imageSelectDisabled: false,
        uploadComplete: false,
      },
    };
    this.handlePermission = this.handlePermission.bind(this);
    this.setWebcamRef = this.setWebcamRef.bind(this);
    this.captureWebcam = this.captureWebcam.bind(this);
    this.captureWebcam = this.captureWebcam.bind(this);
  }

  componentWillMount() {
    this.handlePermission();
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


  handleMediaPermissionDenied() {
    this.setState({
      ...this.state,
      permissions: {
        ...this.state.permissions,
        camera: false,
      },
      confirmationModal: {
        isopen: true,
        text: '',
      },
    });
  }

  handlePermission() {
    try {
      navigator
        .mediaDevices
        .getUserMedia({ video: true })
        .then((response) => {
          this.handleMediaSuccess(response);
        })
        .catch((err) => {
          this.handleMediaPermissionDenied();
        });
    } catch(err) {
      console.error(err)
    }
  }
  handleMapLocationChange(e) {
    if (this.state.reportForm.isFreezed) {
      return;
    }
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

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

  render() {
    console.log(this.state);
    return (
      <Container>
        <br />
        <Tab />
        <MapTab />
        <FormTab />

      </Container>

    );
  }
}

export default CreateEvent;
