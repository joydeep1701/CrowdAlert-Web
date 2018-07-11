import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { updateMapCenter, updateMapZoom, updateOnClick } from './actions';
import style from './styleBright2';

const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  // console.log('MAP PROPS', props);
  return (
    <GoogleMap
      center={{
        lat: parseFloat(props.lat),
        lng: parseFloat(props.lng),
     }}
      defaultOptions={{
        styles: style,
      // these following 7 options turn certain controls off
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false,
        minZoom: 4,
        maxZoom: 18,
      }}
      disableDefaultUI
      onClick={props.onClick}
      onZoomChanged={props.onZoomChanged}
      onCenterChanged={props.onCenterChanged}
      ref={props.onMapMounted}
      zoom={props.zoom}
    >
      { props.children }
    </GoogleMap>
  );
});
/**
 * [Map Just to make sure everythings is in scope]
 * @param {[type]} props [description]
 */

class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onMapMounted = this.onMapMounted.bind(this);
    this.onZoomChanged = this.onZoomChanged.bind(this);
    this.onCenterChanged = this.onCenterChanged.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  onMapMounted(mapRef) {
    this.setState({ mapRef });
  }
  onZoomChanged() {
    const lat = this.state.mapRef.getCenter().lat();
    const lng = this.state.mapRef.getCenter().lng();
    const zoom = this.state.mapRef.getZoom();
    this.props.updateMapZoom({
      lat,
      lng,
      zoom,
      fetch: this.props.shouldFetch,
    });
  }
  onCenterChanged() {
    const lat = this.state.mapRef.getCenter().lat();
    const lng = this.state.mapRef.getCenter().lng();
    const zoom = this.state.mapRef.getZoom();
    this.props.updateMapCenter({
      lat,
      lng,
      zoom,
      fetch: this.props.shouldFetch,
    });
  }
  handleOnClick(e) {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    if (this.props.dispatchOnClick) {
      this.props.updateOnClick(lat, lng);
    }
  }
  render() {
    // console.log("MAP WRAPPER", this.props)
    return (
      <MapComponent
        lat={this.props.lat}
        lng={this.props.lng}
        onMapMounted={this.onMapMounted}
        onZoomChanged={this.onZoomChanged}
        zoom={this.props.zoom}
        onCenterChanged={this.onCenterChanged}
        onClick={this.handleOnClick}
        {...this.props}
      />
    );
  }
}
MapWrapper.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  updateMapZoom: PropTypes.func,
  updateMapCenter: PropTypes.func,
  shouldFetch: PropTypes.bool,
};
MapWrapper.defaultProps = {
  updateMapZoom: () => {},
  updateMapCenter: () => {},
  shouldFetch: false,
};

const mapStateToProps = state => (
  state.map
);
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateMapCenter,
    updateMapZoom,
    updateOnClick,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
