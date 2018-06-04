import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Map, Sonar } from '../../components';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
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
      })
    })
  }

  render() {
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
            // Manually Hardcoding the location information as the
            // map is freezed due to some strange bug.
            lat: 22.62,
            lng: 88.35,
          }}
          zoom={11}
        >
          <Sonar lat={22.67} lng={88.36} id="Event 1" />
          <Sonar lat={22.66} lng={88.35} id="Event 2" />
          <Sonar lat={22.65} lng={88.34} id="Event 3" />
        </Map>
      : null
  }
      </div>
    );
  }
}

export default Feed;
