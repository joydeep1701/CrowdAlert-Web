import {
  GEOLOCATOR_LOCATION_FETCH,
  GEOLOCATOR_LOCATION_GET_PERMISSION,
  GEOLOCATOR_LOCATION_SUCCESS,
  GEOLOCATOR_LOCATION_DENIED,
  GEOLOCATOR_LOCATION_FAILED,
  GEOLOCATOR_MODAL_OPEN,
  GEOLOCATOR_MODAL_CLOSE,
} from './actionTypes';

export function geolocatorFetchLocation(payload = {}) {
  return {
    type: GEOLOCATOR_LOCATION_FETCH,
    payload,
  };
}
export function geolocatoretLocationPermission(payload = {}) {
  return {
    type: GEOLOCATOR_LOCATION_GET_PERMISSION,
    payload,
  };
}
export function geolocatorLocationSuccess(payload = {}) {
  return {
    type: GEOLOCATOR_LOCATION_SUCCESS,
    payload,
  };
}
export function geolocatorLocationDenied(payload = {}) {
  return {
    type: GEOLOCATOR_LOCATION_DENIED,
    payload,
  };
}
export function geolocatorLocationFailed(payload = {}) {
  return {
    type: GEOLOCATOR_LOCATION_FAILED,
    payload,
  };
}
export function geolocatorModalOpen(payload = {}) {
  return {
    type: GEOLOCATOR_MODAL_OPEN,
    payload,
  };
}
export function geolocatorModalClose(payload = {}) {
  return {
    type: GEOLOCATOR_MODAL_CLOSE,
    payload,
  };
}
