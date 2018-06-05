import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Map, Sonar } from '../../components';
import { GET_EVENTS_BY_LOCATION, GET_LOCATION_BY_IP } from '../../utils/apipaths';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      events: [],
    };
  }
  componentWillMount() {
    fetch(GET_LOCATION_BY_IP).then(resp => resp.json()).then((resp) => {
      this.setState({
        ...this.state,
        location: {
          ...resp,
          lat: parseFloat(resp.lat),
          long: parseFloat(resp.lng),
        },
      });
      const { lat, long } = this.state.location;
      return fetch(`${GET_EVENTS_BY_LOCATION}?lat=${lat}&long=${long}&dist=10000`);
    })
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({
          ...this.state,
          events: resp,
        });
      });
  }

  render() {
    console.log(this.state.events);
    return (
      <div style={{
        // position: 'absolute',
        width: '100hw',
        height: '99vh',
        // top: '0px',
        left: '0px',
        // zIndex: -1,
      }}
      >
        {
      this.state.location ?
        <Map
          location={{
            lat: this.state.location.lat,
            lng: this.state.location.long,
          }}
          zoom={11}
        >
          {
            this.state.events.map(event => (
              <Sonar
                lat={event.lat}
                lng={event.long}
                key={event.key}
                id={event.key}
              />
          ))}
        </Map>

      : null
  }

      </div>
    );
  }
}

export default Feed;
