/* global google */
import React from 'react';
import { compose, withProps, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

import style from './style';
// import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

import './pulse.css';

const markerImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

const Sonar = props => (
  <MarkerWithLabel
    position={{ lat: props.lat, lng: props.lng }}
    labelAnchor={new google.maps.Point(35, 70)}
    labelStyle={{ padding: '24px' }}
    icon={{
    url: markerImage,
  }}
    onClick={() => alert(props.id)}
  >
    <div>
      <div className="sonar-emitter">
        <div className="sonar-wave" />
      </div>
    </div>

  </MarkerWithLabel>
);

const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }}>Loader</div>,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 22.66, lng: 88.34 }}
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
    }}
    disableDefaultUI
  >
    { props.children } 
  </GoogleMap>
));

const Map = props => (
  <MapComponent {...props} />
);

export {
  Map,
  Sonar,
};
