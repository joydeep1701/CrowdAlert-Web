import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Map, Sonar } from '../../components';
import { GET_EVENTS_BY_LOCATION } from '../../utils/apipaths';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      events: [],
    };
  }
  componentWillMount() {
    fetch('https://ipinfo.io/json').then(resp => resp.json()).then((resp) => {
      this.setState({
        ...this.state,
        location: {
          ...resp,
          lat: parseFloat(resp.loc.split(',')[0]),
          long: parseFloat(resp.loc.split(',')[1]),
        },
      });
      let lat;
      let long;
      ({ lat, long } = this.state.location);
      // For now fetch events with large distance proximity. Later we need to
      // change that to 6,000/3*zoom level, so that only relevant events are fetched
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
                lat={event.location.coords.latitude}
                lng={event.location.coords.longitude}
                id={event.title}
                key={event.datetime}
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
