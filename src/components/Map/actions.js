import {
  MAP_UPDATE_CENTER,
  MAP_UPDATE_ZOOM,
  MAP_ONCLICK,
} from './actionTypes';

export function updateMapCenter(payload = {}) {
  return {
    type: MAP_UPDATE_CENTER,
    payload,
  };
}
export function updateMapZoom(payload = {}) {
  return {
    type: MAP_UPDATE_ZOOM,
    payload,
  };
}
export function updateOnClick(lat, lng) {
  return {
    type: MAP_ONCLICK,
    payload: {
      lat,
      lng,
    },
  };
}
