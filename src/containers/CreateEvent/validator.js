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

