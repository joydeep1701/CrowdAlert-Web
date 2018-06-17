import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateMapCenter, updateMapZoom } from '../../components/Map/actions';
import style from './style';
import { MapWrapper, Sonar } from '../../components';
import { GET_EVENTS_BY_LOCATION, GET_LOCATION_BY_IP } from '../../utils/apipaths';
import distanceCoordinates from '../../utils/gps';

/**
 * [Feed Display events on th map using Sonar components]
 * @extends Component
 */
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      events: [],
    };
  }
  /**
   * [componentWillMount fetch  the event as soon as the component will mount]
   * @return {[type]} [description]
   */
  componentWillMount() {
    // Fetch the users current approximate location using API
    fetch(GET_LOCATION_BY_IP).then(resp => resp.json()).then((resp) => {
      // Store the location
      const lat = parseFloat(resp.lat);
      const lng = parseFloat(resp.lng);
      const distance = distanceCoordinates(lat, lng, this.props.lat, this.props.lng)
      console.log(distance);
      if (distance > 500) {
        // Make sure that if the target location is somewhat near to the current
        // location, don't update location
        this.props.updateMapCenter({
          lat,
          lng,
        });

      }
      // Try to fetch the events near the given location
      // Here the distance param is hardcoded
      // but it should be replaced by (earth perimeter)/zoom level
      // so that we can fetch events according to the zoom level
      return fetch(`${GET_EVENTS_BY_LOCATION}?lat=${lat}&long=${lng}&dist=20000`);
    })
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({
          ...this.state,
          events: resp,
        });
      });
  }
  componentWillUnmount() {
    console.log('UNMOUNT');
  }
  render() {
    console.log(this.props);
    const Markers = this.state.events.map(event => (
      <Sonar lat={event.lat} lng={event.long} key={event.key} id={event.key} />
    ));
    return (
      <div style={style}>
        <MapWrapper>
          { Markers }
        </MapWrapper>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const { map } = state;
  return (
    map
  )
}
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateMapCenter,
    updateMapZoom,
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Feed);
