/* global google */

import React from 'react';
import PropTypes from 'prop-types';

import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import history from '../../';
import './pulseRed.css';

// 1x1 transparent png image as we don't want to show the default marker image
const markerImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';


/**
 * [Sonar Our custom marker for the maps. Behaves like a Sonar pulsating on the map]
 * @param {[type]} props [description]
 */
const Sonar = props => (
  <MarkerWithLabel
    position={{ lat: props.lat, lng: props.lng }}
    labelAnchor={new google.maps.Point(35, 70)}
    labelStyle={{ padding: '24px' }}
    icon={{
        url: markerImage,
      }}
      // Push events to browser history so that user is redirected to view events
    onClick={() => {
        if (props.id) {
          history.push(`/view/${props.id}`);
        }
      }}
  >
    <div>
      <div className="sonar-emitter">
        <div className="sonar-wave" />
      </div>
    </div>
  </MarkerWithLabel>
);
Sonar.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  id: PropTypes.string,
};
Sonar.defaultProps = {
  id: null,
};

export default Sonar;
