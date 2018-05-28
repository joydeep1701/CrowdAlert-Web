import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';

// const MapStyle = {   width: '90%',   height: '90%', };

export class MapContainer extends Component {
  componentDidMount() {
    // alert('Not Yet Implemented');
  }
  render() {
    // console.log("MAP", this.props);
    if (!this.props.loaded) {
      return (
        <div>Loading..</div>
      );
    }
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={this.props.zoom || 16}
          initialCenter={this.props.location}
        >
          {this.props.children}
          <Marker onClick={() => console.log(this)} name="Current location" />
        </Map>
      </div>
    );
  }
}
MapContainer.propTypes = {
  google: PropTypes
    .objectOf(PropTypes.string)
    .isRequired,
  location: PropTypes
    .objectOf(PropTypes.number)
    .isRequired,
  zoom: PropTypes.number,
  loaded: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
MapContainer.defaultProps = {
  zoom: 14,
  children: null,
};

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY })(MapContainer);
