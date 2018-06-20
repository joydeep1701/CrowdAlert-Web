import {
  MAP_UPDATE_CENTER,
  MAP_UPDATE_ZOOM,
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
