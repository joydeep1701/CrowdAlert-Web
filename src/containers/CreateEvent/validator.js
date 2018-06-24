export default ({ details, tabs }) => {
  if (!tabs.isValid.location) {
    return {
      validationErrors: true,
      message: {
        header: 'Location',
        body: 'Save the location',
      },
    };
  }
  if (!details.eventType) {
    return {
      validationErrors: true,
      message: {
        header: 'Event not given',
        body: 'Select an event type from the dropdown',
      },
    };
  }
  if (!details.title) {
    return {
      validationErrors: true,
      message: {
        header: 'Short description not given',
        body: 'Write a short description about the event',
      },
    };
  }

  return {
    validationErrors: false,
  };
};
// this.setState({
//   ...this.state,
//   reportForm: {
//     ...this.state.reportForm,
//     loading: true,
//     validationErrors: false,
//   },
//   eventFormData: {
//     ...this.state.eventFormData,
//     details: {
//       ...this.state.eventFormData.details,
//       isValid: true,
//       isFreezed: true,
//     },
//   },
// });


// const eventData = {
//   category: eventFormData.details.eventType,
//   description: eventFormData.details.description,
//   local_assistance: eventFormData.details.help,
//   title: eventFormData.details.title,
//   public: {
//     view: eventFormData.details.public,
//     share: eventFormData.details.help,
//   },
//   location: {
//     coords: {
//       latitude: eventFormData.location.lat,
//       longitude: eventFormData.location.lng,
//     },
//   },
// };
// const newFormData = new FormData();
// newFormData.append('eventData', JSON.stringify(eventData));
// fetch(GET_EVENT_BY_ID, {
//   method: 'post',
//   body: newFormData,
// }).then(resp => resp.json())
//   .then((resp) => {
//     console.log(resp, resp.eventId);
//     this.setState({
//       ...this.state,
//       reportForm: {
//         ...this.state.reportForm,
//         loading: false,
//         isFreezed: true,
//         eventID: resp.eventId,
//         activeTab: 2,
//       },
//     });
//   })
//   .catch(() => {
//     this.setState({
//       ...this.state,
//       reportForm: {
//         ...this.state.reportForm,
//         loading: false,
//         isFreezed: false,
//         validationErrors: true,
//         message: {
//           header: 'Server Error',
//           body: 'Please try again later',
//         },
//       },
//     });
//   });

