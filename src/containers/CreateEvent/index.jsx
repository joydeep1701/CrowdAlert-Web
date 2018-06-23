/* global navigator */
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { REVERSE_GEOCODE, UPLOAD_IMAGES, GET_EVENT_BY_ID } from '../../utils/apipaths';

import history from '../../';


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
        text:'',
      },
      permissions: {
        location: true,
        camera: false,
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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setWebcamRef = this.setWebcamRef.bind(this);
    this.captureWebcam = this.captureWebcam.bind(this);
    this.captureWebcam = this.captureWebcam.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
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

  handleSubmit() {
    const { eventFormData } = this.state;

    if (!eventFormData.location.isValid) {
      this.setState({
        ...this.state,
        reportForm: {
          ...this.state.reportForm,
          validationErrors: true,
          message: {
            header: 'Location',
            body: 'Save the location',
          },
        },
      });
      return;
    }
    if (!eventFormData.details.eventType) {
      this.setState({
        ...this.state,
        reportForm: {
          ...this.state.reportForm,
          validationErrors: true,
          message: {
            header: 'Event not given',
            body: 'Select an event type from the dropdown',
          },
        },
      });
      return;
    }
    if (!eventFormData.details.title) {
      this.setState({
        ...this.state,
        reportForm: {
          ...this.state.reportForm,
          validationErrors: true,
          message: {
            header: 'Short description not given',
            body: 'Write a short description about the event',
          },
        },
      });
      return;
    }


    this.setState({
      ...this.state,
      reportForm: {
        ...this.state.reportForm,
        loading: true,
        validationErrors: false,
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
    fetch(GET_EVENT_BY_ID, {
      method: 'post',
      body: newFormData,
    }).then(resp => resp.json())
      .then((resp) => {
        console.log(resp, resp.eventId);
        this.setState({
          ...this.state,
          reportForm: {
            ...this.state.reportForm,
            loading: false,
            isFreezed: true,
            eventID: resp.eventId,
            activeTab: 2,
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
            validationErrors: true,
            message: {
              header: 'Server Error',
              body: 'Please try again later',
            },
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


      return fetch(UPLOAD_IMAGES, {
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
      history.push(`/view/${this.state.reportForm.eventID}`)
    });
  }
  render() {
    console.log(this.state);
    return (
      <Container>
        <br />
        
        
        


      </Container>

    );
  }
}

export default CreateEvent;
